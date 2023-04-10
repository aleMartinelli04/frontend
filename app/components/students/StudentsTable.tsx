import type {ChangeEvent, ReactNode} from 'react';
import {useState} from 'react';
import {Center, Checkbox, Group, rem, ScrollArea, Table, Text, TextInput, UnstyledButton,} from '@mantine/core';
import {IconChevronDown, IconChevronUp, IconSearch, IconSelector} from '@tabler/icons-react';
import type {Class, Student} from "~/types/types";
import {StudentRow} from "~/components/students/StudentRow";

type sortingType = "surname" | "name" | "class" | null;

export function StudentsTable({students, withCheckbox, editable, deletable, classes}: {
    students: Student[],
    withCheckbox?: boolean,
    editable?: boolean,
    deletable?: boolean,
    classes?: Class[]
}) {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(students);
    const [sortBy, setSortBy] = useState<sortingType>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);

    const setSorting = (field: sortingType) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(students, {sortBy: field, reversed, search}));
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(students, {sortBy, reversed: reverseSortDirection, search: value}));
    };

    return (
        <ScrollArea>
            <TextInput
                placeholder={"Ricerca per cognome, nome o classe"}
                mb={"md"}
                icon={<IconSearch size="0.9rem" stroke={1.5}/>}
                value={search}
                onChange={handleSearchChange}
            />
            <Table highlightOnHover>
                <thead>
                <tr>
                    {withCheckbox && (
                        <th style={{width: rem(40)}}>
                            <Checkbox
                                checked={selected.length === students.length}
                                onChange={(event) => {
                                    if (event.currentTarget.checked) {
                                        setSelected(students.map((student) => student.id));
                                    } else {
                                        setSelected([]);
                                    }
                                }}
                            />
                        </th>
                    )}
                    {editable && <th style={{width: rem(40)}}/>}
                    {deletable && <th style={{width: rem(40)}}/>}
                    <th>
                        Id
                    </th>
                    <Th
                        reversed={reverseSortDirection}
                        sorted={sortBy === 'surname'}
                        onSort={() => setSorting('surname')}
                    >
                        Cognome
                    </Th>
                    <Th reversed={reverseSortDirection} sorted={sortBy === 'name'} onSort={() => setSorting('name')}>
                        Nome
                    </Th>
                    <Th
                        reversed={reverseSortDirection}
                        sorted={sortBy === 'class'}
                        onSort={() => setSorting('class')}
                    >
                        Classe
                    </Th>
                </tr>
                </thead>
                <tbody>
                {sortedData.map((student) =>
                    <StudentRow student={student} withCheckbox={withCheckbox} editable={editable} deletable={deletable}
                                classes={classes} selected={selected} setSelected={setSelected} key={student.id}/>
                )}
                </tbody>
            </Table>
        </ScrollArea>
    );
}

function Th({children, reversed, sorted, onSort}: {
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

function filterData(students: Student[], search: string) {
    const query = search.toLowerCase().trim();

    return students.filter((student) => (
        student.name.toLowerCase().includes(query) ||
        student.surname.toLowerCase().includes(query) ||
        student.class?.name.toLowerCase().includes(query)
    ));
}

function sortData(students: Student[], payload: {
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
