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

// test get example template
describe("GET /template/example", ()=>{
    it("Should get all example templates", (done)=>{
        request
            .get("/template/example")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test get example tempalte when unauthorized
describe("GET /template/example", ()=>{
    it("Should not get example templates", (done)=>{
        request
            .get("/template/example")
            .expect(403, done);
    });
});


// create a template good weather
describe("POST /template", ()=>{
    it("Should create a template", (done)=>{
        const body = {
            title: "sample template title",
            goal: "sample template goal",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request
            .post("/template")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});


// create a template bad weather
describe("POST /template", ()=>{
    it("Should not create a template", (done)=>{
        const body = {
            title: "sample template title",
            gooooooal: "sample template goal",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request
            .post("/template")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// create a template when unauthorized
describe("POST /template", ()=>{
    it("Should not create a template", (done)=>{
        const body = {
            title: "sample template title",
            goal: "sample template goal",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request
            .post("/template")
            .send(body)
            .expect(403, done);
    });
});


