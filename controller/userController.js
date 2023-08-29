const bcrypt = require('bcrypt');
const sendResponse = require('../utils/sendResponse');
const User = require('../model/User')
const Pass = require('../model/Pass')
const Visitor = require('../model/Visitor')
const Article = require('../model/Article')
const Resident = require('../model/Resident')
const VisitorHistory = require('../model/VisitorHistory')




//! USER REGISTER
const userRegister = async(req, res) => {

    let { email, password, fullName, address, pin, userType } = req.body;
    let salt = 10;


    try {


        const existingEmail = await User.findOne({ email: email });

        if (existingEmail) return sendResponse(req, res, 401, "Email Already Exist", null);


        let userModel = new User({
            email,
            password,
            fullName,
            address,
            userType,
            pin
        });


        const genSalt = await bcrypt.genSalt(salt);

        const hashedPass = await bcrypt.hash(password, genSalt);

        userModel.password = hashedPass

        await userModel.save();
        sendResponse(req, res, 200, "Registered Successfully", userModel);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}

//! USER LOGIN
const userLogin = async(req, res) => {

    let { email, password, pin } = req.body;

    try {

        const myResistent = await Resident.findOne({
            pin
        });

        const UserData = await User.findOne({ email: email });

        if (!UserData) return sendResponse(req, res, 404, "Email Not Found", null);

        let checkPassword = await bcrypt.compare(password, UserData.password);

        if (!checkPassword) return sendResponse(req, res, 401, "Incorrect Credentials", null);

        if (UserData.pin !== myResistent.pin) return sendResponse(req, res, 405, "You Are Not The Member Of This Resident", null);

        sendResponse(req, res, 200, "Login Successfully", { UserData, name: myResistent.name })


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}



//! EDIT USER

const editUser = async(req, res) => {
    let { userID, fullName, address } = req.body;

    try {

        const existingUser = await User.findOne({
            _id: userID
        });

        existingUser.fullName = fullName;
        existingUser.address = address;

        await existingUser.save();

        sendResponse(req, res, 200, "User Edited Successfully", existingUser);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
};



//! CHANGE PASSWORD

const changePassword = async(req, res) => {
    let { userID, oldPassword, newPassword } = req.body;


    try {

        const existingUser = await User.findOne({
            _id: userID
        });

        const checkPassword = await bcrypt.compare(oldPassword, existingUser.password);

        console.log(checkPassword);

        if (!checkPassword) return sendResponse(req, res, 401, "Your Old Password Is Invalid", null);

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPassword, salt);
        existingUser.password = hashedPass;
        await existingUser.save();



        sendResponse(req, res, 200, "Password Changed Successfully", existingUser);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}


//! CREATE A PASS

const createPass = async(req, res) => {
    let { visitorName, date, startTime, endTime, residentID, residentName, residentAddress, pin } = req.body;

    try {

        const passModel = new Pass({
            visitorName,
            date,
            startTime,
            endTime,
            pin,
            residentID,
            residentName,
            residentAddress,

        });


        await passModel.save();

        sendResponse(req, res, 200, "Pass Added Successfully", passModel);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}

//! GET ALL RESIDENTS

const getAllResidents = async(req, res) => {
    let { pin } = req.body;
    try {


        let allResidents = await User.find({
            pin: pin,
            userType: "resident"
        });

        sendResponse(req, res, 200, "All Residents", allResidents);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}


//! ADD VISITOR

const addVisitor = async(req, res) => {

    let { visitorName, residentID } = req.body;

    try {

        const visitorModel = new Visitor({
            visitorName,
            residentID
        })

        await visitorModel.save();
        sendResponse(req, res, 200, "Visitor Added Successfully", visitorModel);

    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}


//! VIEW ALL VISITORS

const myVisitors = async(req, res) => {

    let { residentID } = req.body;

    try {

        let AllVisitors = await Visitor.find({
            residentID: residentID
        });

        sendResponse(req, res, 200, "All Visitors", AllVisitors);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
};






//! MANAGER APIS


//! ADD ARTICLE

const addArticle = async(req, res) => {

    let { title, description, pin } = req.body;

    try {

        let articleModel = new Article({
            title,
            description,
            pin
        });

        await articleModel.save();

        sendResponse(req, res, 200, "Article Added Successfully", articleModel);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}


//! MY ARTICLE

const myArticles = async(req, res) => {

    let { pin } = req.body;

    try {

        const myAllArticle = await Article.find({
            pin
        });

        sendResponse(req, res, 200, "All Articles", myAllArticle);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}

//! EDIT ARTICLE

const editArticle = async(req, res) => {

    let { pin, articleID, title, description } = req.body;

    try {

        const editedArticle = await Article.findOne({
            pin,
            _id: articleID
        });

        editedArticle.title = title;
        editedArticle.description = description;

        await editedArticle.save();

        sendResponse(req, res, 200, "Edited Articles Successfully", editedArticle);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}

//! DELETE ARTICLE

const deleteArticle = async(req, res) => {

    let { pin, articleID } = req.body;

    try {

        await Article.findOneAndDelete({
            pin,
            _id: articleID
        })

        sendResponse(req, res, 200, "Deleted Article Successfully", null);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

}


//! DELETE RESIDENTS OF MY AREA

const deleteResident = async(req, res) => {

    let { userID } = req.body;

    try {

        const checkUserModel = await User.findOne({
            _id: userID
        });

        if (!checkUserModel) return sendResponse(req, res, 404, "User Not Found", null);

        await User.findOneAndDelete({
            _id: userID
        });

        sendResponse(req, res, 200, "User Deleted Successfully", null);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

};



//! SHOW MANAGER ITS RESIDENT DETAILS

const residentDetail = async(req, res) => {
    let { pin, userID } = req.body;

    try {

        const getUserInfo = await User.findOne({
            _id: userID
        });


        if (pin !== getUserInfo.pin) return sendResponse(req, res, 401, "Pin You Entered Is Not Matching With Your Pin", null);

        const residentDetialModel = await Resident.findOne({ pin });

        const checkUsersInResident = await User.find({
            pin
        });


        let totalSum = parseInt(residentDetialModel.plan) - checkUsersInResident.length


        sendResponse(req, res, 200, "Resident Details", { residentDetialModel, remainingUsers: totalSum, totalUsers: checkUsersInResident.length });


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }


}

//!  MANAGER EDIT ITS RESIDENT DETAILS

const editResidentDetails = async(req, res) => {
    let { pin, userID, name, address } = req.body;

    try {

        const getUserInfo = await User.findOne({
            _id: userID
        });


        if (pin !== getUserInfo.pin) return sendResponse(req, res, 401, "Pin You Entered Is Not Matching With Your Pin", null);

        const residentDetialModel = await Resident.findOne({ pin });


        residentDetialModel.name = name;
        residentDetialModel.address = address;

        residentDetialModel.save()
        sendResponse(req, res, 200, "Resident Details", residentDetialModel);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}




//! SECURITY GUARD

//! SCAN CARD

const scanCard = async(req, res) => {

    let { visitorID } = req.body;

    try {

        const checkVisitor = await Pass.findOne({
            _id: visitorID
        });

        if (checkVisitor) {

            //* Checing Valid Pin   

            let residentUser = await User.findOne({
                _id: checkVisitor.residentID
            });

            if (residentUser.pin === checkVisitor.pin) {

                const visitorHistoryModel = new VisitorHistory({
                    visitorName: checkVisitor.visitorName,
                    date: checkVisitor.date,
                    startTime: checkVisitor.startTime,
                    endTime: checkVisitor.endTime,
                    pin: checkVisitor.pin,
                    residentID: checkVisitor.residentID,
                    residentName: checkVisitor.residentName,
                    residentAddress: checkVisitor.residentAddress,

                });

                await visitorHistoryModel.save();
                sendResponse(req, res, 200, "Visitor History Added Successfully", visitorHistoryModel);

            } else {
                return sendResponse(req, res, 401, "Pin Is Not Matich With This Resident", null);
            }



        } else {
            sendResponse(req, res, 404, "No Details Found", null);
        }



    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }


}


//! ALL VISITORS HISTORY

const allVisitorsHistory = async(req, res) => {
    try {

        const allVisitors = await VisitorHistory.find();

        sendResponse(req, res, 200, "All Visitor History", allVisitors);


    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }
}

module.exports = {
    userRegister,
    userLogin,
    createPass,
    addVisitor,
    myVisitors,
    getAllResidents,
    addArticle,
    myArticles,
    editArticle,
    deleteArticle,
    deleteResident,
    scanCard,
    residentDetail,
    editResidentDetails,
    allVisitorsHistory,
    editUser,
    changePassword
}