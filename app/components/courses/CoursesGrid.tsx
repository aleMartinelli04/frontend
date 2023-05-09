import type {Course} from "~/types/types";
import {Grid, Text, TextInput} from "@mantine/core";
import {CourseCard} from "~/components/courses/CourseCard";
import type {ChangeEvent} from "react";
import {useState} from "react";
import {IconSearch} from "@tabler/icons-react";


export function CoursesGrid({courses}: { courses: Course[] }) {
    const [query, setQuery] = useState<string>('');
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

    if (courses.length === 0) {
        return (
            <Text>Non ci sono corsi!</Text>
        );
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setQuery(value);
        setFilteredCourses(courses.filter((c) => c.name.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <>
            <TextInput
                placeholder={"Ricerca corso"}
                mb={"md"}
                icon={<IconSearch size="0.9rem" stroke={1.5}/>}
                value={query}
                onChange={handleSearchChange}
            />

            <Grid>
                {filteredCourses.map((course) => (
                    <Grid.Col xs={4} md={3} key={course.id}>
                        <CourseCard course={course}/>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    )
}