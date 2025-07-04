
import createMockPet from "../mock/mockingPets.js";
import createMockUser from "../mock/mockingUser.js";
import generateMockData from "../services/mocks.services.js";
import { logger } from "../utils/logger.js";

const mockPet = async (req, res) => {
    const pets = createMockPet(100);
    res.json(pets);
}

const mockUser = async (req, res) => {
    const user = createMockUser(50);
    res.json(user);
}

const generateData = async (req, res) => {
    try {
        const { users, pets } = req.params;
        const result = await generateMockData(users, pets);

        return res.json({ message: "Datos generados correctamente", ...result })

    } catch (error) {
        logger.error(`Error al generar datos: ${error.name} - ${error.message}`);
        return res.status(400).json({ error: error.message });

    }
};

export default {
    mockPet,
    mockUser,
    generateData
}