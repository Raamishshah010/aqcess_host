const sendResponse = require('../utils/sendResponse');
const bcrypt = require('bcrypt');
const Admin = require('../model/Admin')
const Resident = require('../model/Resident')
const User = require('../model/User')


//! ADMIN REGISTER
const adminRegister = async(req, res) => {
    let { name, email, password } = req.body;
    let salt = 10;
    try {

        const adminModel = await Admin({
            name,
            email,
            password
        })

        const saltPass = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, saltPass)

        adminModel.password = hashedPassword;

        adminModel.save();
        sendResponse(req, res, 200, "Admin Registered Successfully", adminModel);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);
    }
}

//! ADMIN LOGIN
const adminLogin = async(req, res) => {
    let { email, password } = req.body;

    try {

        const existingAdmin = await Admin.findOne({ email: email });
        console.log(existingAdmin);
        if (!existingAdmin) return sendResponse(req, res, 404, "No Admin Found", null);

        const comparePass = await bcrypt.compare(password, existingAdmin.password);

        console.log(comparePass);

        if (!comparePass) return sendResponse(req, res, 401, "Incorrect Credentials", null);

        sendResponse(req, res, 200, "Login Successfully", {
            id: existingAdmin._id
        });

    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);
    }
}






//! ALL RESITENT

const allResidents = async(req, res) => {

    try {

        const allResidents = await Resident.find();

        sendResponse(req, res, 200, "All Residents", allResidents);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}

//! ADD RESIDENT

const addResident = async(req, res) => {
    let { name, address, plan } = req.body;

    try {

        let randomPin = parseInt(Math.random() * 10000);


        if (randomPin.toString().length <= 3) {

            let randomPin = parseInt(Math.random() * 10000);

            return randomPin;
        }
        const residentModel = await new Resident({
            name,
            address,
            pin: randomPin,
            plan
        });


        await residentModel.save()
        sendResponse(req, res, 200, "Resident Added Successfully", residentModel);

    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}

//! SINGLE RESIDENT

const singleResident = async(req, res) => {
    let { pin } = req.body;

    try {
        let singleResidentModel = await Resident.findOne({ pin })
        sendResponse(req, res, 200, "Single Resident Details", singleResidentModel);

    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}


//! EDIT RESIDENT

const editResident = async(req, res) => {
    let { name, address, plan, pin } = req.body;

    try {

        const residentModel = await Resident.findOne({ pin });

        residentModel.name = name;
        residentModel.address = address;
        residentModel.plan = plan;



        await residentModel.save()
        sendResponse(req, res, 200, "Resident Edited Successfully", residentModel);

    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}




//! ALL MANAGERS

const allManagers = async(req, res) => {
    try {

        const allManagersModel = await User.find({ userType: 'manager' })

        sendResponse(req, res, 200, "All Managers", allManagersModel);

    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
};


//! ALL MANAGERS OF AN AREA

const managersOfArea = async(req, res) => {
    let { pin } = req.body;

    try {

        const checkAreaOfManager = await User.find({
            pin,
            userType: 'manager'
        });

        sendResponse(req, res, 200, "Manager Of Specific Area", checkAreaOfManager);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}




//! SINGLE MANAGERS DETAILS
const singleManagerDetails = async(req, res) => {
    let { userID } = req.body;

    try {

        const singleManagerDetailsModel = await User.findOne({
            _id: userID,
            userType: 'manager'

        });

        sendResponse(req, res, 200, "Manager Of Specific Area", singleManagerDetailsModel);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}


//! BLOCK MANAGER
const editManagerDetails = async(req, res) => {
    let { userID } = req.body;

    try {

        const editManagerDetailsModel = await User.findOne({
            _id: userID,
            userType: 'manager'

        });

        let checkBlockBool = editManagerDetailsModel.isBlocked

        editManagerDetailsModel.isBlocked = !checkBlockBool;

        editManagerDetailsModel.save();

        sendResponse(req, res, 200, "Manager Status Updated", editManagerDetailsModel);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

};



//! ALL USERS 
const allUsers = async(req, res) => {

    try {
        const allUsersModel = await User.find({
            userType: 'resident'
        })
        sendResponse(req, res, 200, "All Residents", allUsersModel);

    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}


//! ALL USERS OF AN AREA

const userOfArea = async(req, res) => {
    let { pin } = req.body;

    try {

        const checkAreaOfManager = await User.find({
            pin,
            userType: 'resident'
        });

        sendResponse(req, res, 200, "Manager Of Specific Area", checkAreaOfManager);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}


//! SINGLE USERS DETAILS
const singleUserDetails = async(req, res) => {
    let { userID } = req.body;

    try {

        const singleUserDetailsModel = await User.findOne({
            _id: userID,
            userType: 'resident'

        });

        sendResponse(req, res, 200, "User Of Specific Area", singleUserDetailsModel);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}



//! ALL SECURITY

const allSecurityGuards = async(req, res) => {
    try {

        const allSecurityGuardsModel = await User.find({ userType: 'security-guard' })

        sendResponse(req, res, 200, "All Security Guard", allSecurityGuardsModel);

    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
};


//! ALL MANAGERS OF AN AREA

const securityGuardOfArea = async(req, res) => {
    let { pin } = req.body;

    try {

        const checkAreaOfsecurityGuard = await User.find({
            pin,
            userType: 'security-guard'
        });

        sendResponse(req, res, 200, "Security Guard Of Specific Area", checkAreaOfsecurityGuard);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}




//! SINGLE MANAGERS DETAILS
const singleSecurityGuardDetails = async(req, res) => {
    let { userID } = req.body;

    try {

        const singleSecurityGuardDetailsModel = await User.findOne({
            _id: userID,
            userType: 'security-guard'

        });

        sendResponse(req, res, 200, "Security Guard Of Specific Area", singleSecurityGuardDetailsModel);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}


//! BLOCK MANAGER
const editSecurityGuardDetails = async(req, res) => {
    let { userID } = req.body;

    try {

        const editSecurityGuardDetailsModel = await User.findOne({
            _id: userID,
            userType: 'security-guard'

        });

        let checkBlockBool = editSecurityGuardDetailsModel.isBlocked

        editSecurityGuardDetailsModel.isBlocked = !checkBlockBool;

        editSecurityGuardDetailsModel.save();

        sendResponse(req, res, 200, "SecurityGuard Status Updated", editSecurityGuardDetailsModel);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

};





module.exports = {
    adminRegister,
    adminLogin,
    addResident,
    allResidents,
    editResident,
    singleResident,
    allManagers,
    managersOfArea,
    singleManagerDetails,
    editManagerDetails,
    allUsers,
    userOfArea,
    singleUserDetails,
    allSecurityGuards,
    securityGuardOfArea,
    singleSecurityGuardDetails,
    editSecurityGuardDetails
}