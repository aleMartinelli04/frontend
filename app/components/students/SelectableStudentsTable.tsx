import type {ChangeEvent} from 'react';
import {useEffect, useState} from 'react';
import {Button, Checkbox, Group, rem, ScrollArea, Table, TextInput, useMantineTheme,} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import type {Student} from "~/types/types";
import type {sortingType} from "~/components/students/StudentsTable";
import {sortData, Th} from "~/components/students/StudentsTable";

export function SelectableStudentsTable({studentsInCourse, allStudents, saveChoice}: {
    studentsInCourse: Student[],
    allStudents: Student[],
    saveChoice: (students: Student[]) => void
}) {
    const [query, setQuery] = useState('');
    const [sortedStudents, setSortedStudents] = useState(allStudents);
    const [sortBy, setSortBy] = useState<sortingType>(null);
    const [reverse, setReverse] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<Student[]>(studentsInCourse);

    const theme = useMantineTheme();

    useEffect(() => {
        setSortedStudents(sortData(allStudents, {sortBy, reversed: reverse, search: query}));
    }, [allStudents, sortBy, reverse, query]);

    useEffect(() => {
        setSelectedStudents(studentsInCourse);
    }, [studentsInCourse]);

    const setSorting = (field: sortingType) => {
        const reversed = field === sortBy ? !reverse : false;
        setReverse(reversed);
        setSortBy(field);
        setSortedStudents(sortData(allStudents, {sortBy: field, reversed, search: query}));
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setQuery(value);
        setSortedStudents(sortData(allStudents, {sortBy, reversed: reverse, search: value}));
    };

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
                    </th>
                    <Th
                        reversed={reverse}
                        sorted={sortBy === 'id'}
                        onSort={() => setSorting('id')}>
                        Id
                    </Th>
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
                <Button variant={"outline"} color={theme.primaryColor} onClick={() => saveChoice(selectedStudents)}>
                    Conferma
                </Button>
            </Group>
        </ScrollArea>
    );
}