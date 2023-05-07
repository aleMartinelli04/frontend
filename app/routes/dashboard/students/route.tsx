import {Button, Container, Group, Space, useMantineTheme} from "@mantine/core";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {Class, SchoolYear, Student} from "~/types/types";
import {getClassesForYear, getCurrentSchoolYear, getStudentsForYear} from "~/api/get";
import {useLoaderData} from "@remix-run/react";
import {YearLabel} from "~/components/years/YearLabel";
import {CreateStudentModal} from "~/components/modals/CreateStudentModal";
import {useDisclosure} from "@mantine/hooks";
import {EditableStudentsTable} from "~/components/students/EditableStudentsTable";

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

    const theme = useMantineTheme();

    return (
        <>
            <CreateStudentModal opened={modalCreateOpened} onClose={close} classes={availableClasses}/>

            <Container>
                <YearLabel year={year} before={'Studenti'}/>
                <EditableStudentsTable students={students} classes={availableClasses}/>

                <Space h={"lg"}/>

                <Group position={"center"}>
                    <Button variant={"outline"} color={theme.primaryColor} onClick={open}>
                        Crea un nuovo studente
                    </Button>
                </Group>
            </Container>
        </>
    )
}