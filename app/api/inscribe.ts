import {request} from "~/api/api";

export async function inscribeStudents(courseId: number, studentIds: number[]) {
    return await request('/course/' + courseId + '/inscriptions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            students: studentIds
        })
    });
}