import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {Class, Student} from "~/types/types";
import {getClass, getStudentsForClass} from "~/api/get";
import {useLoaderData} from "@remix-run/react";
import {Button, Container, Space, Text, UnstyledButton} from "@mantine/core";
import {deleteClass} from "~/api/delete";
import {StudentsTable} from "~/components/students/StudentsTable";
import {useDisclosure} from "@mantine/hooks";
import {UpdateClassModal} from "~/components/modals/UpdateClassModal";
import {IconPencil} from "@tabler/icons-react";

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

export default function ClassIdPage() {
    const {c, students} = useLoaderData<LoaderData>();
    const [opened, {open, close}] = useDisclosure(false);

    return (
        <>
            <UpdateClassModal opened={opened} close={close} c={c}/>

            <Container>
                <UnstyledButton onClick={open}>
                    <Text size={"xl"} weight={"bold"} span>{c.name}</Text>
                    <IconPencil size={20} style={{marginLeft: 15}}/>
                </UnstyledButton>

                <Space h={"lg"}/>

                {students.length === 0 ? (
                    <Container>
                        <p>La classe non ha nessuno studente</p>
                        <Button variant={"filled"} color={"red"} onClick={async () => {
                            await deleteClass(c);
                            window.location.href = "/dashboard/classes";
                        }}>
                            Elimina classe
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