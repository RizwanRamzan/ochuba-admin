const AdminRoles = require('../models/AdminRoles');

exports.createAdminRoles = async (req, res, next) => {
    try {
        const { roleName, roles } = req.body;

        // if there are no errors, create a new CreateDataPoint and save it
        const adminRoles = new AdminRoles({
            roleName,
            roles,
        });

        const savedDataPoint = await adminRoles.save();

        // return the saved data point
        return res.status(200).json(savedDataPoint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
}

exports.updateAdminRole = async (req, res, next) => {
    try {
        const { roleName, roles } = req.body;

        // if there are no errors, create a new CreateDataPoint and save it\

        console.log(req.params.id, req.body)

        const savedRoleName = await AdminRoles.findByIdAndUpdate(req.params.id, {
            "roleName": roleName,
            "roles": roles,
        })

        // return the saved data point
        return res.status(200).json(savedRoleName);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
}

exports.getAdminRoles = async (req, res, next) => {

    try {
        const adminRoles = await AdminRoles.find({})
        
        if (adminRoles) {
            return res.status(200).json({
                success: true,
                message: 'Got Roles Successfully',
                data: adminRoles
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Role Found',
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

exports.getAdminRole = async (req, res, next) => {

    try {
        const adminrole = await AdminRoles.findById(req.params.id)
        
        if (adminrole) {
            return res.status(200).json({
                success: true,
                message: 'Got role Successfully',
                data: adminrole
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No role Found',
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

exports.deleteAdminRole = async (req, res, next) => {

    try {
        const adminRole = await AdminRoles.findByIdAndDelete(req.params.id)
        
        if (adminRole) {
            return res.status(200).json({
                success: true,
                message: 'Deleted Data Successfully',
                data: adminRole
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