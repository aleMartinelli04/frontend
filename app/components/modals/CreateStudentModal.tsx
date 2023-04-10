import {Button, Container, Group, Modal, Select, Space, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import type {Class} from "~/types/types";
import {Form} from "@remix-run/react";
import {createStudent} from "~/api/create";
import {notify} from "~/utils/notifications";

export function CreateStudentModal({opened, onClose, classes}: {
    opened: boolean,
    onClose: () => void,
    classes: Class[]
}) {
    const form = useForm({
        initialValues: {
            name: '',
            surname: '',
            c: '0',
        },
        validate: {
            name: (name) => {
                if (name.trim().length === 0) return 'Il nome è obbligatorio';
            },
            surname: (surname) => {
                if (surname.trim().length === 0) return 'Il cognome è obbligatorio';
            },
            c: (classId) => {
                if (classId === '0') return 'La classe è obbligatoria';
            }
        }
    });

    const create = async ({name, surname, c}: { name: string, surname: string, c: string }) => {
        try {
            await createStudent(surname, name, parseInt(c));
            close();
            window.location.reload();
        } catch (e) {
            const {message} = e as Error;
            notify(message, 'Errore');
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} centered title={"Crea studente"}>
            <Container>
                <Form onSubmit={form.onSubmit(create)}>
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
                        label={'Classe'}
                        placeholder={'Seleziona classe'}
                        withAsterisk
                        withinPortal
                        error={form.errors.c}
                        {...form.getInputProps('c')}/>

                    <Space h={"lg"}/>

                    <Group position={"right"}>
                        <Button variant={"outline"} color={"red"} type={"submit"}>
                            Crea
                        </Button>
                    </Group>
                </Form>
            </Container>
        </Modal>
    )
}