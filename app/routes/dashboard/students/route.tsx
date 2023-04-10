import {Button, Container, Group, Space} from "@mantine/core";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {Class, SchoolYear, Student} from "~/types/types";
import {getClassesForYear, getCurrentSchoolYear, getStudentsForYear} from "~/api/get";
import {useLoaderData} from "@remix-run/react";
import {YearLabel} from "~/components/years/YearLabel";
import {StudentsTable} from "~/components/students/StudentsTable";
import {CreateStudentModal} from "~/components/modals/CreateStudentModal";
import {useDisclosure} from "@mantine/hooks";

type LoaderData = {
    year: SchoolYear,
    students: Student[],
    availableClasses: Class[]
}

export const loader: LoaderFunction = async () => {
    const year = await getCurrentSchoolYear();
    const students = await getStudentsForYear(year);

    const availableClasses = await getClassesForYear(year);

    return json<LoaderData>({
        year, students, availableClasses
    });
}

export default function StudentsPage() {
    const {year, students, availableClasses} = useLoaderData<LoaderData>();

    const [modalCreateOpened, {open, close}] = useDisclosure(false);

    return (
        <>
            <CreateStudentModal opened={modalCreateOpened} onClose={close} classes={availableClasses}/>

            <Container>
                <YearLabel year={year} before={'Studenti'}/>
                <StudentsTable students={students} editable deletable classes={availableClasses}/>

                <Space h={"lg"}/>

                <Group position={"center"}>
                    <Button variant={"outline"} color={"red"} onClick={open}>
                        Crea un nuovo studente
                    </Button>
                </Group>
            </Container>
        </>
    )
}