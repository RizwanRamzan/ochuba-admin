const express = require('express')
const { body, validationResult } = require('express-validator');
const CreateDataPoint = require('../models/CreateDataPoint');
const router = express.Router()


// ROUTE 1: create a data point using" POST "/api/admin"
router.post('/admin',[
    body('dataPointName', 'Enter a valid name min 1 characters').isLength({ min: 1 }),
    body('description', 'description length min 1').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { dataPointName, description, dataPointType, enableSheetMode, NoOfColumns, LabelColumns } = req.body;

        // if enableSheetMode is false, NoOfColumns and LabelColumns should not be provided
        if (!enableSheetMode && (NoOfColumns || LabelColumns)) {
            return res.status(400).json({ errors: [{ msg: "NoOfColumns and LabelColumns are not allowed when enableSheetMode is false" }] });
        }

        // if enableSheetMode is true, NoOfColumns and LabelColumns must be provided
        if (enableSheetMode && (!NoOfColumns || !LabelColumns)) {
            return res.status(400).json({ errors: [{ msg: "NoOfColumns and LabelColumns are required when enableSheetMode is true" }] });
        }

        // if NoOfColumns is provided, it must be a valid integer
        if (NoOfColumns && !Number.isInteger(NoOfColumns)) {
            return res.status(400).json({ errors: [{ msg: "NoOfColumns must be an integer" }] });
        }

        // if LabelColumns is provided, it must be an array
        if (LabelColumns && !Array.isArray(LabelColumns)) {
            return res.status(400).json({ errors: [{ msg: "LabelColumns must be an array" }] });
        }

        // if NoOfColumns is provided, LabelColumns must not exceed NoOfColumns
        if (NoOfColumns && LabelColumns && LabelColumns.length > NoOfColumns) {
            return res.status(400).json({ errors: [{ msg: `No more than ${NoOfColumns} LabelColumns are allowed` }] });
        }

        // if there are no errors, create a new CreateDataPoint and save it
        const createDataPoint = new CreateDataPoint({
            dataPointName,
            description,
            dataPointType,
            enableSheetMode,
            NoOfColumns,
            LabelColumns
        });

        const savedDataPoint = await createDataPoint.save();

        // return the saved data point
        return res.status(200).json(savedDataPoint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
})


module.exports = router