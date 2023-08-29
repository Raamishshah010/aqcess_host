const express = require("express");
const router = express.Router();

const { checkPin } = require('../utils/checkPin');

//! CONTROLLERS
const {
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
    changePassword,

} = require("../controller/userController.js");
const checkBlock = require("../helper/checkBlock");

// !USER AUTH
router.post('/register', checkPin, userRegister);
router.post('/login', checkPin, checkBlock, userLogin);
router.post('/edit-user', editUser);
router.post('/change-password', changePassword);



//!PASS
router.post('/add-pass', checkPin, createPass);
router.post('/all-resident', checkPin, getAllResidents);


//! VISITOR
router.post('/add-vistor', addVisitor);
router.post('/my-vistors', myVisitors);



//!MANAGER API ROUTERS

//! ARTICLES
router.post('/add-article', addArticle);
router.post('/all-articles', myArticles);
router.post('/edit-article', editArticle);
router.post('/delete-article', deleteArticle);

//! DELETE RESIDENT USER
router.post('/delete-user', deleteResident);


//! GET RESIDENT AREA DETIAL

router.post('/get-resident', checkPin, residentDetail);
router.post('/edit-resident', checkPin, editResidentDetails);


//! SECURITY GUARD API ROUTERS
router.post('/scan-card', checkPin, scanCard);
router.get('/visitor-history', allVisitorsHistory);


module.exports = router;