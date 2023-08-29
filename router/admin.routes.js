const express = require("express");
const router = express.Router();
const { checkPin } = require('../utils/checkPin');


//! CONTROLLERS
const {
    adminRegister,
    adminLogin,
    addResident,
    allResidents,
    editResident,
    allManagers,
    managersOfArea,
    singleManagerDetails,
    editManagerDetails,
    allUsers,
    userOfArea,
    singleUserDetails,
    securityGuardOfArea,
    singleSecurityGuardDetails,
    editSecurityGuardDetails,
    allSecurityGuards,
    singleResident
} = require("../controller/adminController");

// !ADMIN AUTH
router.post('/register', adminRegister);
router.post('/login', adminLogin);



//! RESIDENT AREAS CRUD
router.get('/all-resident', allResidents);
router.post('/add-resident', addResident);
router.post('/single-resident', singleResident);
router.post('/edit-resident', editResident);



//! MANAGERS CRUD

router.get('/all-managers', allManagers);
router.post('/all-managers-of-area', checkPin, managersOfArea);
router.post('/single-manager', singleManagerDetails);
router.post('/block-manager', editManagerDetails);


//! RESIDENTS CRUD

router.get('/all-users', allUsers);
router.post('/all-users-of-area', checkPin, userOfArea);
router.post('/single-user', singleUserDetails);



//! SECURITY GUARD CRUD

router.get('/all-security-guards', allSecurityGuards)
router.post('/all-security-of-area', checkPin, securityGuardOfArea);
router.post('/single-security', singleSecurityGuardDetails);
router.post('/block-security', editSecurityGuardDetails);



module.exports = router;