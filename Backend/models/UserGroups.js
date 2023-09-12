const mongoose = require('mongoose');
const { Schema } = mongoose

const CreateUserGroupSchema = new Schema({
    GroupName: {
        type: String,
        required: true,
    },
    ApprovingOfficer: {
        type: String,
        required: true,
    },
    subGroup: {
        type: String,
        default: '',
    },
    roles: {
        dataCollectors: {
            type: Boolean,
            default: false,
        },
        dashboardViewers: {
            type: Boolean,
            default: false,
        },
        administrators: {
            type: Boolean,
            default: false,
        }
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('UserGroups', CreateUserGroupSchema)
