import {CustomAppShell} from "~/components/app-shell/CustomAppShell";
import {Outlet} from "@remix-run/react";
import {Button, Container} from "@mantine/core";
import {createCurrentYear} from "~/api/create";

export default function Route() {
    return (
        <CustomAppShell>
            <Outlet/>
        </CustomAppShell>
    );
}

export function ErrorBoundary({error}: { error: Error }) {
    const createYear = async () => {
        await createCurrentYear();

        window.location.href = '/dashboard';
    }

    return (
        <CustomAppShell>
            <Container size="xs">
                <h1>Errore</h1>
                {error.message}
                <Button variant={"filled"} onClick={createYear}>Crea l'anno scolastico corrente</Button>
            </Container>
        </CustomAppShell>
    );
}