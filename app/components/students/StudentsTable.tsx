import type {ChangeEvent, ReactNode} from 'react';
import {useEffect, useState} from 'react';
import {Center, Group, ScrollArea, Table, Text, TextInput, UnstyledButton,} from '@mantine/core';
import {IconChevronDown, IconChevronUp, IconSearch, IconSelector} from '@tabler/icons-react';
import type {Student} from "~/types/types";

export type sortingType = "surname" | "name" | "class" | "id" | null;

export function StudentsTable({students}: {
    students: Student[],
}) {
    const [query, setQuery] = useState('');
    const [sortedStudents, setSortedStudents] = useState(students);
    const [sortBy, setSortBy] = useState<sortingType>(null);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        setSortedStudents(sortData(students, {sortBy, reversed: reverse, search: query}));
    }, [query, reverse, sortBy, students]);

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
        <>
            <TextInput
                placeholder={"Ricerca per cognome, nome o classe"}
                mb={"md"}
                icon={<IconSearch size="0.9rem" stroke={1.5}/>}
                value={query}
                onChange={handleSearchChange}
            />
            <ScrollArea h={200}>

                <Table highlightOnHover>
                    <thead>
                    <tr>
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
                            <td>{student.id}</td>
                            <td>{student.surname}</td>
                            <td>{student.name}</td>
                            <td>{student.class?.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </ScrollArea>
        </>
    );
}

export function Th({children, reversed, sorted, onSort}: {
    children: ReactNode,
    reversed: boolean,
    sorted: boolean,
    onSort: () => void
}) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <th>
            <UnstyledButton onClick={onSort}>
                <Group position="apart">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center>
                        <Icon size="0.9rem" stroke={1.5}/>
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

export function filterData(students: Student[], search: string) {
    const query = search.toLowerCase().trim();

    return students.filter((student) => (
        student.name.toLowerCase().includes(query) ||
        student.surname.toLowerCase().includes(query) ||
        student.class?.name.toLowerCase().includes(query)
    ));
}

export function sortData(students: Student[], payload: {
    sortBy: sortingType;
    reversed: boolean;
    search: string
}) {
    const {sortBy} = payload;

    if (!sortBy) {
        return filterData(students, payload.search);
    }

    const {reversed} = payload;

    if (sortBy === "class") {
        return filterData(students, payload.search).sort((a, b) => {
            if (a.class?.name! < b.class?.name!) {
                return reversed ? 1 : -1;
            }

            if (a.class?.name! > b.class?.name!) {
                return reversed ? -1 : 1;
            }

            return 0;
        });
    }

    return filterData(students, payload.search).sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
            return reversed ? 1 : -1;
        }

        if (a[sortBy] > b[sortBy]) {
            return reversed ? -1 : 1;
        }

        return 0;
    });
}
