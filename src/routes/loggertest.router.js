import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    req.logger.debug("Este es un mensaje de depuración.");
    req.logger.http("Solicitud HTTP recibida.");
    req.logger.info("Información relevante.");
    req.logger.warning("Advertencia detectada.");
    req.logger.error("Ha ocurrido un error.");
    req.logger.fatal("Error crítico. Deteniendo sistema.");

    res.send("Logs generados correctamente.");
})

export default router;