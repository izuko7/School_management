import dayjs from "dayjs";

// La date du jour (ex: "2026-06-09")
const aujourdHui = () => dayjs().format('YYYY-MM-DD');

// La date d'hier (ex: "2026-06-08")
const hier = () => dayjs().subtract(1, 'day').format('YYYY-MM-DD');

// Une date spécifique (ex: "2026-03-15")
const datePrecise = (date) => dayjs(date).format('YYYY-MM-DD');

export { aujourdHui, hier, datePrecise };