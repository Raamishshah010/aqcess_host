const Resident = require('../model/Resident')
const sendResponse = require('../utils/sendResponse');

const checkPin = async(req, res, next) => {
    try {
        const { pin } = req.body;

        const checkedPin = await Resident.findOne({ pin: pin })

        if (!checkedPin) return sendResponse(req, res, 404, "Invalid Pin", null);

        next();

    } catch (error) {
        res.json(error.message);
    }
}


module.exports = { checkPin }