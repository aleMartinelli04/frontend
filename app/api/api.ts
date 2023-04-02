import type {Class, Course, SchoolYear, Student} from "~/types/types";

const BASE_URL = 'http://localhost';
const PORT = 3000;

const URL_PORT = BASE_URL + ':' + PORT;

function getURL(path: string): string {
    return URL_PORT + path;
}

export async function getSchoolYears(): Promise<SchoolYear[]> {
    const response = await fetch(getURL('/school-years'));
    return response.json();
}

export async function getCurrentSchoolYear(): Promise<SchoolYear> {
    const response = await fetch(getURL('/current-school-year'));

    if (response.status === 404) {
        throw new Error('Anno scolastico non trovato');
    }

    return response.json();
}

export async function getCoursesForYear(year: SchoolYear): Promise<Course[]> {
    const response = await fetch(getURL('/courses/year/' + year.start_year));

    if (response.status === 404) {
        throw new Error('Anno scolastico non trovato');
    }

    return response.json();
}

export async function getStudentsForCourse(course: Course): Promise<Student[]> {
    const response = await fetch(getURL('/course/' + course.id + '/students'));

    if (response.status === 404) {
        throw new Error('Anno scolastico non trovato');
    }

    return response.json();
}

export async function getCourse(id: number): Promise<Course> {
    const response = await fetch(getURL('/course/' + id));

    if (response.status === 404) {
        throw new Error('Corso non trovato');
    }

    return response.json();
}

export async function getStudent(id: number): Promise<Student> {
    const response = await fetch(getURL('/students/' + id));

    if (response.status === 404) {
        throw new Error('Studente non trovato');
    }

    return response.json();
}

export async function getSchoolYear(id: number): Promise<SchoolYear> {
    const response = await fetch(getURL('/school-year/' + id));

    if (response.status === 404) {
        throw new Error('Anno scolastico non trovato');
    }

    return response.json();
}

export async function getClassesForYear(year: SchoolYear): Promise<Class[]> {
    const response = await fetch(getURL('/classes/year/' + year.start_year));

    if (response.status === 404) {
        throw new Error('Anno scolastico non trovato');
    }

    return response.json();
}

export async function getStudentsForYear(year: SchoolYear): Promise<Student[]> {
    const response = await fetch(getURL('/school-year/' + year.start_year + '/students'));

    if (response.status === 404) {
        throw new Error('Anno scolastico non trovato');
    }

    return response.json();
}

export async function getStudentsForClass(c: Class): Promise<Student[]> {
    const response = await fetch(getURL('/students/class/' + c.id));

    if (response.status === 404) {
        throw new Error('Classe non trovata');
    }

    return response.json();
}

export async function getClass(id: number): Promise<Class> {
    const response = await fetch(getURL('/class/' + id));

    if (response.status === 404) {
        throw new Error('Classe non trovata');
    }

    return response.json();
}