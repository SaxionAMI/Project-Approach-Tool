const request = require("supertest")("http://localhost:13788");
const auth=require("./auth");

before(async ()=>{
    global.token=await auth.generateToken("student");
});


// test get all templates good weather
describe("GET /template", ()=>{
    it("Should get all templates", (done)=>{
        request
            .get("/template")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test get all templates when unauthorzied
describe("GET /template", ()=>{
    it("Should not get templates", (done)=>{
        request
            .get("/template")
            .expect(403, done);
    });
});
