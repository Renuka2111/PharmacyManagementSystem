const request=require('supertest');
const app=require('../index');

describe('GET/api/supplier/',function(){
    it('respond with json a list of all suppliers', function(done){
        request(app)
            .get('/api/supplier')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200,done)
    });
});

describe('GET/api/supplier/:id',function(){
    it('respond with json a supplier by ID', function(done){
        request(app)
            .get('/api/supplier/:id')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200,done)
    });
});

describe('POST/api/supplier',function(){
    
    let data={
        "supplierID":"S001",
        "name":"Suresh",
        "email":"r@gmail.com",
        "contact":"7894561236",
        "drugsAvailable":"100"
    }
    it('respond with 201 created', function(done){
        request(app)
            .post('/api/supplier')
            .send(data)
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(201)
            .end((err)=>{
                if(err) return done(err);
                done();
            });
    });
});

describe('PUT/api/supplier/:id',function(){
    
    let data={
        "_id":"456123",
        "supplierID":"S001",
        "name":"Suresh",
        "email":"r@gmail.com",
        "contact":"7894561236",
        "drugsAvailable":"100"
    }
    it('respond with 201 created', function(done){
        request(app)
            .put('/api/supplier/:id')
            .send(data)
            .end((err)=>{
                if(err) return done(err);
                done();
            });
    });
}); 