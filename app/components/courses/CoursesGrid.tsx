import type {Course} from "~/types/types";
import {Grid, Text} from "@mantine/core";
import {CourseCard} from "~/components/courses/CourseCard";


export function CoursesGrid({courses}: { courses: Course[] }) {
    if (courses.length === 0) {
        return (
            <Text>Non ci sono corsi!</Text>
        );
    }

    return (
        <Grid>
            {courses.map((course) => (
                <Grid.Col xs={4} md={3} key={course.id}>
                    <CourseCard course={course}/>
                </Grid.Col>
            ))}
        </Grid>
    )
}