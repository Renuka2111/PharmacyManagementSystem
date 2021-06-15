const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT =process.env.PORT;

const app = express();
const adminRoutes = require('./routes/admin');
const doctorUserRoutes = require('./routes/doctorUser');

//Set up mongoose connection
mongoose.connect('mongodb+srv://Renuka:Renuka@cluster0.10ayp.mongodb.net/userservice',{useNewUrlParser: true , useUnifiedTopology: true})
  .then(()=>{
    console.log('connected to database!');
  })
  .catch(()=>{
    console.log('connection failed! ');
  });
  mongoose.set('useCreateIndex', true);

//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With ,Content-Type,Authorization ,Accept",
    "HTTP/1.1 200 OK",
    "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS,PUT"
  );
  next();
});

app.use("/api/admin",adminRoutes);
app.use("/api/doctorUser",doctorUserRoutes);

//listening to Port 
app.listen(PORT,"0.0.0.0", ()=>
  console.log(`Users service at port ${PORT}`)
);
module.exports=app;

//Swagger api
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Swagger for users',
    version: '1.0.0',
    description:
      ''
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
      description: 'Development server',
    },
  ],
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

