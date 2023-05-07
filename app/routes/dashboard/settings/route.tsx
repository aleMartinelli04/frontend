import {Container} from "@mantine/core";
import {ThemeToggle} from "~/components/settings/ThemeToggle";
import {ThemeColorPicker} from "~/components/settings/ThemeColorPicker";

export default function DashboardSettingsRoute() {
    return (
        <Container>
            <h1>Impostazioni</h1>

            <Container>
                <h3>Tema</h3>
                <ThemeToggle/>

                <h3>Colore</h3>
                <ThemeColorPicker/>
            </Container>
        </Container>
    );
}