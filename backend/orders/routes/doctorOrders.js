const express = require("express");
const router = express.Router();
const DoctorOder = require('../models/doctorOrders');

/**
 * @swagger
 * /doctorOrder:
 *   post:  
 *     summary: Post a order.
 *     tags:
 *      - orders
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
 *        description: "successful posted doctorOrder"
 *      '405':
 *        description: Invalid input  
 */
router.post("",(req,res)=>{
    const docOder = new DoctorOder({
      doctorName: req.body.doctorName,
      doctorContact: req.body.doctorContact,
      doctorEmail: req.body.doctorEmail,
      drugNames: req.body.drugName,
      drugPrice: req.body.drugPrice,
      drugQuantity: req.body.drugQuantity,
      totalAmount: req.body.totalAmount,
      pickupDate: req.body.pickupDate
    });
    docOder.save().then(createdDocOder=>{
    res.status(201).json({
      message:'Doctor Order Added Successfully',
      doctorOderId : createdDocOder._id
    });
  
});
});
/**
 * @swagger
 * /doctorOrder:
 *   get:  
 *     summary: Get all orders.
 *     tags:
 *      - orders
 *     description: 
 *     responses:
 *       200:
 *         description: get all ordes.
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
router.get("",(req,res)=>{
    DoctorOder.find().then(documents=>{
      res.status(200).json({
        message : 'Doctor oder added sucessfully',
        doctorOders :documents
      });
    });
  });
/**
 * @swagger
 * /doctorOrder/{id}:
 *   delete:  
 *     summary: Delete a order by ID.
 *     tags:
 *      - orders
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
    DoctorOder.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'Doctor order deleted!' });
    });
});

module.exports = router;
