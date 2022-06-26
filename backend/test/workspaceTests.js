const request = require('supertest');
const app = require('../server.js');
const auth = require("./auth");

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
        request(app)
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
        request(app)
            .post("/workspace")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// test create a workspace when unauthorized
describe("POST /workspace", ()=>{
    it("Should not create a workspace because unauthorized", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd2b",
            title: "sample title",
            goal: "sample goal",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request(app)
            .post("/workspace")
            .send(body)
            .expect(403, done);
    });
});


// test get workspace by id good weather
describe("GET /workspace/:_id", ()=>{
    it("Should get a workspace by given id", (done)=>{
        request(app)
            .get("/workspace/62905d8d67e5b552986ddd2b")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test get workspace by id bad weather
describe("GET /workspace/:_id", ()=>{
    it("Should not be able to get a workspace by given id because no workspace with given id exists", (done)=>{
        request(app)
            .get("/workspace/62905d8d67e5b552986ddd2bhaha")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// test get workspace by id when unauthorized
describe("GET /workspace/:_id", ()=>{
    it("Should not get a workspace by given id because unauthorized", (done)=>{
        request(app)
            .get("/workspace/62905d8d67e5b552986ddd2b")
            .expect(403, done);
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
        request(app)
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
        request(app)
            .post("/workspace/62905d8d67e5b552986ddd16haha")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});


// test upsert a workspace when no workspace exists with given id when unauthorized
describe("POST /workspace/:_id", ()=>{
    it("Should not create a workspace with given request body and the given id", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd16lala",
            title: "sample title upsert first time",
            goal: "sample goal upsert first time",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request(app)
            .post("/workspace/62905d8d67e5b552986ddd16")
            .send(body)
            .expect(403, done);
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
        request(app)
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
        request(app)
            .post("/workspace/62905d8d67e5b552986ddd16")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});


// test upsert a workspace when a workspace exists with given id when unauthorized
describe("POST /workspace/:_id", ()=>{
    it("Should not update a workspace with given request body and the given id", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd16",
            title: "sample title upsert second time",
            goal: "sample goal upsert second time",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request(app)
            .post("/workspace/62905d8d67e5b552986ddd16")
            .send(body)
            .expect(403, done);
    });
});


// test update workspace  with given id good weather
describe("PUT /workspace/:_id", ()=>{
    it("Should update a workspace with given request body and by the given id", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd2b",
            title: "sample title updated with put request",
            goal: "sample goal updated with put request",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request(app)
            .put("/workspace/62905d8d67e5b552986ddd2b")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test update workspace with given id bad weather
describe("PUT /workspace/:_id", ()=>{
    it("Should not be able to update a workspace because no workspace exists with the id given ", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd2b",
            title: "sample title updated with put request",
            goal: "sample goal updated with put request",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request(app)
            .put("/workspace/62905d8d67e5b552986ddd2bhahhiuhoi")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// test update workspace  with given id when unauthorized
describe("PUT /workspace/:_id", ()=>{
    it("Should not update a workspace with given request body and by the given id", (done)=>{
        const body = {
            _id: "62905d8d67e5b552986ddd2b",
            title: "sample title updated with put request",
            goal: "sample goal updated with put request",
            image: "../../../../../assets/image/whiteSmoke.PNG"
        };
        request(app)
            .put("/workspace/62905d8d67e5b552986ddd2b")
            .send(body)
            .expect(403, done);
    });
});


// test get all workspaces that belong to one user good weather
describe("POST /workspaces", ()=>{
    it("Should return workspaces that belong to the user of the id given in the request body", (done)=>{
        const body = {
            uid: "studentid"
        };
        request(app)
            .post("/workspaces")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test get all workspaces that belong to one user bad weather
describe("POST /workspaces", ()=>{
    it("Should not return workspaces", (done)=>{
        const body = {
            uid: "studentidlalala"
        };
        request(app)
            .post("/workspaces")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// test get all workspaces that belong to one user when unauthorized
describe("POST /workspaces", ()=>{
    it("Should not return workspaces that belong to the user of the id given in the request body", (done)=>{
        const body = {
            uid: "studentid"
        };
        request(app)
            .post("/workspaces")
            .send(body)
            .expect(403, done);
    });
});



// test get custom cards that belong to one workspace by workspace id good weather
describe("GET /workspace/customCard/:_id", ()=>{
    it("Should get custom cards that belong to a workspace by given workspace id", (done)=>{
        request(app)
            .get("/workspace/customCard/62905d8d67e5b552986ddd2b")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test get custom cards that belong to one workspace by workspace id bad weather
describe("GET /workspace/customCard/:_id", ()=>{
    it("Should not get custom cards", (done)=>{
        request(app)
            .get("/workspace/customCard/62905d8d67e5b552986dddhhhh2blalalal")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// test get custom cards that belong to one workspace by workspace id when unauthorized
describe("GET /workspace/customCard/:_id", ()=>{
    it("Should not get custom cards that belong to a workspace by given workspace id", (done)=>{
        request(app)
            .get("/workspace/customCard/62905d8d67e5b552986ddd2b")
            .expect(403, done);
    });
});


// test delete a workspace good weather
describe("DELETE /workspace/:_id", ()=>{
    it("Should delete a workspace by given workspace id", (done)=>{
        request(app)
            .delete("/workspace/62905d8d67e5b552986ddd2b")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test delete a workspace bad weather
describe("DELETE /workspace/:_id", ()=>{
    it("Should not delete a workspace by given workspace id because no workspace exists with given id", (done)=>{
        request(app)
            .delete("/workspace/62905d8d67e5b552986ddd2blallala")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});


// test delete a workspace when unauthorized
describe("DELETE /workspace/:_id", ()=>{
    it("Should not delete a workspace by given workspace id", (done)=>{
        request(app)
            .delete("/workspace/62905d8d67e5b552986ddd2b")
            .expect(403, done);
    });
});


