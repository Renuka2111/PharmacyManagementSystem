const express = require("express");
const router = express.Router();

const Supplier = require('../models/supplier');

/**
 * @swagger
 * /supplier:
 *   post:  
 *     summary: Post a supplier.
 *     tags:
 *      - supplier
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            supplierID:
 *              type: string
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            contact:
 *              type: string
 *            drugsAvailable:
 *              type: string   
 *     responses:
 *      '200':
 *        description: "successful posted supplier"
 *      '405':
 *        description: Invalid input
 */
router.post("",(req,res)=>{
    const supplier = new Supplier({
      supplierID: req.body.supplierID,
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      drugsAvailable: req.body.drugsAvailable
    });
    supplier.save().then(createdSupplier=>{
    res.status(201).json({
      message:'Supplier Added Successfully',
      supplierId : createdSupplier._id
    });
  
    });
});
/**
 * @swagger
 * /supplier/{id}:
 *   put:  
 *     summary: Update a supplier by id.
 *     tags:
 *      - supplier
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema: 
 *          $ref: "#/definitions/supplier"
 *      - in: path
 *        name: id
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *        description: successful update
 *       404: 
 *        description: Supplier not found
 *       500:
 *        description: Internal server error!! 
 * definitions:
 *  supplier:
 *    type: object
 *    properties:
 *            supplierID:
 *              type: string
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            contact:
 *              type: string
 *            drugsAvailable:
 *              type: string 
 */
router.put("/:id",(req,res)=>{
    const supplier = new Supplier({
     _id: req.body.id,
      supplierID: req.body.supplierID,
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      drugsAvailable: req.body.drugsAvailable
    });
    Supplier.updateOne({_id: req.params.id}, supplier).then(result => {
      console.log(result);
      res.status(200).json({message : "Update Successful !"});
    })
    .catch(err =>{
        res.status(500).json({
        error :err
       });
})
});
/**
 * @swagger
 * /supplier:
 *   get:  
 *     summary: Get all suppliers.
 *     tags:
 *      - supplier
 *     description: 
 *     responses:
 *       200:
 *         description: get all suppliers.
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
    Supplier.find().then(documents=>{
      res.status(200).json({
        message : 'supplier added sucessfully',
        suppliers :documents
      });
    });
});
/**
 * @swagger
 * /supplier/{id}:
 *   get:  
 *     summary: Get a supplier by ID.
 *     tags:
 *      - supplier
 *     produces:
 *        - application/json
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *     responses:
 *        200:
 *           description: search for supplier by Id
 *           schema:
 *              $ref: "#/definitions/supplier"
 *        404:
 *          description: not found
 * definitions:
 *  supplier:
 *    type: object
 *    properties:
 *            supplierID:
 *              type: string
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            contact:
 *              type: string
 *            drugsAvailable:
 *              type: string 
 */
router.get("/:id",(req,res,next)=>{
    Supplier.findById(req.params.id).then(supplier =>{
      if(supplier){
        res.status(200).json(supplier);
      }else{
        res.status(200).json({message:'suplier not found'});
      }
    });
});
/**
 * @swagger
 * /supplier/{id}:
 *   delete:  
 *     summary: delete a supplier by id.
 *     tags:
 *      - supplier
 *     produces:
 *      - appication/json
 *     parameters:
 *      - in: path
 *        name: id   
 *     responses:
 *       200:
 *        description: supplier deleted
 *       404:
 *        description: Supplier not found
 *       500:
 *        description: Internal server error
 */
router.delete("/:id",(req, res, next) => {
    Supplier.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'Supplier deleted!' });
    });
});

module.exports = router;