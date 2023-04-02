import {Container, Space, Text} from "@mantine/core";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {Course, Student} from "~/types/types";
import {getCourse, getStudentsForCourse} from "~/api/api";
import {useLoaderData} from "@remix-run/react";
import {StudentsTable} from "~/components/students/StudentsTable";


type LoaderData = {
    course: Course,
    students: Student[]
}

export const loader: LoaderFunction = async ({params}) => {
    const {id} = params;

    const courseId = parseInt(id as string);

    if (isNaN(courseId)) {
        throw new Error("Id del corso invalido");
    }

    const course = await getCourse(courseId);
    const students = await getStudentsForCourse(course);

    return json<LoaderData>({
        course: course,
        students: students
    });
}

export default function CourseId() {
    const {course, students} = useLoaderData<LoaderData>();

    return (
        <Container fluid>
            <Space h={"2rem"}/>
            <h2>Studenti del corso <Text span color={"red"}>{course.name}</Text></h2>
            <StudentsTable students={students}/>
        </Container>
    )
}

export function ErrorBoundary({error}: { error: Error }) {
    return (
        <div>
            <Space h={"2rem"}/>
            <h1>Errore</h1>
            <p>{error.message}</p>
        </div>
    )
}