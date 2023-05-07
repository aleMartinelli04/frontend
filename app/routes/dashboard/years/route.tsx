import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {SchoolYear} from "~/types/types";
import {getPastRecap} from "~/api/get";
import {useLoaderData} from "@remix-run/react";
import {Container} from "@mantine/core";
import {YearsAccordion} from "~/components/years/YearsAccordion";

type LoaderData = {
    years: SchoolYear[]
}

export const loader: LoaderFunction = async () => {
    return json<LoaderData>({
        years: await getPastRecap()
    });
}

export default function PastYears() {
    const {years} = useLoaderData<LoaderData>();

    return (
        <Container>
            <YearsAccordion years={years}/>
        </Container>
    );
}