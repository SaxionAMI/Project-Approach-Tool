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
    it("Should create a deck", (done)=>{
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

