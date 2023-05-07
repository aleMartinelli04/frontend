import {Button, Container, Group, Modal, Space, TextInput, useMantineTheme} from "@mantine/core";
import {useForm} from "@mantine/form";
import {createCourse} from "~/api/create";
import {Form} from "@remix-run/react";

export function CreateCourseModal({opened, close}: { opened: boolean, close: () => any }) {
    const theme = useMantineTheme();

    const create = async ({name}: { name: string }) => {
        const course = await createCourse(name);
        close();
        window.location.href = `/dashboard/courses/${course.id}`;
    }

    const form = useForm({
        initialValues: {
            name: ''
        },
        validate: {
            name: (value) => {
                if (!value || value.trim().length === 0) return 'Il nome del corso è obbligatorio';
            }
        }
    });

    return (
        <Modal
            opened={opened}
            title="Crea un nuovo corso"
            centered
            onClose={close}>
            <Container>
                <Form onSubmit={form.onSubmit(create)}>
                    <TextInput
                        label="Nome del corso"
                        placeholder="Inserisci il nome del corso"
                        required
                        error={form.errors.name}
                        {...form.getInputProps('name')}
                    />

                    <Space h={"lg"}/>

                    <Group position={"right"}>
                        <Button variant={"outline"} color={theme.primaryColor} type={"submit"}>
                            Crea
                        </Button>
                    </Group>
                </Form>
            </Container>
        </Modal>
    );
}