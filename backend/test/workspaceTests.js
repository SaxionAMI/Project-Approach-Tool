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
            .get("/workspace/62905d8d67e5b552986ddd2b")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test get workspace by id good weather
describe("GET /workspace/:_id", ()=>{
    it("Should not be able to get a workspace by given id because no workspace with given id exists", (done)=>{
        request
            .get("/workspace/62905d8d67e5b552986ddd2bhaha")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});


// test upsert a workspace when no workspace exists with given id good weather
describe("POST /workspace/:_id", ()=>{
    it("Should create a workspace with given request body and the given id", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd16",
            title: "sample title upsert first time",
            goal: "sample goal upsert first time",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request
            .post("/workspace/62905d8d67e5b552986ddd16")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});


// test upsert a workspace when no workspace exists with given id bad weather
describe("POST /workspace/:_id", ()=>{
    it("Should not be able to create a workspace", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd16haha",
            titttle: "sample title upsert first time",
            goal: "sample goal upsert first time",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request
            .post("/workspace/62905d8d67e5b552986ddd16haha")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// test upsert a workspace when a workspace exists with given id good weather
describe("POST /workspace/:_id", ()=>{
    it("Should update a workspace with given request body and the given id", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd16",
            title: "sample title upsert second time",
            goal: "sample goal upsert second time",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request
            .post("/workspace/62905d8d67e5b552986ddd16")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test upsert a workspace when a workspace exists with given id bad weather
describe("POST /workspace/:_id", ()=>{
    // eslint-disable-next-line max-len
    it("Should not be able to update a workspace with given request body and the given id because the request body changes the workspace id", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd16hahahahah",
            title: "sample title upsert second time wrong format",
            goal: "sample goal upsert second time wrong format",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request
            .post("/workspace/62905d8d67e5b552986ddd16")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

