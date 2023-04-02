export type SchoolYear = {
    start_year: number;

    classes?: Class[];
    courses?: Course[];
}

export type Class = {
    id: number;
    name: string;
    school_year_id: number;

    school_year?: SchoolYear;

    students?: Student[];
}

export type Student = {
    id: number;
    name: string;
    surname: string;
    class_id: number;

    class?: Class;

    inscriptions?: Inscription[];
}

export type Course = {
    id: number;
    name: string;
    school_year_id: number;

    school_year?: SchoolYear;

    inscriptions?: Inscription[];
}

export type Inscription = {
    student_id: number;
    course_id: number;

    student?: Student;
    course?: Course;
}