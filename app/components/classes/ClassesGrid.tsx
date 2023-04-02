import {Grid, Text} from "@mantine/core";
import {ClassCard} from "~/components/classes/ClassCard";
import type {Class} from "~/types/types";

export function ClassesGrid({classes}: { classes: Class[] }) {
    if (classes.length === 0) {
        return (
            <Text>Non ci sono classi!</Text>
        );
    }

    return (
        <Grid>
            {classes.map((c) => (
                <Grid.Col span={3} key={c.id}>
                    <ClassCard c={c}/>
                </Grid.Col>
            ))}
        </Grid>
    );
}