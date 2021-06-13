const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

/**
 * @swagger
 * /admin/signup:
 *   post:  
 *     summary: admin signup.
 *     tags:
 *      - admin
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            contact:
 *              type: string
 *            email: 
 *              type: string
 *            password:
 *               type: string
 *   responses:
 *    '200':
 *      description: "successful signup"
 *    '405':
 *      description: Invalid input
 * 
 */
router.post("/signup",  (req,res)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const admin = new Admin({
        name : req.body.name,
        contact : req.body.contact,
        email : req.body.email,
        password : hash,
      });

      admin.save()
        .then(result =>{
          res.status(201).json({
            message : 'admin created!',
            result: result
          });
        })

        .catch(err =>{
          res.status(500).json({
            error :err
          });
        });
    })
  })

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: admin login.
 *     tags:
 *      - admin
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            password:
 *               type: string 
 *   responses:
 *    '200':
 *      description: "admin login successful"
 *    '405':
 *      description: Invalid input
 */
router.post("/login" , (req, res ,  next)=>{
  let fetchedUser;
  Admin.findOne({email: req.body.email}).then(admin=>{
    if(!admin){
      return res.status(401).json({
        token: "error",
        expiresIn: "error",
        message: "Invalid Email (user email not registered)"
      });
    }
    fetchedUser=admin;
    return bcrypt.compare(req.body.password, admin.password);
  })
  .then(result =>{
    if(!result){
      return res.status(401).json({
        token: "error",
        expiresIn: "error",
        message: "Invalid password please try again"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email , adminId : fetchedUser ._id } ,
      'this_is_the_webToken_secret_key' ,
      { expiresIn : "1h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        message: "Logged in Successfully"
      });
  })
  .catch(err =>{
    return res.status(401).json({
      message: "Auth failed"
    });
  });
})

/**
 * @swagger
 * /admin/getUserData:
 *   get:
 *     summary: Retrieve a list of admins.
 *     tags:
 *      - admin
 *     description: 
 *     responses:
 *       200:
 *         description: A list of admins.
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
router.get("/getUserData",(req,res,next)=>{
  Admin.find().then(documents=>{
    res.status(200).json({
      message : 'user added sucessfully',
      admins :documents
    });
  });
});

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Retrieve a admin by ID.
 *     tags:
 *      - admin
 *     operationId: getAdmin
 *     description: Retrieve a admin by ID.
 *     produces:
 *        - application/json
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *     responses:
 *        200:
 *           description: search for admin by Id
 *           schema:
 *              $ref: "#/definitions/Admins"
 *        404:
 *          description: not found
 * definitions:
 *  Admins:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      contact:
 *        type: string
 *      email: 
 *        type: string
 *      password:
 *        type: string
 *    
 */

router.get("/:id",(req,res,next)=>{
  Admin.findById(req.params.id).then(admin =>{
    if(admin){
      res.status(200).json(admin);
    }else{
      res.status(200).json({message:'admin not found'});
    }
  });
});
/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Upadate a admin by ID.
 *     tags:
 *      - admin
 *     operationId: updateadmin
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema: 
 *          $ref: "#/definitions/Admins"
 *      - in: path
 *        name: id
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *        description: successful update
 *       404: 
 *        description: admin not found
 *       500:
 *        description: Internal server error!! 
 * definitions:
 *  Admins:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      contact:
 *        type: string
 *      email: 
 *        type: string
 *      password:
 *        type: string     
 */
router.put("/:id",(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const admin = new Admin({
      _id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: hash,
    });

    Admin.updateOne({_id: req.params.id}, admin)
  .then(result => {
    console.log(result);
    res.status(200).json({message : "Update user Successful !"});
  })
  .catch(err =>{
    res.status(500).json({
    error :err
   });
});

})
});
/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Delete a admin by ID.
 *     tags:
 *      - admin
 *     operationId: deleteAdmin
 *     produces:
 *      - appication/json
 *     parameters:
 *      - in: path
 *        name: id   
 *     responses:
 *       200:
 *        description: Admin deleted
 *       404:
 *        description: Admin not found
 *       500:
 *        description: Internal server error       
 */
router.delete("/:id",(req, res, next) => {
  Admin.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'user deleted!' });
  });
});

module.exports = router;
