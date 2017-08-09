import app from '../app.js';
import {expect} from 'chai';
import router from '../routes/routes';
import should from 'should';
import supertest from 'supertest';

/*
*@param null
*@return String
*/

// Generate random email addresses to run several tests
const randomEmail = () => {
    // Initialize variable email to an empty string
    let email = ''
    const Alpha = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++) {
        // Randomize testAlphabets and numbers
        email += Alpha.charAt(Math.floor(Math.random() * tAlpha.length));
    }

    return email + '@gmail.com';
}
// Create an instance of supertest with the target file as argument
// Using the same const declaration, Initialize variables registeredUser&&user1
const appTest = supertest(app),
    registeredUser = {
        'email': 'jtz2it7wf49j1dj@gmail.com',
        'password': 'code'
    },
    user1 = {
        "username": "MartinsSS",
        "password": "code",
        // Call the randString function to genrate random email addresses
        "email": randomEmail(),
        "role": "user",
        "membership": "Pro"
    };

// Test routes
describe("Routes", () => {

    it("should show landing page", (done) => {
        appTest.get("/api").
            end((error, res) => {
                console.log(error, res.body, res.send);
                done();
            });
    });
    it("should return 200", (done) => {
        appTest.get("/api").
            end((error, res) => {
                console.log(error, res.body, res.status);
                done();
            });
    });
    it("should register new users", (done) => {
        appTest.post("/api/users/signup").
            set("Action", "application/json").
            send(user1).
            end((error, res) => {
                console.log(error);
                expect(res.status).is.equal(201);
                done();
            });
    });
    it("it should signin a registered user", (done) => {
        appTest.post("/api/users/signin").
            set("Action", "Application/json").
            send(registeredUser).
            end((error, res) => {
                expect(res.status).is.equal(200);
                done();
            });
    });
})
