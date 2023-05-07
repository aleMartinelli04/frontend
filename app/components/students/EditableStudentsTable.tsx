import type {Class, Student} from "~/types/types";
import type {ChangeEvent} from "react";
import {useState} from "react";
import type {sortingType} from "~/components/students/StudentsTable";
import {sortData, Th} from "~/components/students/StudentsTable";
import {rem, ScrollArea, Table, TextInput} from "@mantine/core";
import {IconPencil, IconSearch, IconTrash} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {deleteStudent} from "~/api/delete";
import {notify} from "~/utils/notifications";
import {UpdateStudentModal} from "~/components/modals/UpdateStudentModal";

export function EditableStudentsTable({students, classes}: {
    students: Student[],
    classes: Class[]
}) {
    const [query, setQuery] = useState('');
    const [sortedStudents, setSortedStudents] = useState<Student[]>(students);
    const [sortBy, setSortBy] = useState<sortingType>(null);
    const [reverse, setReverse] = useState(false);

    const setSorting = (field: sortingType) => {
        const reversed = field === sortBy ? !reverse : false;
        setReverse(reversed);
        setSortBy(field);
        setSortedStudents(sortData(students, {sortBy: field, reversed, search: query}));
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setQuery(value);
        setSortedStudents(sortData(students, {sortBy, reversed: reverse, search: value}));
    };

    return (
        <ScrollArea>
            <TextInput
                placeholder={"Ricerca per cognome, nome o classe"}
                mb={"md"}
                icon={<IconSearch size={"0.9rem"} stroke={1.5}/>}
                value={query}
                onChange={handleSearchChange}/>

            <Table highlightOnHover>
                <thead>
                <tr>
                    <th style={{width: rem(40)}}/>
                    <th style={{width: rem(40)}}/>
                    <th>Id</th>
                    <Th reversed={reverse} sorted={sortBy === 'surname'} onSort={() => setSorting('surname')}>
                        Cognome
                    </Th>
                    <Th reversed={reverse} sorted={sortBy === 'name'} onSort={() => setSorting('name')}>
                        Nome
                    </Th>
                    <Th reversed={reverse} sorted={sortBy === 'class'} onSort={() => setSorting('class')}>
                        Classe
                    </Th>
                </tr>
                </thead>
                <tbody>
                {sortedStudents.map((student) => (
                    <EditableTableRow student={student} classes={classes} key={student.id}/>
                ))}
                </tbody>
            </Table>
        </ScrollArea>
    )

}

function EditableTableRow({student, classes}: {
    student: Student,
    classes: Class[]
}) {
    const [opened, {open, close}] = useDisclosure(false);

    const del = async () => {
        try {
            await deleteStudent(student);
            window.location.reload();
        } catch (e: Error | any) {
            notify(e.message, 'red', 'Errore');
        }
    }

    return (
        <>
            <UpdateStudentModal opened={opened} close={close} student={student} classes={classes}/>

            <tr>
                <td style={{width: rem(40)}}>
                    <IconPencil size={"0.9rem"} stroke={1.5} onClick={open}/>
                </td>
                <td style={{width: rem(40)}}>
                    <IconTrash size={"0.9rem"} stroke={1.5} onClick={del}/>
                </td>
                <td>{student.id}</td>
                <td>{student.surname}</td>
                <td>{student.name}</td>
                <td>{student.class?.name || 'Classe non trovata'}</td>
            </tr>
        </>
    )
}