import {Navbar, Space} from "@mantine/core";
import {NavbarButton} from "~/components/app-shell/NavbarButton";
import {IconAbacus, IconBook, IconCalendar, IconHome, IconList, IconSettings} from "@tabler/icons-react";

export default function CustomNavbar({opened, close}: { opened: boolean, close: () => any }) {
    return (
        <Navbar width={{sm: 250}} pt={"2rem"} px={"1rem"} hiddenBreakpoint={"sm"} hidden={!opened}>
            <NavbarButton icon={<IconHome/>} text={'Home'} href={'/dashboard'} onClick={close}/>
            <Space h={"1rem"}/>
            <NavbarButton icon={<IconList/>} text={'Corsi'} href={'/dashboard/courses'} onClick={close}/>
            <Space h={"1rem"}/>
            <NavbarButton icon={<IconAbacus/>} text={'Classi'} href={'/dashboard/classes'} onClick={close}/>
            <Space h={"1rem"}/>
            <NavbarButton icon={<IconBook/>} text={'Studenti'} href={'/dashboard/students'} onClick={close}/>
            <Space h={"1rem"}/>
            <NavbarButton icon={<IconCalendar/>} text={'Anni'} href={'/dashboard/years'} onClick={close}/>
            <Space h={"1rem"}/>
            <NavbarButton icon={<IconSettings/>} text={'Impostazioni'} href={'/dashboard/settings'} onClick={close}/>
        </Navbar>
    )
}