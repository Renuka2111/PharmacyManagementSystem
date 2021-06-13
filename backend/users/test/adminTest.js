
const request=require('supertest');
const app=require('../index');

describe('GET/api/admin/getUserData',function(){
    it('respond with json a list of all admins', function(done){
        request(app)
            .get('/api/admin/getUserData')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200,done)
    });
});

describe('POST/api/admin/signup',function(){
    
    let data={
        "name":"renuka",
        "contact":"7894561236",
        "email":"r@gmail.com",
        "password":"12p78$7896"
    }
    it('respond with 201 created', function(done){
        request(app)
            .post('/api/admin/signup')
            .send(data)
            .expect(201)
            .end((err)=>{
                if(err) return done(err);
                done();
            });
    });
});

describe('GET/api/admin/:id',function(){
    it('respond with json containing a single admin', function(done){
        request(app)
            .get('/api/admin/:id')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200,done)
    });
});