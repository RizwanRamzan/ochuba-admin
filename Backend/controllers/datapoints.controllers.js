const CreateDataPoint = require('../models/CreateDataPoint');

exports.createDataPoint = async (req, res, next) => {
    try {
        const { dataPointName, description, dataPointType, enableSheetMode, noOfColumns, labelColumns, dataColumns } = req.body;

        // if noOfColumns is provided, it must be a valid integer
        if (noOfColumns && !Number.isInteger(noOfColumns)) {
            return res.status(400).json({ errors: [{ msg: "noOfColumns must be an integer" }] });
        }

        // if labelColumns is provided, it must be an array
        if (labelColumns && !Array.isArray(labelColumns)) {
            return res.status(400).json({ errors: [{ msg: "labelColumns must be an array" }] });
        }
        // if there are no errors, create a new CreateDataPoint and save it
        const createDataPoint = new CreateDataPoint({
            dataPointName,
            description,
            dataPointType,
            enableSheetMode,
            noOfColumns,
            labelColumns,
            dataColumns
        });

        const savedDataPoint = await createDataPoint.save();

        // return the saved data point
        return res.status(200).json(savedDataPoint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
}

exports.updateDataPoint = async (req, res, next) => {
    try {
        const { dataPointName, description, dataPointType, enableSheetMode, noOfColumns, labelColumns } = req.body;

        // if noOfColumns is provided, it must be a valid integer
        if (noOfColumns && !Number.isInteger(noOfColumns)) {
            return res.status(400).json({ errors: [{ msg: "noOfColumns must be an integer" }] });
        }

        // if labelColumns is provided, it must be an array
        if (labelColumns && !Array.isArray(labelColumns)) {
            return res.status(400).json({ errors: [{ msg: "labelColumns must be an array" }] });
        }
        // if there are no errors, create a new CreateDataPoint and save it\

        console.log(req.params.id, req.body)

        const savedDataPoint = await CreateDataPoint.findByIdAndUpdate(req.params.id, {
            "dataPointName": dataPointName,
            "description": description,
            "dataPointType": dataPointType,
            "enableSheetMode": enableSheetMode,
            "noOfColumns": noOfColumns,
            "labelColumns": labelColumns
        })

        // return the saved data point
        return res.status(200).json(savedDataPoint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
}

exports.getDataPoints = async (req, res, next) => {

    try {
        const datapoints = await CreateDataPoint.find({})
        
        if (datapoints) {
            return res.status(200).json({
                success: true,
                message: 'Got Data Successfully',
                data: datapoints
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Data Found',
            data: []
        });


    }
    catch (err) {
        return res.status(200).json({
            success: false,
            message: err.message,
            data: []
        });
    }
}

exports.getDataPoint = async (req, res, next) => {

    try {
        const datapoint = await CreateDataPoint.findById(req.params.id)
        
        if (datapoint) {
            return res.status(200).json({
                success: true,
                message: 'Got Data Successfully',
                data: datapoint
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Data Found',
            data: []
        });


    }
    catch (err) {
        return res.status(200).json({
            success: false,
            message: err.message,
            data: []
        });
    }
}

exports.deleteDataPoint = async (req, res, next) => {

    try {
        const datapoint = await CreateDataPoint.findByIdAndDelete(req.params.id)
        
        if (datapoint) {
            return res.status(200).json({
                success: true,
                message: 'Deleted Data Successfully',
                data: datapoint
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Data Found',
            data: []
        });
    }
    catch (err) {
        return res.status(200).json({
            success: false,
            message: err.message,
            data: []
        });
    }
}