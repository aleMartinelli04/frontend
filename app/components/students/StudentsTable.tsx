import type {Student} from "~/types/types";
import {Table, Text} from "@mantine/core";
import {StudentRow} from "~/components/students/StudentsRow";

export function StudentsTable({students}: { students: Student[] }) {
    if (students.length === 0) {
        return <Text>Il corso non ha studenti!</Text>;
    }

    return (
        <Table highlightOnHover withColumnBorders>
            <thead>
            <tr>
                <th>Id Studente</th>
                <th>Nome</th>
                <th>Cognome</th>
                <th>Classe</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student) => <StudentRow student={student} key={student.id}/>)}
            </tbody>
        </Table>
    )
}

