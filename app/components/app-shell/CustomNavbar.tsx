import {Navbar, Space} from "@mantine/core";
import {NavbarButton} from "~/components/app-shell/NavbarButton";
import {IconAbacus, IconBook, IconCalendar, IconHome, IconList} from "@tabler/icons-react";

export default function CustomNavbar({opened}: { opened: boolean }) {
    return (
        <Navbar width={{sm: 250}} pt={"2rem"} px={"1rem"} hiddenBreakpoint={"sm"} hidden={!opened}>
            <NavbarButton icon={<IconHome/>} text={'Home'} href={'/dashboard'}/>
            <Space h={"1rem"}/>
            <NavbarButton icon={<IconList/>} text={'Corsi'} href={'/dashboard/courses'}/>
            <Space h={"1rem"}/>
            <NavbarButton icon={<IconAbacus/>} text={'Classi'} href={'/dashboard/classes'}/>
            <Space h={"1rem"}/>
            <NavbarButton icon={<IconBook/>} text={'Studenti'} href={'/dashboard/students'}/>
            <Space h={"1rem"}/>
            <NavbarButton icon={<IconCalendar/>} text={'Anni'} href={'/dashboard/years'}/>
        </Navbar>
    )
}