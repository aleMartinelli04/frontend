import type {Student} from "~/types/types";

export function StudentRow({student}: { student: Student }) {
    return (
        <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.surname}</td>
            <td>{student.class?.name ?? "ID:" + student.class_id}</td>
        </tr>
    )
}