import supertest from "supertest";
import { describe, it } from "mocha";
import chai from 'chai';


const expect = chai.expect;
const requester = supertest('http://localhost:3000');


describe('Test de Usuarios', () => {
    let userMock;
    let createUser;
    before(async () => {
        userMock = {
            first_name: "Eric",
            last_name: "Bayona",
            email: "eric.bayona@coderhouse.com",
            password: "123"
        };

        const res = await requester.post('/api/users').send(userMock);
        createUser = res.body.payload;
    });
    it('El endpoint Post /api/users debe crear un usuario', async () => {
        expect(createUser).to.have.property('_id');
    });
    it('El endpoint Post /api/users debe crear un usuario y debe tener un campo role', async () => {
        expect(createUser).to.have.property('role')
    })

    it('El endpoint Post /api/users debe crear un usuario y tener un campo pets y debe ser un arreglo ', async () => {
        expect(createUser).to.have.property('pets');
        expect(createUser.pets).to.be.an('array');
    })

    it('Al obtener todos los usuarios la respuesta de tener el campo payload y debe ser un arreglo', async () => {
        const res = await requester.get('/api/users');
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property('payload');
        expect(res.body.payload).to.be.an('array');
        res.body.payload.forEach(user => {
            expect(user).to.have.property('_id');
            expect(user).to.have.property('email');
        });
    });

    it('La ruta api/users/:uid debe encontrar el usuario', async () => {
        const res = await requester.get(`/api/users/${createUser._id}`);

        expect(res.body.payload).to.have.property('first_name', "Eric")
    });

    it('El metodo put debe poder actualizar el nombre del Usuario', async () => {

        expect(createUser.first_name).to.equal("Eric");

        const newName = { first_name: "Fernando" }

        const res = await requester.put(`/api/users/${createUser._id}`).send(newName);

        expect(res.status).to.equal(200);

        const updated = await requester.get(`/api/users/${createUser._id}`);

        expect(updated.body).to.have.property("payload")

        expect(updated.body.payload).to.have.property("first_name", "Fernando");
    });

    it('El metodo delete debe borrar un usuario cuando se le pasa el id', async () => {
        const deleteUser = await requester.delete(`/api/users/${createUser._id}`);
        expect(deleteUser.status).to.equal(200);

        const res = await requester.get(`/api/users/${createUser._id}`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("status", "error");
        expect(res.body.message).to.equal("Usuario no encontrado")
    })

    //Pruebas que deben fallar

    it('el metodo get api/users/:uid debe devolver "status": "error","message" "Usuario no encontrado" cuando se envie un uid inexistente ', async () => {

        const uidInexistente = "683c98b6dd86a18a3cf4163d"
        const res = await requester.get(`/api/users/${uidInexistente}`);

        expect(res.body).to.have.property('status', "error");
        expect(res.body).to.have.property("message", "Usuario no encontrado");
    });

    it('El metodo put no debe poder actualizar el email del Usuario si coincide con el email de otro usuario ', async () => {

        const userToUpdateId = '683c98b6dd86a18a3cf41633';
        const newEmail = { email: "Federico_Saldana@coderhouse.com" };

        const updated = await requester
            .put(`/api/users/${userToUpdateId}`)
            .send(newEmail);

        expect(updated.status).to.not.equal(200);
        expect(updated.status).to.equal(400);
        expect(updated.body).to.have.property('error');
        expect(updated.body.error).to.include('El email ya está registrado por otro usuario');

    });

})