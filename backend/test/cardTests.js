const request = require("supertest")("http://localhost:13788");
const auth=require("./auth");

before(async ()=>{
    global.token=await auth.generateToken("student");
});

// test get all stepping stone cards good weather
describe("GET /card/steppingstone", ()=>{
    it("Should get stepping stone cards", (done)=>{
        request
            .get("/card/steppingstone")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test get all stepping stone cards when unauthorized
describe("GET /card/steppingstone", ()=>{
    it("Should not get stepping stone cards", (done)=>{
        request
            .get("/card/steppingstone")
            .expect(403, done);
    });
});


// test get method cards good weather
describe("GET /card/methods", ()=>{
    it("Should get method cards", (done)=>{
        request
            .get("/card/methods")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});


// test get method cards when unauthorized
describe("GET /card/methods", ()=>{
    it("Should not get method cards", (done)=>{
        request
            .get("/card/methods")
            .expect(403, done);
    });
});


// test get a card by id good weather
describe("GET /card/:cardId", ()=>{
    it("Should get a method card by given id", (done)=>{
        request
            .get("/card/5e30215695d55b4b3c79a897")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// test get a card by id bad weather
describe("GET /card/:cardId", ()=>{
    it("Should not get a method card by given id because no card exists with given id", (done)=>{
        request
            .get("/card/5e30215695d55b4b3c79a897hahahah")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// test get a card by id when unauthorized
describe("GET /card/:cardId", ()=>{
    it("Should not get a method card by given id", (done)=>{
        request
            .get("/card/5e30215695d55b4b3c79a897")
            .expect(403, done);
    });
});


// test get cards of a deck by given deck id good weather
describe("GET /card/deck/:deck", ()=>{
    it("Should get cards of a deck by given deck id", (done)=>{
        request
            .get("/card/deck/5e30276e8b5f721a0cc1f416")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});


// test get cards of a deck by given deck id bad weather
describe("GET /card/deck/:deck", ()=>{
    it("Should not get cards of a deck by given deck id because no deck exists with given id", (done)=>{
        request
            .get("/card/deck/5e30276e8b5f721a0cc1f416haha")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});


// test get cards of a deck by given deck id when unauthorized
describe("GET /card/deck/:deck", ()=>{
    it("Should not get cards of a deck by given deck id", (done)=>{
        request
            .get("/card/deck/5e30276e8b5f721a0cc1f416")
            .expect(403, done);
    });
});


// create a card good weather
describe("POST /card", ()=>{
    it("Should create a card", (done)=>{
        const body = {
            _id: "sampleid",
            color: "#817DAF",
            deck: "ICT",
            picture: "../assets/research methods illustraties/png/AB-Testing.png",
            shortDescription: "sample description",
            title: "sample title",
            type: "Lab"
        };
        request
            .post("/card")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});


// create a card bad weather
describe("POST /card", ()=>{
    it("Should not create a card because the request body is wrong format", (done)=>{
        const body = {
            _id: "sampleid2",
            colosdfssr: "#817DAF",
            decsdfsk: "ICT",
            pisfcsdfsture: "../assets/research methods illustraties/png/AB-Testing.png",
            shorsfdtDescription: "sample description",
            title: "sample title",
            type: "Lab"
        };
        request
            .post("/card")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// create a card when unauthorized
describe("POST /card", ()=>{
    it("Should not create a card", (done)=>{
        const body = {
            _id: "sampleid3",
            color: "#817DAF",
            deck: "ICT",
            picture: "../assets/research methods illustraties/png/AB-Testing.png",
            shortDescription: "sample description",
            title: "sample title",
            type: "Lab"
        };
        request
            .post("/card")
            .send(body)
            .expect(403, done);
    });
});


// update a card good weather
describe("PUT /card/:cardId", ()=>{
    it("Should update a card", (done)=>{
        const body = {
            color: "#817DAF",
            deck: "ICT",
            picture: "../assets/research methods illustraties/png/AB-Testing.png",
            shortDescription: "sample description updated by put request",
            title: "sample title updated by put reqquest",
            type: "Lab"
        };
        request
            .post("/card/sampleid")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// update a card bad weather
describe("PUT /card/:cardId", ()=>{
    it("Should not update a card", (done)=>{
        const body = {
            color: "#817DAF",
            deck: "ICT",
            picture: "../assets/research methods illustraties/png/AB-Testing.png",
            shortDescription: "sample description updated by put request",
            title: "sample title updated by put reqquest",
            type: "Lab"
        };
        request
            .post("/card/sampleidthatdoesntexist")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// update a card when unauthorized
describe("PUT /card/:cardId", ()=>{
    it("Should not update a card", (done)=>{
        const body = {
            color: "#817DAF",
            deck: "ICT",
            picture: "../assets/research methods illustraties/png/AB-Testing.png",
            shortDescription: "sample description updated by put request",
            title: "sample title updated by put reqquest",
            type: "Lab"
        };
        request
            .post("/card/sampleid")
            .send(body)
            .expect(403, done);
    });
});


// delete a card good weather
describe("DELETE /card/:cardId", ()=>{
    it("Should delete a deck by given id", (done)=>{
        request
            .delete("/card/sampleid")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});


// delete a card bad weather
describe("DELETE /card/:cardId", ()=>{
    it("Should not delete a deck by given id", (done)=>{
        request
            .delete("/card/sampleidthatdoesntexist")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// delete a card when unauthorized
describe("DELETE /card/:cardId", ()=>{
    it("Should not delete a deck by given id", (done)=>{
        request
            .delete("/card/sampleid")
            .expect(403, done);
    });
});
