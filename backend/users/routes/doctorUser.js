const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DoctorUser = require('../models/doctorUser');

/**
 * @swagger
 * /doctorUser/doctorSignup:
 *   post:
 *     summary: Doctor signup.
 *     tags:
 *      - doctor
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
router.post("/doctorSignup",(req,res,next)=>{

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const doctorUser = new DoctorUser({
        name : req.body.name,
        contact : req.body.contact,
        email : req.body.email,
        password : hash
      });

      doctorUser.save()
        .then(result =>{
          res.status(201).json({
            message : 'Doctor Account created!',
            result: result
          });
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
 * /doctorUser/doctorLogin:
 *   post:
 *     summary: Doctor login.
 *     tags:
 *      - doctor
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
 *      description: "doctor login successful"
 *    '405':
 *      description: Invalid input
 */
router.post("/doctorLogin" , (req, res ,  next)=>{
  let fetchedUser;
  DoctorUser.findOne({email: req.body.email}).then(user=>{
    if(!user){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser=user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result =>{
    if(!result){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email , userId : fetchedUser ._id, name:fetchedUser.name, contact:fetchedUser.contact} ,
      'this_is_the_webToken_secret_key' ,
      { expiresIn : "1h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        name: fetchedUser.name,
        email: fetchedUser.email,
        contact: fetchedUser.contact,
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
 * /doctorUser/getDoctorUserData:
 *   get:
 *     summary: Retrieve all doctors.
 *     tags:
 *      - doctor
 *     description: 
 *     responses:
 *       200:
 *         description: A list of doctors.
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
router.get("/getDoctorUserData",(req,res,next)=>{
  DoctorUser.find().then(documents=>{
    res.status(200).json({
      message : 'Doctor added sucessfully',
      doctors :documents
    });
  });
});
/**
 * @swagger
 * /doctorUser/{id}:
 *   get:
 *     summary: Retrieve a doctor by ID.
 *     tags:
 *      - doctor
 *     operationId: getdoctor
 *     description: Retrieve a doctor by ID.
 *     produces:
 *        - application/json
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *     responses:
 *        200:
 *           description: search for doctor by Id
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
 */
router.get("/:id",(req,res,next)=>{
  DoctorUser.findById(req.params.id).then(doctor =>{
    if(doctor){
      res.status(200).json(doctor);
    }else{
      res.status(200).json({message:'doctor not found'});
    }
  });
});
/**
 * @swagger
 * /doctorUser/{id}:
 *   put:
 *     summary: Update a doctor by ID.
 *     tags:
 *      - doctor
 *     operationId: updatedoctor
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
 *        description: doctor not found
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
    const doctor = new DoctorUser({
      _id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: hash
    });

  DoctorUser.updateOne({_id: req.params.id}, doctor)
  .then(result => {
    console.log(result);
    res.status(200).json({message : "Update doctor Successful !"});
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
 * /doctorUser/{id}:
 *   delete:
 *     summary: Delete a doctor by ID.
 *     tags:
 *      - doctor
 *     operationId: deletedoctor
 *     produces:
 *      - appication/json
 *     parameters:
 *      - in: path
 *        name: id   
 *     responses:
 *       200:
 *        description: Doctor deleted
 *       404:
 *        description: Doctor not found
 *       500:
 *        description: Internal server error 
 */
router.delete("/:id",(req, res, next) => {
  DoctorUser.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'doctor deleted!' });
  });
});

module.exports = router;
