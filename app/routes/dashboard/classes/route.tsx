import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {Class, SchoolYear} from "~/types/types";
import {getClassesForYear, getCurrentSchoolYear} from "~/api/get";
import {Outlet, useLoaderData} from "@remix-run/react";
import {Button, Container, Group, Space} from "@mantine/core";
import {YearLabel} from "~/components/years/YearLabel";
import {ClassesGrid} from "~/components/classes/ClassesGrid";
import {CreateClassModal} from "~/components/modals/CreateClassModal";
import {useDisclosure} from "@mantine/hooks";

type LoaderData = {
    year: SchoolYear,
    classes: Class[]
}

export const loader: LoaderFunction = async () => {
    const year = await getCurrentSchoolYear();
    const classes = await getClassesForYear(year);

    return json<LoaderData>({
        year,
        classes
    });
}

export default function Classes() {
    const {year, classes} = useLoaderData<LoaderData>();
    const [opened, {open, close}] = useDisclosure(false);

    return (
        <>
            <CreateClassModal opened={opened} close={close}/>

            <Container>
                <YearLabel year={year} before={'Classi'}/>
                <ClassesGrid classes={classes}/>

                <Space h={"lg"}/>

                <Group position={"center"}>
                    <Button variant={"outline"} color={"red"} onClick={open}>
                        Crea classe
                    </Button>
                </Group>

                <Outlet/>
            </Container>
        </>
    )
}