import type {Course, SchoolYear} from "~/types/types";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {getCoursesForYear, getCurrentSchoolYear} from "~/api/get";
import {Button, Container, Group, Space, useMantineTheme} from "@mantine/core";
import {Outlet, useLoaderData} from "@remix-run/react";
import {YearLabel} from "~/components/years/YearLabel";
import {CoursesGrid} from "~/components/courses/CoursesGrid";
import {CreateCourseModal} from "~/components/modals/CreateCourseModal";
import {useDisclosure} from "@mantine/hooks";

type LoaderData = {
    schoolYear: SchoolYear,
    courses: Course[]
}

export const loader: LoaderFunction = async () => {
    const schoolYear = await getCurrentSchoolYear();
    const courses = await getCoursesForYear(schoolYear);

    return json<LoaderData>({
        schoolYear: schoolYear,
        courses: courses
    });
}

export default function Courses() {
    const {schoolYear, courses} = useLoaderData<LoaderData>();
    const [opened, {open, close}] = useDisclosure(false);

    const theme = useMantineTheme();

    return (
        <>
            <CreateCourseModal opened={opened} close={close}/>

            <Container>
                <YearLabel year={schoolYear} before={'Corsi'}/>
                <CoursesGrid courses={courses}/>

                <Space h={"lg"}/>

                <Group position={"center"}>
                    <Button variant={"outline"} color={theme.primaryColor} onClick={open}>
                        Crea corso
                    </Button>
                </Group>

                <Outlet/>
            </Container>
        </>
    )
}