import petModel from "../dao/models/Pet.js";
import userModel from "../dao/models/User.js";
import createMockPet from "../mock/mockingPets.js";
import createMockUser from "../mock/mockingUser.js";


const generateMockData = async (users, pets) => {
    if (!users && !pets) {
        throw new Error("Debe enviar al menos users o pets en formato numérico");
    }

    if (users !== undefined && isNaN(Number(users))) {
        throw new Error("El parámetro 'users' debe ser un número válido.");
    }

    if (pets !== undefined && isNaN(Number(pets))) {
        throw new Error("El parámetro 'pets' debe ser un número válido.");
    }

    const mockUser = createMockUser(users);
    const mockPets = createMockPet(pets);

    await userModel.insertMany(mockUser);
    await petModel.insertMany(mockPets);

    return { usersCreated: mockUser, petsCreated: mockPets };
};

export default generateMockData;