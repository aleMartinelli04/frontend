const codes_values: { [key: string]: string } = {
    ERR_CLASS_HAS_STUDENTS: "La classe ha degli studenti associati",
    ERR_CLASS_NOT_FOUND: "Impossibile trovare la classe specificata",
    ERR_COURSE_HAS_STUDENTS: "Il corso ha degli studenti associati",
    ERR_COURSE_NOT_FOUND: "Impossibile trovare il corso specificato",
    ERR_STUDENT_HAS_COURSES: "Lo studente ha dei corsi associati",
    ERR_STUDENT_NOT_FOUND: "Impossibile trovare lo studente specificato",
    ERR_YEAR_NOT_FOUND: "Impossibile trovare l'anno specificato",
    ERR_UNKNOWN: "Errore sconosciuto"
}

export function errCodes(code: string): string {
    return codes_values[code];
}