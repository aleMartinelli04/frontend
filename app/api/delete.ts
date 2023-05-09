import type {Class, Course, SchoolYear, Student} from "~/types/types";
import {request} from "~/api/api";

export async function deleteCourse(course: Course) {
    return request(`/course/${course.id}/delete`, {
        method: 'DELETE'
    });
}

export async function deleteClass(c: Class) {
    return request(`/class/${c.id}/delete`, {
        method: 'DELETE'
    });
}

export async function deleteStudent(student: Student) {
    return request(`/student/${student.id}/delete`, {
        method: 'DELETE'
    });
}

export async function deleteYear(year: SchoolYear) {
    return request(`/year/${year.start_year}/delete`, {
        method: 'DELETE'
    });
}