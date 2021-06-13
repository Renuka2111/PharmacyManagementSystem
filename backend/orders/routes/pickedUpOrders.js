const express = require("express");
const router = express.Router();
const PickedUpDoctorOder = require('../models/pickedUpOrders');
/**
 * @swagger
 * /pickedUpOrders:
 *   post:  
 *     summary: Post a pickedUpOrders.
 *     tags:
 *      - pickedUpOrders
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            doctorName:
 *              type: string
 *            doctorContact:
 *              type: string
 *            doctorEmail:
 *              type: string
 *            drugNames:
 *              type: array
 *            drugPrice:
 *              type: array
 *            drugQuantity:
 *              type: array
 *            totalAmount:
 *              type: string
 *            pickupDate:
 *              type: string  
 *     responses:
 *      '200':
 *        description: "successful posted pickedUpOrder"
 *      '405':
 *        description: Invalid input
 */
router.post("",(req,res)=>{
  const PickedUpDocOder = new PickedUpDoctorOder({
    doctorName: req.body.doctorName,
    doctorContact: req.body.doctorContact,
    doctorEmail: req.body.doctorEmail,
    drugNames: req.body.drugName,
    drugPrice: req.body.drugPrice,
    drugQuantity: req.body.drugQuantity,
    totalAmount: req.body.totalAmount,
    pickupDate: req.body.pickupDate
  });

  PickedUpDocOder.save().then(createdDocOder=>{
  res.status(201).json({
    message:'Picked Up Doctor Oder Added Successfully',
    doctorOderId : createdDocOder._id
    });
  });
});

/**
 * @swagger
 * /pickedUpOrders:
 *   get:  
 *     summary: Get all pickedUpOrders.
 *     tags:
 *      - pickedUpOrders
 *     description: 
 *     responses:
 *       200:
 *         description: Get all pickedUpOrders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("",(req,res,next)=>{
  PickedUpDoctorOder.find().then(documents=>{
    res.status(200).json({
      message : 'Doctor picked up oder added sucessfully',
      doctorOders :documents
    });
  });
});

module.exports = router;
