import {Burger, Center, Container, Header, MediaQuery} from "@mantine/core";
import {ThemeToggle} from "~/components/app-shell/ThemeToggle";
import {AppLogo} from "~/components/app-shell/AppLogo";

export function CustomHeader({opened, setOpened}: { opened: boolean, setOpened: any }) {
    return (
        <Header height={90}>
            <Container fluid h={"inherit"} px={30}>
                <Center h={"inherit"} style={{display: "flex", justifyContent: "space-between"}}>
                    <AppLogo/>
                    <Center h={"inherit"} style={{display: "flex"}}>
                        <ThemeToggle/>
                        <MediaQuery largerThan={"sm"} styles={{display: "none"}}>
                            <Burger opened={opened} onClick={() => setOpened((o: boolean) => !o)} size={"md"} ml={20}/>
                        </MediaQuery>
                    </Center>
                </Center>
            </Container>
        </Header>
    )
}