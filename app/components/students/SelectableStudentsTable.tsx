import type {ChangeEvent} from 'react';
import {useState} from 'react';
import {Button, Checkbox, Group, rem, ScrollArea, Table, TextInput,} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import type {Student} from "~/types/types";
import {sortData, Th} from "~/components/students/StudentsTable";

export type sortingType = "surname" | "name" | "class" | null;

export function SelectableStudentsTable({students, selected, saveChoice}: {
    students: Student[],
    selected: Student[],
    saveChoice: (students: Student[]) => void
}) {
    const [query, setQuery] = useState('');
    const [sortedStudents, setSortedStudents] = useState(students);
    const [sortBy, setSortBy] = useState<sortingType>(null);
    const [reverse, setReverse] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<Student[]>(selected);

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

    const toggleAll = () => {
        setSelectedStudents((prev) => {
            if (prev.length === students.length) {
                return [];
            }

            return students;
        });
    }

    const toggleRow = (student: Student) => {
        setSelectedStudents((prev) => {
            if (prev.some((s) => s.id === student.id)) {
                return prev.filter((s) => s.id !== student.id);
            }

            return [...prev, student];
        });
    }

    return (
        <ScrollArea>
            <TextInput
                placeholder={"Ricerca per cognome, nome o classe"}
                mb={"md"}
                icon={<IconSearch size="0.9rem" stroke={1.5}/>}
                value={query}
                onChange={handleSearchChange}
            />

            <Table highlightOnHover>
                <thead>
                <tr>
                    <th style={{width: rem(40)}}>
                        <Checkbox checked={selectedStudents.length === students.length} onChange={toggleAll}/>
                    </th>
                    <th>
                        Id
                    </th>
                    <Th
                        reversed={reverse}
                        sorted={sortBy === 'surname'}
                        onSort={() => setSorting('surname')}
                    >
                        Cognome
                    </Th>
                    <Th reversed={reverse} sorted={sortBy === 'name'} onSort={() => setSorting('name')}>
                        Nome
                    </Th>
                    <Th
                        reversed={reverse}
                        sorted={sortBy === 'class'}
                        onSort={() => setSorting('class')}
                    >
                        Classe
                    </Th>
                </tr>
                </thead>
                <tbody>
                {sortedStudents.map((student) => (
                    <tr key={student.id}>
                        <td>
                            <Checkbox checked={selectedStudents.some((s) => s.id === student.id)}
                                      onChange={() => toggleRow(student)}/>
                        </td>
                        <td>{student.id}</td>
                        <td>{student.surname}</td>
                        <td>{student.name}</td>
                        <td>{student.class?.name}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Group position={"center"} mt={"lg"}>
                <Button variant={"outline"} color={"red"} onClick={() => saveChoice(selectedStudents)}>
                    Conferma
                </Button>
            </Group>
        </ScrollArea>
    );
}