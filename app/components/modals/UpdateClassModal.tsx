import type {Class} from "~/types/types";
import {Button, Group, Modal, Space, TextInput, useMantineTheme} from "@mantine/core";
import {useForm} from "@mantine/form";
import {Form} from "@remix-run/react";
import {updateClass} from "~/api/update";
import {notify} from "~/utils/notifications";
import {useEffect} from "react";

export function UpdateClassModal({c, opened, close}: { c: Class, opened: boolean, close: () => void }) {
    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            name: c.name
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
            await updateClass(c.id, name);
            close();
            window.location.reload();
        } catch (e: Error | any) {
            notify(e.message, 'red');
        }
    }

    useEffect(() => {
        form.setFieldValue('name', c.name);
    }, [c]);

    return (
        <Modal opened={opened} onClose={close} title={`Modifica ${c.name}`} centered>
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