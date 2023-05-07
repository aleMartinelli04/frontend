import type {Course} from "~/types/types";
import {Card, Center, useMantineTheme} from "@mantine/core";
import {Link} from "@remix-run/react";

export function CourseCard({course}: { course: Course }) {
    const theme = useMantineTheme();

    return (
        <Card withBorder color={theme.primaryColor} py={5} component={Link} to={`/dashboard/courses/${course.id}`}>
            <Center>
                <h3>{course.name}</h3>
            </Center>
        </Card>
    );
}