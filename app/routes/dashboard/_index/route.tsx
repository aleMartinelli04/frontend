import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {Container, Space, Text} from "@mantine/core";
import type {Course, SchoolYear} from "~/types/types";
import {getCoursesForYear, getCurrentSchoolYear} from "~/api/api";
import {YearLabel} from "~/components/years/YearLabel";
import {CoursesGrid} from "~/components/courses/CoursesGrid";

type LoaderData = {
    currentSchoolYear: SchoolYear,
    courses: Course[]
}

export const loader: LoaderFunction = async () => {
    const currentSchoolYear = await getCurrentSchoolYear();
    const courses = await getCoursesForYear(currentSchoolYear);

    return json<LoaderData>({
        currentSchoolYear: currentSchoolYear,
        courses: courses
    });
}

export default function Dashboard() {
    const {currentSchoolYear, courses} = useLoaderData<LoaderData>();

    return (
        <Container>
            <YearLabel year={currentSchoolYear}/>
            <Space h="l"/>
            <Text>Corsi disponibili per quest'anno:</Text>
            <Space h="md"/>
            <CoursesGrid courses={courses}/>
        </Container>
    )
}