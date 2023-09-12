const mongoose = require('mongoose');
const { Schema } = mongoose

const CreateDataCollectionTemplate = new Schema({
    collectionTemplateName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // CreatedBy: {
    //     type: String,
    //     required: true,
    // },
    selectedDataPoints: [{
        type: Schema.Types.ObjectId,
        ref: 'DataPoints',
    }],
    createdAt: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('DataCollectionTemplate', CreateDataCollectionTemplate)
