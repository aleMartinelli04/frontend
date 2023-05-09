import type {SchoolYear} from "~/types/types";
import {Accordion, Button, Center} from "@mantine/core";
import {YearLabel} from "~/components/years/YearLabel";
import {deleteYear} from "~/api/delete";
import {notify} from "~/utils/notifications";

export function YearAccordionItem({year}: { year: SchoolYear }) {
    const hasClasses = year.classes!.length > 0;
    const hasCourses = year.courses!.length > 0;

    const del = async () => {
        try {
            await deleteYear(year);
            window.location.reload();
        } catch (e: Error | any) {
            notify(e.message, 'red', 'Errore');
        }
    }

    return (
        <Accordion.Item value={year.start_year.toString()} key={year.start_year}>
            <Accordion.Control>{year.start_year}/{year.start_year + 1}</Accordion.Control>
            <Accordion.Panel>
                <YearLabel year={year}/>

                <h3>Corsi</h3>
                {hasCourses ? (
                    <ul>
                        {year.courses!.map((course) => (
                            <li key={course.id}>{course.name}</li>
                        ))}
                    </ul>) : (
                    <p>Non ci sono corsi</p>
                )}

                <h3>Classi</h3>
                {hasClasses ? (
                    <ul>
                        {year.classes!.map((class_) => (
                            <li key={class_.id}>{class_.name}</li>
                        ))}
                    </ul>) : (
                    <p>Non ci sono classi</p>
                )}

                {!hasClasses && !hasCourses && (
                    <Center>
                        <Button variant={"filled"} onClick={del}>Elimina anno</Button>
                    </Center>)
                }
            </Accordion.Panel>
        </Accordion.Item>
    );
}