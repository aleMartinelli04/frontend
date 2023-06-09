import {request} from "~/api/api";

export async function updateStudent(id: number, surname?: string, name?: string, classId?: number) {
    return request(`/student/${id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            surname: surname,
            name: name,
            class: classId
        })
    })
}

export async function updateClass(id: number, name?: string, yearId?: number) {
    return request(`/class/${id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            year: yearId
        })
    })
}


export function updateCourse(id: number, name?: string, yearId?: number) {
    return request(`/course/${id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            year: yearId
        })
    })
}