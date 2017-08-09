import app from "../app";
import {expect} from "chai";
import router from "../routes/routes";
import should from "should";
import supertest from "supertest";


// Generate random email addresses to run several tests
const randString = () => {

    // Initialize variable email to an empty string
    let email = ""
    const tAlpha = "abcdefghijklmnopqrstuvwxyz0123456789";

    // Loop through the list of characters
    for (let i = 0; i < 15; i++) {
        // Randomize testAlphabets and numbers
        email += tAlpha.charAt(Math.floor(Math.random() * tAlpha.length));

    }
    // Return the randomized characters with @... appended
    return email + "@gmail.com";

}
// Create an instance of supertest with the target file as argument
// Using the same const declaration, Initialize variables registeredUser&&user1
const appTest = supertest(app),
    registeredUser = {
        "email": "nfej5bl4s8f4uw0@gmail.com",
        "password": "code"
    },
    user1 = {
        "username": "MartinsSS",
        "password": "code",
        // Call the randString function to genrate random email addresses
        "email": randString(),
        "role": "user",
        "membership": "Pro"
    };

// Test the routes
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
