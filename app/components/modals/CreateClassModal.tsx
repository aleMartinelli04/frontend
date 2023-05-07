import {createClass} from "~/api/create";
import {useForm} from "@mantine/form";
import {Button, Container, Group, Modal, Space, TextInput, useMantineTheme} from "@mantine/core";
import {Form} from "@remix-run/react";

export function CreateClassModal({opened, close}: { opened: boolean, close: () => any }) {
    const theme = useMantineTheme();

    const create = async ({name}: { name: string }) => {
        const course = await createClass(name);
        close();
        window.location.href = `/dashboard/classes/${course.id}`;
    }

    const form = useForm({
        initialValues: {
            name: ''
        },
        validate: {
            name: (value) => {
                if (!value || value.trim().length === 0) return 'Il nome della classe è obbligatorio';
            }
        }
    });

    return (
        <Modal
            opened={opened}
            title="Crea una classe"
            centered
            onClose={close}>
            <Container>
                <Form onSubmit={form.onSubmit(create)}>
                    <TextInput
                        label="Nome della classe"
                        placeholder="Inserisci il nome della classe"
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