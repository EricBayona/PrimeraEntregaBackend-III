
import supertest from "supertest";
import { describe, it } from "mocha";
import chai from "chai";

const expect = chai.expect;
const requester = supertest('http://localhost:3000');

describe('Testing Adoptme', () => {
    describe('Test de mascotas', () => {
        let petMock;
        let createPet;
        before(async () => {
            petMock = {
                name: "Duki",
                specie: "Perro",
                birthDate: "01-01-2020",
            };

            const res = await requester.post('/api/pets').send(petMock);

            createPet = res.body.payload;
        });
        it('El endpoint Post /api/pets debe crear una mascota correctamente', async () => {
            expect(createPet).to.have.property('_id');
        });

        it('La mascota creada debe tener una propiedad adopted:false', () => {
            expect(createPet).to.have.property('adopted', false)
        });


        it('Al obtener todas las mascostas, la respuesta debe tener el campo status', async () => {
            const res = await requester.get('/api/pets');

            expect(res.body).to.have.property("status");
        })

        it("Al obtener todas las macostas, la respuesta debe tener el campo payload y debe ser un arreglo", async () => {
            const res = await requester.get('/api/pets');

            expect(res.body).to.have.property('payload');
            expect(res.body.payload).to.be.an('array');

        })

        it('El metodo put debe poder actualizar el nombre de la  mascota', async () => {

            expect(createPet.name).to.equal("Duki");

            const newName = { name: "Puki" }

            const res = await requester.put(`/api/pets/${createPet._id}`).send(newName);

            expect(res.status).to.equal(200);

            const updated = await requester.get(`/api/pets/${createPet._id}`);

            expect(updated.body).to.have.property("payload")

            expect(updated.body.payload).to.have.property("name", "Puki");


        })

        it('El metodo delete puede borrar una mascota', async () => {

            const deletePet = await requester.delete(`/api/pets/${createPet._id}`);

            expect(deletePet.status).to.equal(200);

            const res = await requester.get(`/api/pets/${createPet._id}`);

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("status", "error");
            expect(res.body.message).to.equal("Mascota no encontrada");


        })

        // Pruebas que deben dar Error

        it(' El endpoint Post /api/pets Debe responder con status 400 si no se envía el campo nombre', async () => {
            const invalidPet = {
                specie: "Gato",
                birthDate: "01-01-2021"
            };

            const res = await requester.post('/api/pets').send(invalidPet);

            expect(res.statusCode).to.equal(400);
        });

        it('El endpoint Post /api/pets debe devolver "status" : "error", "error": "Incomplete values" cuando falte enviar name', async () => {
            const invalidPet = {
                specie: "Perro",
                birthDate: "01-01-2020",
            };
            const res = await requester.post('/api/pets').send(invalidPet)
            expect(res.body).to.have.property("status", "error");
            expect(res.body).to.have.property("error", "Incomplete values");
        });


        after(async () => {
            if (createPet && createPet._id)
                await requester.delete(`/api/pets/${createPet._id}`)
        })
    })
})