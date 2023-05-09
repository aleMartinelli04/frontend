import {Grid, Text, TextInput} from "@mantine/core";
import {ClassCard} from "~/components/classes/ClassCard";
import type {Class} from "~/types/types";
import type {ChangeEvent} from "react";
import {useState} from "react";
import {IconSearch} from "@tabler/icons-react";


export function ClassesGrid({classes}: { classes: Class[] }) {
    const [query, setQuery] = useState<string>('');
    const [filteredClasses, setFilteredClasses] = useState<Class[]>(classes);

    if (classes.length === 0) {
        return (
            <Text>Non ci sono classi!</Text>
        );
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setQuery(value);
        setFilteredClasses(classes.filter((c) => c.name.toLowerCase().includes(value.toLowerCase())));
    };

    return (
        <>
            <TextInput
                placeholder={"Ricerca classe"}
                mb={"md"}
                icon={<IconSearch size="0.9rem" stroke={1.5}/>}
                value={query}
                onChange={handleSearchChange}
            />

            <Grid>
                {filteredClasses.map((c) => (
                    <Grid.Col xs={3} md={2} key={c.id}>
                        <ClassCard c={c}/>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    );
}