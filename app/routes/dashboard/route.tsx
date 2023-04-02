import {CustomAppShell} from "~/components/app-shell/CustomAppShell";
import {Outlet} from "@remix-run/react";
import {Container, Text} from "@mantine/core";

export default function Route() {
    return (
        <CustomAppShell>
            <Outlet/>
        </CustomAppShell>
    );
}

export function ErrorBoundary({error}: { error: Error }) {
    return (
        <CustomAppShell>
            <Container>
                <h1>Oh no!</h1>
                <Text>Erorre riscontrato: {error.message}</Text>
            </Container>
        </CustomAppShell>
    );
}