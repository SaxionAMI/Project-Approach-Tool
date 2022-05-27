const request = require("supertest")("http://localhost:13788");
const auth=require("./auth");

before(async ()=>{
    global.token=await auth.generateToken("student");
});


// test create a workspace good weather
describe("POST /workspace", ()=>{
    it("Should create a workspace with given request body", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd2b",
            title: "sample title",
            goal: "sample goal",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request
            .post("/workspace")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test create a workspace bad weather
describe("POST /workspace", ()=>{
    it("Should not be able to create a workspace with given request body because the request body is the wrong format", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd2bhaha",
            tittttle: "sample title",
            goal: "sample goal",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request
            .post("/workspace")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});











// test get workspace by id good weather
describe("GET /workspace/:_id", ()=>{
    it("Should get a workspace by given id", (done)=>{
        request
            .get("/deck/5e30276e8b5f721a0cc1f415")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

