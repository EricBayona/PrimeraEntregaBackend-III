// import Users from "../../src/dao/Users.dao.js";
// import dotenv from "dotenv";
// dotenv.config();
// import mongoose from "mongoose";
// import { describe, it, before, after } from "mocha";

// import Assert from "assert";
// import { logger } from "../../src/utils/logger.js";

// const assert = Assert.strict;

// const usersDao = new Users()

// describe("Test de conexión a la base de datos y modelo Users", function () {
//     before(async function () {
//         try {
//             await mongoose.connect(process.env.MONGO_URI);
//             logger.info("Conexión exitosa a la base de datos");
//         } catch (error) {
//             logger.error("Error al conectar la base de datos", error);
//             throw error;
//         }
//     });

//     it("Debe obtener usuarios de la base de datos", async function () {
//         let resultado = await usersDao.get();
//         assert.ok(resultado.length > 0, "Se esperaban usuarios en la base de datos");
//     });

//     after(async function () {
//         await mongoose.disconnect();
//         logger.info("Conexión cerrada después de las pruebas");
//     });
// });


