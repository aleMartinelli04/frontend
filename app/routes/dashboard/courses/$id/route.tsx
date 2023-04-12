import {Button, Container, Group, Space, Text, UnstyledButton} from "@mantine/core";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {Course, Student} from "~/types/types";
import {getCourse, getCurrentSchoolYear, getStudentsForCourse, getStudentsForYear} from "~/api/get";
import {useLoaderData} from "@remix-run/react";
import {StudentsTable} from "~/components/students/StudentsTable";
import {deleteCourse} from "~/api/delete";
import {useDisclosure} from "@mantine/hooks";
import {IconPencil} from "@tabler/icons-react";
import {UpdateCourseModal} from "~/components/modals/UpdateCourseModal";
import {useState} from "react";
import {SelectableStudentsTable} from "~/components/students/SelectableStudentsTable";
import {inscribeStudents} from "~/api/inscribe";
import {notify} from "~/utils/notifications";


type LoaderData = {
    course: Course,
    students: Student[],
    allStudents: Student[]
}

type Res = {
    notFoundStudents: number[],
    wrongYearStudents: number[],
    alreadyInCourseStudents: number[],
    inscribedStudents: number,
    removedStudents: number
};

export const loader: LoaderFunction = async ({params}) => {
    const {id} = params;

    const courseId = parseInt(id as string);

    if (isNaN(courseId)) {
        throw new Error("Id del corso invalido");
    }

    const course = await getCourse(courseId);
    const students = await getStudentsForCourse(course);

    const allStudents = await getStudentsForYear(await getCurrentSchoolYear());

    return json<LoaderData>({
        course,
        students,
        allStudents
    });
}

export default function CourseIdPage() {
    const {course, students, allStudents} = useLoaderData<LoaderData>();
    const [opened, {open, close}] = useDisclosure(false);
    const [update, setUpdate] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<Student[]>(students);

    const inscribe = async (students: Student[]) => {
        try {
            const res: Res = await inscribeStudents(course.id, students.map(s => s.id));

            const {
                notFoundStudents,
                wrongYearStudents,
                alreadyInCourseStudents,
                inscribedStudents,
                removedStudents
            } = res;

            let msg = '';

            if (notFoundStudents.length !== 0) {
                msg += `Studenti non trovati: ${notFoundStudents.length}\n`;
            }

            if (wrongYearStudents.length !== 0) {
                msg += `Studenti di un anno diverso: ${wrongYearStudents.length}\n`;
            }

            if (alreadyInCourseStudents.length !== 0) {
                msg += `Studenti già iscritti: ${alreadyInCourseStudents.length}\n`;
            }

            let title = `Studenti iscritti: ${inscribedStudents}`;

            if (removedStudents !== 0) {
                title += ` - Studenti rimossi: ${removedStudents}`;
            }

            setSelectedStudents(students);
            setUpdate(false);

            notify(msg, title, "green");

        } catch (e: Error | any) {
            notify(e.message, 'Errore');
        }
    }

    return (
        <>
            <UpdateCourseModal opened={opened} close={close} course={course}/>

            <Container mt={30}>
                <UnstyledButton onClick={open}>
                    <Text size={"xl"} weight={"bold"} span>{course.name}</Text>
                    <IconPencil size={20} style={{marginLeft: 15}}/>
                </UnstyledButton>

                <Space h={"lg"}/>

                {update ? (
                    <Container>
                        <SelectableStudentsTable students={allStudents} selected={selectedStudents}
                                                 saveChoice={inscribe}/>
                    </Container>
                ) : selectedStudents.length === 0 ? (
                    <>
                        <Text>Il corso non ha nessuno studente</Text>
                        <Group position={"center"} mt={"sm"}>
                            <Button variant={"filled"} color={"red"} onClick={async () => {
                                await deleteCourse(course);
                                window.location.href = "/dashboard/courses";
                            }}>
                                Elimina corso
                            </Button>
                        </Group>
                    </>
                ) : (
                    <Container>
                        <StudentsTable students={selectedStudents}/>
                    </Container>
                )}

                {!update && (
                    <Group position={"center"} mt={"sm"}>
                        <Button variant={"outline"} color={"red"} onClick={() => setUpdate(true)}>
                            Modifica Iscrizioni
                        </Button>
                    </Group>
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