import supertest from 'supertest';
import chai from 'chai';
import { describe, it } from 'mocha';

const expect = chai.expect;
const requester = supertest('http://localhost:3000')

describe('Test avanzado', () => {
    let cookie;
    let createUserId
    it('/api/sessions/register Debe registar correctamente a un usuario', async function () {
        const mockUser = {
            first_name: "Eric",
            last_name: "Bayona",
            email: "eric.bayona@coder.com",
            password: "qwe"
        }

        const res = await requester.post('/api/sessions/register').send(mockUser);
        createUserId = res.body.payload;
        expect(createUserId).to.be.ok;

    })
    it('/api/sessions/login Debe loguear correctamente al usuario y devolver una COOKIE', async function () {
        const mockUser = {
            email: 'eric.bayona@coder.com',
            password: 'qwe'
        }

        const result = await requester.post('/api/sessions/login').send(mockUser);
        const cookieResult = result.headers['set-cookie'][0];
        expect(cookieResult).to.be.ok;
        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1]
        }
        expect(cookie.name).to.be.ok.and.eql('coderCookie');
        expect(cookie.value).to.be.ok;
    })
    it('Debe enviar la cookie que contiene el usuario y destructurar este correctamente', async function () {
        const res = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(res.body.payload.email).to.be.eql('eric.bayona@coder.com');
    });

    // Pruebas que deben devolver error

    it('el endpoint post /api/sessions/register Debe responder con status 400 si no se envía el campo first_name', async () => {
        const incompleteUser = {
            last_name: "Bayona",
            email: "eric.bayona@coder.com",
            password: "qwe"
        }

        const res = await requester.post('/api/users').send(incompleteUser);

        expect(res.statusCode).to.equal(400);
    });

    it('el endpoint post /api/sessions/register Debe responder con "status": "error", "error" : "Incomplete values" si no se envía el campo first_name', async () => {
        const incompleteUser = {
            last_name: "Bayona",
            email: "eric.bayona@coder.com",
            password: "qwe"
        }

        const res = await requester.post('/api/users').send(incompleteUser);

        expect(res.body).to.have.property("status", "error");
        expect(res.body).to.have.property("error", "Incomplete values");
    });

    it('el endpoint post /api/sessions/login Debe devolver "status": "error", "error": "Incorrect password" cuando se ingrese un password incorrecto', async function () {
        const mockUser = {
            email: 'eric.bayona@coder.com',
            password: 'incorrect'
        };
        const result = await requester.post('/api/sessions/login').send(mockUser);

        expect(result.body).to.have.property("status", "error");
        expect(result.body).to.have.property("error", "Incorrect password");

    });

    after(async () => {
        try {
            if (createUserId) {
                await requester
                    .delete(`/api/users/${createUserId}`)
            }
        } catch (err) {
            console.error('❌ Error al eliminar el usuario en after:', err.message);
        }
    });
})