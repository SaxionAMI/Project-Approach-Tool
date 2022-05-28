const request = require("supertest")("http://localhost:13788");
const auth=require("./auth");

before(async ()=>{
    global.token=await auth.generateToken("student");
});


// get a deck by id good weather
describe("GET /deck/:deckId", ()=>{
    it("Should get a deck by given id", (done)=>{
        request
            .get("/deck/5e30276e8b5f721a0cc1f415")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// get a deck by id bad weather
describe("GET /deck/:deckId", ()=>{
    it("Should not return anything because the deck cannot be found with given id", (done)=>{
        request
            .get("/deck/wrongid")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// get a deck by id when unauthorized
describe("GET /deck/:deckId", ()=>{
    it("Should not get a deck because unauthorized", (done)=>{
        request
            .get("/deck/5e30276e8b5f721a0cc1f415")
            .expect(403, done);
    });
});



// get all decks good weather
describe("GET /deck/", ()=>{
    it("Should get all decks", (done)=>{
        request
            .get("/deck")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// get all decks when unauthorized
describe("GET /deck/", ()=>{
    it("Should get no deck because unauthorized", (done)=>{
        request
            .get("/deck")
            .expect(403, done);
    });
});



// create a deck good weather
describe("POST /deck/", ()=>{
    it("Should create a deck", (done)=>{
        const body = {
            title: "sample title",
            shortDescription: "sample short description",
            types: ["sample type 1", "sample type 2"]
        };

        request
            .post("/deck")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

// create a deck bad weather
describe("POST /deck/", ()=>{
    it("Should not be able to create a deck because the requst body is the wrong format", (done)=>{
        const body = {
            ttle: "sample title",
            shortDescription: "sample short description",
            types: ["sample type 1", "sample type 2"]
        };

        request
            .post("/deck")
            .set("Authorization", global.token)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// create a deck when unauthorized
describe("POST /deck/", ()=>{
    it("Should not create a deck because unauthorized", (done)=>{
        const body = {
            title: "sample title",
            shortDescription: "sample short description",
            types: ["sample type 1", "sample type 2"]
        };

        request
            .post("/deck")
            .send(body)
            .expect(403, done);
    });
});




// delete a deck good weather
describe("DELETE /deck/:deckId", ()=>{
    it("Should delete a deck by given id", (done)=>{
        request
            .delete("/deck/5e30276e8b5f721a0cc1f415")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});


// delete a deck bad weather
describe("DELETE /deck/:deckId", ()=>{
    it("Should not be able to delete a deck by given id because no deck exist with the given id", (done)=>{
        request
            .delete("/deck/wrongid")
            .set("Authorization", global.token)
            .expect("Content-Type", /json/)
            .expect(500, done);
    });
});

// delete a deck when unauthorized
describe("DELETE /deck/:deckId", ()=>{
    it("Should not delete a deck because unauthorized", (done)=>{
        request
            .delete("/deck/5e30276e8b5f721a0cc1f415")
            .expect(403, done);
    });
});
