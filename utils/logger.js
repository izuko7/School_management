import fs from "fs";
import path from "path";
import dayjs from "dayjs";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "app.log");

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

const formatDate = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

const log = (type, message) => {
    const ligne = `[${formatDate()}] [${type}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, ligne);
};

const logInfo = (message) => log("INFO", message);
const logSucces = (message) => log("SUCCES", message);
const logError = (message) => log("ERROR", message);
const logAuth = (message) => log("AUTH", message);

export { log, logInfo, logSucces, logError, logAuth };