import dotenv from 'dotenv';
dotenv.config();
import chai from "chai"
import supertest from "supertest";
import { describe, it } from "mocha";
import mongoose from "mongoose";


const expect = chai.expect;

const requester = supertest('http://localhost:3000');

describe('Test de Adoptions', () => {
    let userMock;
    let petMock;
    let createUser;
    let createPet;
    let adoptionId
    before(async () => {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        userMock = {
            first_name: "Fernando",
            last_name: "Bayona",
            email: "fernando.bayona@coder.com",
            password: "123"
        };
        petMock = {
            name: "Bichota",
            specie: "Conejo",
            birthDate: "01-01-2020",
        };
        const userRes = await requester.post('/api/users').send(userMock);
        createUser = userRes.body.payload;
        const petRes = await requester.post('/api/pets').send(petMock);
        createPet = petRes.body.payload;
    })

    it('El metodo get en el endpoint /api/adoptions debe traer el arreglo con las adopciones', async () => {
        const res = await requester.get("/api/adoptions");

        expect(res.status).to.equal(200)
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('payload');
        expect(res.body.payload).to.be.an('array');

        if (res.body.payload.length > 0) {
            res.body.payload.forEach(adoption => {
                expect(adoption).to.have.property('_id');
                expect(adoption).to.have.property('owner');
                expect(adoption).to.have.property('pet');
            });
        } else {
            console.log("No hay adopciones registradas");
        };
    });

    it('La ruta /api/adoptions/:uid/:pid debe generar una adopcion', async () => {
        const resAdoption = await requester.post(`/api/adoptions/${createUser._id}/${createPet._id}`);


        expect(resAdoption.status).to.equal(200);
        expect(resAdoption.body).to.have.property("status", "success")
        expect(resAdoption.body).to.have.property("message", "Pet adopted")
        adoptionId = (resAdoption.body.payload._id);
        expect(adoptionId).to.exist;

    })

    it('El endpoint /api/adoptions/:aid debe llamar al registro de la adopcion', async () => {
        const res = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(res.status).to.equal(200);
        expect(res.body.payload).to.have.property("_id");
        expect(res.body.payload).to.have.property("owner");
        expect(res.body.payload).to.have.property("pet");
    })

    // Pruebas que deben dar errores


    it('El endpoint /api/adoptions/:aid debe devolver statusCode: 404 cuando se ingrese un _Id inexistente ', async () => {
        const idInexistente = "c853193b28a2a6201909ba4b";
        const res = await requester.get(`/api/adoptions/${idInexistente}`);

        expect(res).to.have.property("statusCode", 404);

    });

    it('El endpoint /api/adoptions/:aid debe devolver "status": "error" cuando se ingrese un _Id inexistente ', async () => {
        const idInexistente = "c853193b28a2a6201909ba4b";
        const res = await requester.get(`/api/adoptions/${idInexistente}`);

        expect(res.body.status).to.equal("error");
    });

    it('El endpoint /api/adoptions/:aid debe devolver "error": "Adoption not found" cuando se ingrese un _Id inexistente ', async () => {
        const idInexistente = "c853193b28a2a6201909ba4b";
        const res = await requester.get(`/api/adoptions/${idInexistente}`);

        expect(res.body).to.have.property("error", "Adoption not found");
    })

    it('La ruta /api/adoptions/:uid/:pid debe devolver "status" : "error", "error" : "user Not found" cuando se ingresa un usuario inexistente', async () => {
        const idInexistente = "c853193b28a2a6201909ba4b";
        const resAdoption = await requester.post(`/api/adoptions/${idInexistente}/${createPet._id}`);

        expect(resAdoption.body).to.have.property("status", "error");
        expect(resAdoption.body).to.have.property("error", "user Not found");

    });

    it('La ruta /api/adoptions/:uid/:pid debe devolver "status" : "error", "error" : "Pet Not found" cuando se ingresa una pets inexistente', async () => {
        const idInexistente = "983c9925dd86a88a3cf41641";
        const resAdoption = await requester.post(`/api/adoptions/${createUser._id}/${idInexistente}`);

        expect(resAdoption.body).to.have.property("status", "error");
        expect(resAdoption.body).to.have.property("error", "Pet not found");

    });


    after(async function () {
        this.timeout(5000)
        if (createUser && createPet && createUser._id && createPet._id) {
            await requester.delete(`/api/users/${createUser._id}`);
            await requester.delete(`/api/pets/${createPet._id}`);

            if (adoptionId) {
                await mongoose.connection.collection("adoptions").deleteOne({
                    _id: new mongoose.Types.ObjectId(adoptionId)
                });
            };
        };
        await mongoose.disconnect();
    });

});

