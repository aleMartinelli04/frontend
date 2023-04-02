import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {Class, SchoolYear} from "~/types/types";
import {getClassesForYear, getCurrentSchoolYear} from "~/api/api";
import {Outlet, useLoaderData} from "@remix-run/react";
import {Container} from "@mantine/core";
import {YearLabel} from "~/components/years/YearLabel";
import {ClassesGrid} from "~/components/classes/ClassesGrid";

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

export default function CoursesForYear() {
    const {year, classes} = useLoaderData<LoaderData>();

    return (
        <Container>
            <YearLabel year={year} before={'Classi'}/>
            <ClassesGrid classes={classes}/>
            <Outlet/>
        </Container>
    )
}