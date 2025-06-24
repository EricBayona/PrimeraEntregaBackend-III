import userModel from "../dao/models/User.js";
import { usersService } from "../services/index.js"

const getAllUsers = async (req, res) => {
    const users = await usersService.getAll();
    res.send({ status: "success", payload: users })
}

const getUser = async (req, res) => {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).send({ status: "error", message: "Usuario no encontrado" })
    res.send({ status: "success", payload: user })
}

const createUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const existingUser = await usersService.getUserByEmail(email);
    if (existingUser) {
        return res.status(409).send({ status: "error", message: "El usuario ya existe" });
    }

    const userCreate = await usersService.create({ first_name, last_name, email, password });

    return res.status(201).send({ status: "success", payload: userCreate, message: "Registro completado" });
}

const updateUser = async (req, res) => {
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" })
    const result = await usersService.update(userId, updateBody);
    res.send({ status: "success", message: "User updated" })
}

const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const result = await usersService.delete(userId);
    res.send({ status: "success", message: "User deleted" })
}

const uploadDocuments = async (req, res) => {
    try {
        const { uid } = req.params;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ menssage: "No files were uploaded." });
        }

        const documents = files.map(file => ({
            name: file.originalname,
            reference: file.path
        }));

        const user = await userModel.findByIdAndUpdate(
            uid,
            { $push: { documents: { $each: documents } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Archivos subidos y usuario actualizado correctamente.',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error while uploading documents' })

    };
};

export default {
    deleteUser,
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    uploadDocuments
}