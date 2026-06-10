import { ROLE } from "./role.js";

const permissions = {
    [ROLE.ADMIN]: [
        "users",
        "students",
        "teachers",
        "subjects",
        "grades",
        "absences",
        "stats"
    ],

    [ROLES.TEACHER]: [
        "students",
        "subjects",
        "grades",
        "absences"
    ],

    [ROLES.STUDENT]: [
        "grades",
        "absences"
    ]
};

function avoirAcces(user, ressource) {
    return permissions[user.role]?.includes(ressource);
};

export { avoirAcces }