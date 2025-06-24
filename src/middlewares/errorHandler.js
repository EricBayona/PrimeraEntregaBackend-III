import fs from 'fs';
import path from 'path';

const logDir = path.resolve('./src/logs');
const logFile = path.join(logDir, 'error.log');

export const errorHandler = (error, req, res, next) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${error.name}: ${error.message}\n${error.stack}\n\n`;

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    fs.appendFileSync(logFile, logEntry);

    res.setHeader('Content-Type', 'application/json');
    res.status(error.statusCode || 500).json({
        ok: false,
        mensaje: 'Error inesperado en el servidor',
    });
};