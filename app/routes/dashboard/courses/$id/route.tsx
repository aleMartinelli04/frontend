import {Button, Container, Space, Text, UnstyledButton} from "@mantine/core";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {Course, Student} from "~/types/types";
import {getCourse, getStudentsForCourse} from "~/api/get";
import {useLoaderData} from "@remix-run/react";
import {StudentsTable} from "~/components/students/StudentsTable";
import {deleteCourse} from "~/api/delete";
import {useDisclosure} from "@mantine/hooks";
import {IconPencil} from "@tabler/icons-react";
import {UpdateCourseModal} from "~/components/modals/UpdateCourseModal";


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
        course,
        students
    });
}

export default function CourseIdPage() {
    const {course, students} = useLoaderData<LoaderData>();
    const [opened, {open, close}] = useDisclosure(false);

    return (
        <>
            <UpdateCourseModal opened={opened} close={close} course={course}/>

            <Container mt={30}>
                <UnstyledButton onClick={open}>
                    <Text size={"xl"} weight={"bold"} span>{course.name}</Text>
                    <IconPencil size={20} style={{marginLeft: 15}}/>
                </UnstyledButton>

                <Space h={"lg"}/>

                {students.length === 0 ? (
                    <Container>
                        <p>Il corso non ha nessuno studente</p>
                        <Button variant={"filled"} color={"red"} onClick={async () => {
                            await deleteCourse(course);
                            window.location.href = "/dashboard/courses";
                        }}>
                            Elimina corso
                        </Button>
                    </Container>
                ) : (
                    <Container>
                        <StudentsTable students={students}/>
                    </Container>
                )}
            </Container>
        </>
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