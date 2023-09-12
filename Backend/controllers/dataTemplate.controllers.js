const CreateDataTemplate = require('../models/CreateDataTemplate');
const mongoose = require('mongoose');

exports.createDataTemplate = async (req, res, next) => {
    try {
        console.log(req.body)
        // const { dataTemplateName, description, dataPoints } = req.body;
        const { collectionTemplateName, description, selectedDataPoints } = req.body;

        // if there are no errors, create a new CreateDataPoint and save it
        const createDataCollectionTemplate = new CreateDataTemplate({
            collectionTemplateName,
            description,
            selectedDataPoints
        });

        const savedDataTemplate = await createDataCollectionTemplate.save();

        // return the saved data point
        return res.status(200).json(savedDataTemplate);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
}

exports.getDataTemplates = async (req, res, next) => {

    try {
        const dataTemplates = await CreateDataTemplate.find({})
        
        console.log(dataTemplates, 'dataTemplates')

        if (dataTemplates) {
            return res.status(200).json({
                success: true,
                message: 'Got Data Templates Successfully',
                data: dataTemplates
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Data Templates Found',
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
exports.getDataTemplate = async (req, res, next) => {

    try {
        const datatemplate = await CreateDataTemplate.findById(req.params.id).populate({
            path: 'selectedDataPoints', // Specify the field to populate
            model: 'DataPoints', // The model to use for populating
        });
        
        if (datatemplate) {
            return res.status(200).json({
                success: true,
                message: 'Got Data Collection Successfully',
                data: datatemplate
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Data Collection Found',
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

exports.deleteDataTemplate = async (req, res, next) => {
    const deletePromises = req.query.IDS.map(async (element) => {
        try {
            const deleteDataTemplate = await CreateDataTemplate.deleteOne({ _id: new mongoose.Types.ObjectId(element) });
            if (deleteDataTemplate.deletedCount >= 1) {
                return 1; // Return 1 to indicate successful deletion
            } else {
                return 0; // Return 0 to indicate unsuccessful deletion
            }
        } catch (error) {
            console.error("Error deleting data template:", error);
            return 0; // Return 0 to indicate unsuccessful deletion
        }
    });
    
    Promise.all(deletePromises)
        .then((results) => {
            const deletedCount = results.reduce((acc, result) => acc + result, 0);
            console.log('deleted count', deletedCount);
            if (deletedCount === req.query.IDS.length) {
                return res.status(200).json({
                    success: true,
                    message: "Deleted Successfully",
                    data: null
                });
            } else {
                return res.status(400).json({
                    success: false,
                    data: null,
                    message: 'deletion failed'
                });
            }
        })
        .catch((error) => {
            console.error("Error during deletion:", error);
            return res.status(500).json({ errors: [{ msg: "Server error" }] });
        });
    
}