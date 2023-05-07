import {Button, Group, Modal, Space, TextInput, useMantineTheme} from "@mantine/core";
import type {Course} from "~/types/types";
import {useForm} from "@mantine/form";
import {notify} from "~/utils/notifications";
import {updateCourse} from "~/api/update";
import {Form} from "@remix-run/react";
import {useEffect} from "react";

export function UpdateCourseModal({course, opened, close}: { course: Course, opened: boolean, close: () => void }) {
    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            name: course.name
        },
        validate: {
            name: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Nome obbligatorio';
                }
            }
        }
    });

    const update = async ({name}: { name: string }) => {
        try {
            await updateCourse(course.id, name);
            close();
            window.location.reload();
        } catch (e: Error | any) {
            console.error(e);
            notify(e.message, 'red', 'Errore');
        }
    }

    useEffect(() => {
        form.setFieldValue('name', course.name);
    }, [course]);

    return (
        <Modal opened={opened} onClose={close} centered title={"Aggiorna Corso"}>
            <Form onSubmit={form.onSubmit(update)}>
                <TextInput
                    label={"Nome"}
                    placeholder={"Nome"}
                    required
                    error={form.errors.name}
                    {...form.getInputProps('name')}/>

                <Space h={"lg"}/>

                <Group position={"right"}>
                    <Button type={"submit"} variant={"outline"} color={theme.primaryColor}>
                        Modifica
                    </Button>
                </Group>
            </Form>
        </Modal>
    )
}