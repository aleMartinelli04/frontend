import type {SchoolYear} from "~/types/types";
import {Accordion} from "@mantine/core";

export function YearAccordionItem({year}: { year: SchoolYear }) {
    return (
        <Accordion.Item value={year.start_year.toString()} key={year.start_year}>
            <Accordion.Control>{year.start_year}/{year.start_year + 1}</Accordion.Control>
            <Accordion.Panel>

            </Accordion.Panel>
        </Accordion.Item>
    );
}