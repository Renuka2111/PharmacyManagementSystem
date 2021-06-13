const express = require("express");
const router = express.Router();
const Sales = require('../models/sales');

/**
 * @swagger
 * /sales:
 *   post:  
 *     summary: Post sales.
 *     tags:
 *      - sales
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            drugName:
 *              type: string
 *            totalPrice:
 *              type: string
 *            paidAmount:
 *              type: string
 *            balance:
 *              type: string 
 *     responses:
 *      '200':
 *        description: "successful posted sales"
 *      '405':
 *        description: Invalid input  
 */
router.post("",(req,res)=>{
    const sales = new Sales({
      drugName: req.body.drugName,
      totalPrice: req.body.totalPrice,
      paidAmount: req.body.paidAmount,
      balance: req.body.balance
    });
  
    sales.save().then(createdSales=>{
    res.status(201).json({
      message:'Sales Added Successfully',
      salesId : createdSales._id
  });
 });
});


/**
 * @swagger
 * /sales:
 *   get:  
 *     summary: Get sales.
 *     tags:
 *      - sales
 *     description: 
 *     responses:
 *       200:
 *         description: get sales.
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
    Sales.find().then(documents=>{
      res.status(200).json({
        message : 'sales added sucessfully',
        sales :documents
      });
    });
  });
module.exports = router;
