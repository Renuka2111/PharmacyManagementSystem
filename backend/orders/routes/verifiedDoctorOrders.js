const express = require("express");
const router = express.Router();
const VerifiedDoctorOder = require('../models/verifiedDoctorOrders');

/**
 * @swagger
 * /verifiedDoctorOrder:
 *   post:  
 *     summary: Post a verifiedorder.
 *     tags:
 *      - verifiedOrders
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
 *        description: "successful posted verifiedOrder"
 *      '405':
 *        description: Invalid input
 */
router.post("",(req,res,next)=>{
  const VerifiedDocOder = new VerifiedDoctorOder({
    doctorName: req.body.doctorName,
    doctorContact: req.body.doctorContact,
    doctorEmail: req.body.doctorEmail,
    drugNames: req.body.drugName,
    drugPrice: req.body.drugPrice,
    drugQuantity: req.body.drugQuantity,
    totalAmount: req.body.totalAmount,
    pickupDate: req.body.pickupDate
  });

  VerifiedDocOder.save().then(createdDocOder=>{
  res.status(201).json({
    message:'Verified Doctor Oder Added Successfully',
    doctorOderId : createdDocOder._id
    });
  });
});
/**
 * @swagger
 * /verifiedDoctorOrder:
 *   get:  
 *     summary: Get all verifiedordes.
 *     tags:
 *      - verifiedOrders
 *     description: 
 *     responses:
 *       200:
 *         description: Get all verifiedordes.
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
  VerifiedDoctorOder.find().then(documents=>{
    res.status(200).json({
      message : 'Doctor verify oder added sucessfully',
      doctorOders :documents
    });
  });
});

/**
 * @swagger
 * /verifiedDoctorOrder/{id}:
 *   delete:  
 *     summary: Delete a verifiedorder by ID.
 *     tags:
 *      - verifiedOrders
 *     produces:
 *      - appication/json
 *     parameters:
 *      - in: path
 *        name: id   
 *     responses:
 *       200:
 *        description: Order deleted
 *       404:
 *        description: Order not found
 *       500:
 *        description: Internal server error
 */
router.delete("/:id", (req, res, next) => {
  VerifiedDoctorOder.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Doctor verified order deleted!' });
  });
});

module.exports = router;
