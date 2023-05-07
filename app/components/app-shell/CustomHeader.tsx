import {Burger, Container, Group, Header} from "@mantine/core";

export function CustomHeader({opened, toggle}: { opened: boolean, toggle: () => any }) {
    return (
        <Header height={50}>
            <Container h={"inherit"}>
                <Group position={"right"} h={"inherit"}>
                    <Burger opened={opened} onClick={toggle}/>
                </Group>
            </Container>
        </Header>
    )
}