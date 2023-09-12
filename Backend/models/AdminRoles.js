const mongoose = require('mongoose');
const { Schema } = mongoose

const adminRolesSchema = new Schema({
    roleName: {
        type: String,
        required: true,
        default: ''
    },
    roles: {
        type: Array,
        required: true,
        default: []
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

module.exports = mongoose.model('AdminRoles', adminRolesSchema)
