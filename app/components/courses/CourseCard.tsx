import type {Course} from "~/types/types";
import {Card, Center} from "@mantine/core";
import {Link} from "@remix-run/react";

export function CourseCard({course}: { course: Course }) {
    return (
        <Card withBorder color={"red"} py={5} component={Link} to={`/dashboard/courses/${course.id}`}>
            <Center>
                <h3>{course.name}</h3>
            </Center>
        </Card>
    );
}