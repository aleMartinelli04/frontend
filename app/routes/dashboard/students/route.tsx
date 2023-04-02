import {Container} from "@mantine/core";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {SchoolYear, Student} from "~/types/types";
import {getCurrentSchoolYear, getStudentsForYear} from "~/api/api";
import {useLoaderData} from "@remix-run/react";
import {YearLabel} from "~/components/years/YearLabel";
import {StudentsTable} from "~/components/students/StudentsTable";

type LoaderData = {
    year: SchoolYear,
    students: Student[]
}

export const loader: LoaderFunction = async () => {
    const year = await getCurrentSchoolYear();
    const students = await getStudentsForYear(year);

    return json<LoaderData>({
        year, students
    });
}

export default function StudentsPage() {
    const {year, students} = useLoaderData<LoaderData>();

    return (
        <Container>
            <YearLabel year={year} before={'Studenti'}/>
            <StudentsTable students={students}/>
        </Container>
    )
}