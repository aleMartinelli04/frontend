import {Button, Group, Modal, Select, Space, TextInput, useMantineTheme} from "@mantine/core";
import {Form} from "@remix-run/react";
import type {Class, Student} from "~/types/types";
import {useForm} from "@mantine/form";
import {updateStudent} from "~/api/update";
import {notify} from "~/utils/notifications";
import {useEffect} from "react";

export function UpdateStudentModal({opened, close, student, classes}: {
    opened: boolean,
    close: () => void,
    student: Student,
    classes: Class[]
}) {
    const theme = useMantineTheme();

    const update = async ({surname, name, c}: { surname: string, name: string, c: string }) => {
        try {
            await updateStudent(student.id, surname, name, parseInt(c));
            close();
            window.location.reload();
        } catch (e: Error | any) {
            notify(e.message, 'red', 'Errore');
        }
    }

    const form = useForm({
        initialValues: {
            surname: student.surname,
            name: student.name,
            c: student.class_id.toString()
        },
        validate: {
            surname: (surname) => {
                if (surname.trim().length === 0) return 'Il cognome è obbligatorio';
            },
            name: (name) => {
                if (name.trim().length === 0) return 'Il nome è obbligatorio';
            },
            c: (c) => {
                if (c === '0') return 'La classe è obbligatoria';
            }
        }
    });

    useEffect(() => {
        form.setFieldValue('surname', student.surname);
        form.setFieldValue('name', student.name);
        form.setFieldValue('c', student.class_id.toString());
    }, [student]);

    return (
        <Modal opened={opened} onClose={close} centered title={"Aggiorna Studente"}>
            <Form onSubmit={form.onSubmit(update)}>
                <TextInput
                    label={'Cognome studente'}
                    placeholder={'Inserisci il cognome'}
                    required
                    error={form.errors.surname}
                    {...form.getInputProps('surname')}
                />
                <TextInput
                    label={'Nome studente'}
                    placeholder={'Inserisci il nome'}
                    required
                    error={form.errors.name}
                    {...form.getInputProps('name')}
                />
                <Select
                    data={classes.map((c) => ({label: c.name, value: c.id.toString()}))}
                    withinPortal
                    placeholder={'Seleziona classe'}
                    label={'Classe'}
                    {...form.getInputProps('c')}/>

                <Space h={"lg"}/>

                <Group position={"right"}>
                    <Button type={"submit"} variant={"outline"} color={theme.primaryColor}>Aggiorna</Button>
                </Group>
            </Form>
        </Modal>
    )
}