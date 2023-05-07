import type {Class} from "~/types/types";
import {Card, Center, useMantineTheme} from "@mantine/core";
import {Link} from "@remix-run/react";

export function ClassCard({c}: { c: Class }) {
    const theme = useMantineTheme();

    return (
        <Card withBorder color={theme.primaryColor} py={5} component={Link} to={`/dashboard/classes/${c.id}`}>
            <Center>
                <h3>{c.name}</h3>
            </Center>
        </Card>
    );
}