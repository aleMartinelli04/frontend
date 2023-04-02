import type {Class} from "~/types/types";
import {Card, Center} from "@mantine/core";
import {Link} from "@remix-run/react";

export function ClassCard({c}: { c: Class }) {
    return (
        <Link to={`/dashboard/classes/${c.id}`}>
            <Card withBorder color={"red"} py={5}>
                <Center>
                    <h3>{c.name}</h3>
                </Center>
            </Card>
        </Link>
    );
}