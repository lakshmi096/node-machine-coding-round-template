var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const boothModel = require("../database/models/booth.model")
const tollModel = require("../database/models/toll.model")
const passModel = require("../database/models/pass.model")
const vehiclepassModel = require("../database/models/vehiclepass.model")
const mongoose = require("mongoose")


/* POST on buying a pass. */
router.post('/vehicle/:regNo/buy', 
    body('boothId').isString().isLength({ min: 1 }),
    body('passId').isString().isLength({ min: 1 }),
    async function(req, res) {
        
        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({status: "failure", reason: "Invalid input" })
        }
        let {boothId, passId} = req.body;
        const { regNo } = req.params;

        boothId = new mongoose.mongo.ObjectId(boothId)
        passId = new mongoose.mongo.ObjectId(passId)

        const booth = await boothModel.findById(boothId)
        const pass = await passModel.findById(passId)
        const toll = await tollModel.findById(pass._tollId)

        
        //check vehicle has valid pass
        const getVehiclePasses = await vehiclepassModel
        .find({ regNo: regNo, _boothId: boothId })
        .sort({ createdAt: -1 })
        .lean()
        .exec()

        //vehicle has no registrations
        if( getVehiclePasses.length > 0) {
            if(getVehiclePasses[0].expiresAt > new Date()) {
                return res.status(200).send({ passes: pass, message: "You already have a active pass" });
            }
            if(getVehiclePasses[0].expiresAt == null && getVehiclePasses[0].usageLimit > 0) {
                return res.status(200).send({ passes: pass, message: "You already have a active pass" });
            }
        }

        let vehiclePass = {
            _tollId: toll,
            _boothId: booth,
            _passId: pass,
            regNo,
            charge: pass.charge,
            isUnlimited: pass.isUnlimited,
            usageLimit: pass.usageLimit
        }
        if(pass.validHours) {
            const expiresAt = new Date()
            expiresAt.setHours(expiresAt.getHours() + pass.validHours)
            vehiclePass.expiresAt = expiresAt
        }
        const savedPass = await vehiclepassModel.create(vehiclePass);

        return res.status(201).send(savedPass);
    }
);

/* POST on creating a articles. */
router.post('/vehicle/:regNo/crosstoll', 
    body('boothId').isString().isLength({ min: 1 }),
    async function(req, res) {
        
        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({status: "failure", reason: "Invalid input" })
        }
        let { boothId, vehicleTypeId } = req.body;
        const { regNo } = req.params;

        boothId = new mongoose.mongo.ObjectId(boothId)
        vehicleTypeId = new mongoose.mongo.ObjectId(vehicleTypeId)

        const booth = await boothModel.findById(boothId)
        const toll = await tollModel.findById(booth._tollId)
        const pass = await passModel.find({ _vehicleType: vehicleTypeId })

        
        //check vehicle has valid pass
        const getVehiclePasses = await vehiclepassModel
        .find({ regNo: regNo, _boothId: boothId })
        .sort({ createdAt: -1 })
        .lean()
        .exec()

        //vehicle has no registrations
        if(getVehiclePasses.length == 0) {
            return res.status(200).send({ passes: pass, message: "No active pass. Please buy one" });
        }

        const latestPass = getVehiclePasses[0]

        if(latestPass.isUnlimited) {
            //check pass time expired
            if(latestPass.expiresAt < new Date()) {
                return res.status(200).send({ passes: pass, message: "Pass has expired Please buy one #" });
            }

        } else {
            //check pass time expired
            if(latestPass.expiresAt && latestPass.expiresAt < new Date()) {
                return res.status(200).send({ passes: pass, message: "Pass has expired Please buy one ##" });
            }
            //check pass usage expired
            if(latestPass.usageLimit === 0) {
                return res.status(200).send({ passes: pass, message: "Pass has expired Please buy one ###" });
            }
            latestPass.usageLimit = latestPass.usageLimit - 1
        }
        latestPass.crossedTollNumber = latestPass.crossedTollNumber + 1
        const updatedPass = await vehiclepassModel.findByIdAndUpdate(latestPass._id, latestPass, { new: true });

        return res.status(200).send(updatedPass);
    }
);

/* GET users listing. */
router.get('/toll/:tollId/leaderboard', async function(req, res, next) {
    let { tollId } = req.params;

    tollId = new mongoose.mongo.ObjectId(tollId)
    const vehiclePassesByTollId = await vehiclepassModel.find({ _tollId: tollId })
    let tollSales = {}
    vehiclePassesByTollId.forEach((vehiclePass) => {
        if(tollSales[vehiclePass._boothId]){
            tollSales[vehiclePass._boothId].vehiclesProcessed += vehiclePass.crossedTollNumber
            tollSales[vehiclePass._boothId].chargesCollected += vehiclePass.charge
        } else {
            const values = {
                vehiclesProcessed : vehiclePass.crossedTollNumber,
                chargesCollected : vehiclePass.charge
            }
            tollSales[vehiclePass._boothId] = values
        }
    })
    const leaderboard = []
    for(tollId in tollSales) {
        const value = {
            tollId: tollId,
            vehiclesProcessed: tollSales[tollId].vehiclesProcessed,
            chargesCollected: tollSales[tollId].chargesCollected
        }
        leaderboard.push(value)
    }

    return res.status(201).send(leaderboard);
}); 

module.exports = router;
