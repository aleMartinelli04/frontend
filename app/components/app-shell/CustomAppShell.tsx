import CustomNavbar from "~/components/app-shell/CustomNavbar";
import {AppShell} from "@mantine/core";
import {CustomHeader} from "~/components/app-shell/CustomHeader";
import type {ReactNode} from "react";
import {useState} from "react";

export function CustomAppShell({children}: { children: ReactNode }) {
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            padding="sm"
            header={<CustomHeader opened={opened} setOpened={setOpened}/>}
            navbar={<CustomNavbar opened={opened}/>}
        >
            {children}
        </AppShell>
    );
}