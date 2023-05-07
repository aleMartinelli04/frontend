import type {SchoolYear} from "~/types/types";
import {Text, useMantineTheme} from "@mantine/core";

export function YearLabel({year, before}: { year: SchoolYear, before?: string }) {
    const theme = useMantineTheme();

    if (before === undefined) before = '';

    return (
        <h1>
            {before} Anno Scolastico <Text span
                                           color={theme.primaryColor}>{year.start_year}/{year.start_year + 1}</Text>
        </h1>
    );
}