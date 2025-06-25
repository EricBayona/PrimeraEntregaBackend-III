import UserDTO from "../../src/dto/User.dto.js";

import { expect } from "chai";
import { before, describe, it } from "mocha";

describe("Test de funcionalidad UserDTO", () => {

    let usuario;
    let dto;
    before(() => {
        usuario = {
            first_name: "Eric",
            last_name: "Bayona",
            role: "Admin",
            email: "eric.bayona@gmail.com"
        };
        dto = UserDTO.getUserTokenFrom(usuario);
    });

    it("Debe unificar first_name y last_name en name", () => {
        expect(dto).to.have.property("name", "Eric Bayona");

    });

    it("No debe tener la propiedad first_name", () => {
        expect(dto).to.not.have.property("first_name");
    });

    it("No debe tener la propiedad last_name", () => {
        expect(dto).to.not.have.property("last_name");
    });

    it("Debe tener email y role", () => {
        expect(dto).to.have.property("email");
        expect(dto).to.have.property("role");
    });
})


