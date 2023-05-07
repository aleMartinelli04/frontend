import CustomNavbar from "~/components/app-shell/CustomNavbar";
import {AppShell} from "@mantine/core";
import {CustomHeader} from "~/components/app-shell/CustomHeader";
import type {ReactNode} from "react";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";

export function CustomAppShell({children}: { children: ReactNode }) {
    const [opened, {toggle, close}] = useDisclosure(false);
    const isSmallScreen = useMediaQuery('(max-width: 767px)');

    if (isSmallScreen) {
        return (
            <AppShell
                padding="sm"
                header={<CustomHeader opened={opened} toggle={toggle}/>}
                navbar={<CustomNavbar opened={opened} close={close}/>}
            >
                {children}
            </AppShell>
        );
    }

    return (
        <AppShell
            padding="sm"
            navbar={<CustomNavbar opened={opened} close={close}/>}
        >
            {children}
        </AppShell>
    );
}