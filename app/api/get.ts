import type {Class, Course, SchoolYear, Student} from "~/types/types";
import {request} from "~/api/api";

export async function getSchoolYears(): Promise<SchoolYear[]> {
    return request('/school-years');
}

export async function getCurrentSchoolYear(): Promise<SchoolYear> {
    return request('/current-school-year');
}

export async function getCoursesForYear(year: SchoolYear): Promise<Course[]> {
    return request(`/year/${year.start_year}/courses`);
}

export async function getStudentsForCourse(course: Course): Promise<Student[]> {
    return request(`/course/${course.id}/students`);
}

export async function getCourse(id: number): Promise<Course> {
    return request(`/course/${id}`);
}

export async function getClassesForYear(year: SchoolYear): Promise<Class[]> {
    return request(`/year/${year.start_year}/classes`);
}

export async function getStudentsForYear(year: SchoolYear): Promise<Student[]> {
    return request(`/year/${year.start_year}/students`);
}

export async function getStudentsForClass(c: Class): Promise<Student[]> {
    return request(`/class/${c.id}/students`);
}

export async function getClass(id: number): Promise<Class> {
    return request(`/class/${id}`);
}