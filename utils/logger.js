import fs from "fs";
import path from "path";
import dayjs from "dayjs";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "app.log");

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

const formatDate = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

const COLORS = {
    INFO:   "\x1b[36m",  // cyan
    SUCCES: "\x1b[32m",  // vert
    WARN:   "\x1b[33m",  // jaune
    ERROR:  "\x1b[31m",  // rouge
    AUTH:   "\x1b[35m",  // magenta
    RESET:  "\x1b[0m"
};

const log = (type, message) => {
    const ligne = `[${formatDate()}] [${type}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, ligne);

    if (process.env.NODE_ENV !== "production") {
        const couleur = COLORS[type] ?? COLORS.RESET;
        console.log(`${couleur}${ligne.trim()}${COLORS.RESET}`);
    }
};

const logInfo   = (message) => log("INFO", message);
const logSucces = (message) => log("SUCCES", message);
const logWarn   = (message) => log("WARN", message);
const logError  = (message) => log("ERROR", message);
const logAuth   = (message) => log("AUTH", message);

export { log, logInfo, logSucces, logWarn, logError, logAuth };