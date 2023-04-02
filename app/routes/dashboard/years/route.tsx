import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {SchoolYear} from "~/types/types";
import {getSchoolYears} from "~/api/api";
import {useLoaderData} from "@remix-run/react";
import {Container} from "@mantine/core";
import {YearAccordion} from "~/components/years/YearAccordion";

type LoaderData = {
    years: SchoolYear[]
}

export const loader: LoaderFunction = async () => {
    return json<LoaderData>({
        years: await getSchoolYears()
    });
}

export default function PastYears() {
    const {years} = useLoaderData<LoaderData>();

    return (
        <Container>
            <YearAccordion years={years}/>
        </Container>
    )
}