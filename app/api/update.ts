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