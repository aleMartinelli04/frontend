import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {Class, Student} from "~/types/types";
import {getClass, getStudentsForClass} from "~/api/api";
import {useLoaderData} from "@remix-run/react";
import {Container, Space} from "@mantine/core";
import {StudentsTable} from "~/components/students/StudentsTable";

type LoaderData = {
    c: Class,
    students: Student[]
}

export const loader: LoaderFunction = async ({params}) => {
    const {id} = params;

    const classId = parseInt(id as string);

    if (isNaN(classId)) {
        throw new Error('Id classe invalido');
    }

    const c = await getClass(classId);
    const students = await getStudentsForClass(c);

    return json<LoaderData>({
        c,
        students
    });
}

export default function ClassPage() {
    const {c, students} = useLoaderData<LoaderData>();

    return (
        <Container>
            <h1>{c.name}</h1>
            <Space h={"sm"}/>
            <StudentsTable students={students}/>
        </Container>
    )
}