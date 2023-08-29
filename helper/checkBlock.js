const User = require('../model/User');

const sendResponse = require('../utils/sendResponse');

const checkBlock = async(req, res, next) => {
    let { email } = req.body;

    try {
        const checkBlockUser = await User.findOne({
            email: email
        });


        if (checkBlockUser.isBlocked) return sendResponse(req, res, 401, "You Are Blocked By Admin", null);

        next();

    } catch (error) {
        sendResponse(req, res, 500, "Server Error", error.message);

    }

};


module.exports = checkBlock;