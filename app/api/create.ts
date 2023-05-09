import {request} from "~/api/api";
import type {Course} from "~/types/types";

export async function createCourse(name: string, year?: number): Promise<Course> {
    return request('/course/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            year: year
        })
    });
}

export async function createClass(name: string, year?: number) {
    return request('/class/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            year: year
        })
    });
}

export async function createStudent(surname: string, name: string, classId: number) {
    return request('/student/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            surname: surname,
            name: name,
            class: classId
        })
    });
}

export async function createCurrentYear() {
    return request('/year/create-current', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}