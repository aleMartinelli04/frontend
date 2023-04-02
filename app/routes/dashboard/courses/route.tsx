import type {Course, SchoolYear} from "~/types/types";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {getCoursesForYear, getCurrentSchoolYear} from "~/api/api";
import {Container} from "@mantine/core";
import {Outlet, useLoaderData} from "@remix-run/react";
import {YearLabel} from "~/components/years/YearLabel";
import {CoursesGrid} from "~/components/courses/CoursesGrid";

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

    return (
        <Container>
            <YearLabel year={schoolYear} before={'Corsi'}/>
            <CoursesGrid courses={courses}/>
            <Outlet/>
        </Container>
    )
}