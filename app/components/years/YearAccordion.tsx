import type {SchoolYear} from "~/types/types";
import {Accordion, Text} from "@mantine/core";
import {YearAccordionItem} from "~/components/years/YearAccordionItem";

export function YearAccordion({years}: { years: SchoolYear[] }) {
    if (years.length === 0) {
        return <Text>Non ci sono anni scolastici!</Text>;
    }

    return (
        <Accordion variant={"separated"}>
            {years.map((year) => (<YearAccordionItem year={year} key={year.start_year}/>))}
        </Accordion>
    )
}