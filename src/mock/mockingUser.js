import { fakerES_MX as fa } from "@faker-js/faker"
import { createHash } from "../utils/index.js";


function createMockUser(count) {
    const users = [];
    for (let i = 0; i < count; i++) {
        const rolesList = ['user', 'admin'];
        const roles = fa.helpers.arrayElement(rolesList);
        let nombre = fa.person.firstName();
        let apellido = fa.person.lastName().split(' ')[0];
        const password = createHash("coder123")
        users.push({
            first_name: nombre,
            last_name: apellido,
            email: fa.internet.email({ firstName: nombre, lastName: apellido, provider: "coderhouse.com" }),
            password: password,
            role: roles,
            pets: []
        });
    }
    return users;
}
export default createMockUser;

// SOLUCION BRINDAD POR LA I.A
// DE ESTA FORMA PUEDO TENER EL createHash async (yo lo cambie a Sync xq no conocia esta solucion)
// async function createMockUser(count) {
//     const users = await Promise.all(
//         Array.from({ length: count }).map(async () => {
//             const rolesList = ['user', 'admin'];
//             const roles = fa.helpers.arrayElement(rolesList);
//             let nombre = fa.person.firstName();
//             let apellido = fa.person.lastName().split(' ')[0];
//             const password = await createHash("coder123");

//             return {
//                 first_name: nombre,
//                 last_name: apellido,
//                 email: fa.internet.email({ firstName: nombre, lastName: apellido, provider: "coderhouse.com" }),
//                 password: password,
//                 role: roles,
//                 pets: [],
//             };
//         })
//     );
//     return users;
// }