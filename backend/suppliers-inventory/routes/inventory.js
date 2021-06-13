const express = require("express");
const router = express.Router();

const Inventory = require('../models/inventory');
/**
 * @swagger
 * /inventory:
 *   post:  
 *     summary: Post a inventory.
 *     tags:
 *      - inventory
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            quantity:
 *              type: string
 *            batchId:
 *              type: string
 *            expireDate:
 *              type: date
 *            price:
 *              type: string  
 *     responses:
 *      '200':
 *        description: "successful posted invntory"
 *      '405':
 *        description: Invalid input 
 */
router.post("",(req,res)=>{
    const inventory = new Inventory({
      email: req.body.email,
      name: req.body.name,
      quantity: req.body.quantity,
      batchId: req.body.batchId,
      expireDate: req.body.expireDate,
      price: req.body.price,
    });
    inventory.save().then(createdInventory=>{
    res.status(201).json({
        message:'Inventory Added Successfully',
        inventory: {
          ...createdInventory,
          id : createdInventory._id }
        });
    });
});
/**
 * @swagger
 * /inventory/{id}:
 *   put:  
 *     summary: Update a inventory by ID.
 *     tags:
 *      - inventory
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema: 
 *          $ref: "#/definitions/inventory"
 *      - in: path
 *        name: id
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *        description: successful update
 *       404: 
 *        description: inventory not found
 *       500:
 *        description: Internal server error!! 
 * definitions:
 *  inventory:
 *    type: object
 *    properties:
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            quantity:
 *              type: string
 *            batchId:
 *              type: string
 *            expireDate:
 *              type: date
 *            price:
 *              type: string  
 */
router.put("/:id", (req,res)=>{
    const inventory = new Inventory({
      _id: req.body.id,
      email: req.body.email,
      name: req.body.name,
      quantity: req.body.quantity,
      batchId: req.body.batchId,
      expireDate:new Date(req.body.expireDate),
      price: req.body.price
    });
    console.log(inventory);
    Inventory.updateOne({_id: req.params.id}, inventory).then(result => {
      console.log(result);
      res.status(200).json({message : "Update Successful !"});
    });
});
/**
 * @swagger
 * /inventory:
 *   get:  
 *     summary: Get all inventory items.
 *     tags:
 *      - inventory
 *     description: 
 *     responses:
 *       200:
 *         description: get all inventory items.
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
    const postQuery = Inventory.find();
    postQuery.then(documents=>{
      res.status(200).json({
        message : 'inventory added sucessfully',
        inventorys :documents
      });
    });
});
/**
 * @swagger
 * /inventory/{id}:
 *   get:  
 *     summary: Get a inventory item by ID.
 *     tags:
 *      - inventory
 *     produces:
 *        - application/json
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *     responses:
 *        200:
 *           description: search for inventory by Id
 *           schema:
 *              $ref: "#/definitions/inventory"
 *        404:
 *          description: not found
 * definitions:
 *  inventory:
 *    type: object
 *    properties:
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            quantity:
 *              type: string
 *            batchId:
 *              type: string
 *            expireDate:
 *              type: date
 *            price:
 *              type: string  
 */
router.get("/:id",(req,res,next)=>{
    Inventory.findById(req.params.id).then(inventory =>{
      if(inventory){
        res.status(200).json(inventory);
      }else{
        res.status(200).json({message:'Inventory not found'});
      }
    });
});
/**
 * @swagger
 * /inventory/{id}:
 *   delete:  
 *     summary: Delete a inventory item by ID.
 *     tags:
 *      - inventory
 *     produces:
 *      - appication/json
 *     parameters:
 *      - in: path
 *        name: id   
 *     responses:
 *       200:
 *        description: supplier deleted
 *       404:
 *        description: Inventory not found
 *       500:
 *        description: Internal server error
 */
router.delete("/:id", (req, res, next) => {
    Inventory.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'Inventory deleted!' });
    });
});

module.exports = router;
