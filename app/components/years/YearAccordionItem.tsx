import type {SchoolYear} from "~/types/types";
import {Accordion} from "@mantine/core";
import {YearLabel} from "~/components/years/YearLabel";

export function YearAccordionItem({year}: { year: SchoolYear }) {
    return (
        <Accordion.Item value={year.start_year.toString()} key={year.start_year}>
            <Accordion.Control>{year.start_year}/{year.start_year + 1}</Accordion.Control>
            <Accordion.Panel>
                <YearLabel year={year}/>

                <h3>Corsi</h3>
                {year.courses!.length > 0 ? (
                    <ul>
                        {year.courses!.map((course) => (
                            <li key={course.id}>{course.name}</li>
                        ))}
                    </ul>) : (
                    <p>Non ci sono corsi</p>
                )}

                <h3>Classi</h3>
                {year.classes!.length > 0 ? (
                    <ul>
                        {year.classes!.map((class_) => (
                            <li key={class_.id}>{class_.name}</li>
                        ))}
                    </ul>) : (
                    <p>Non ci sono classi</p>
                )}

            </Accordion.Panel>
        </Accordion.Item>
    );
}