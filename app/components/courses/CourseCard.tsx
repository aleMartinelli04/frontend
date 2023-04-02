import type {Course} from "~/types/types";
import {Card, Center} from "@mantine/core";
import {Link} from "@remix-run/react";

export function CourseCard({course}: { course: Course }) {
    return (
        <Link to={`/dashboard/courses/${course.id}`}>
            <Card withBorder color={"red"} py={5}>
                <Center>
                    <h3>{course.name}</h3>
                </Center>
            </Card>
        </Link>
    );
}