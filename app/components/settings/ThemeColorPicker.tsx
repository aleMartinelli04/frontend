import {Center, SimpleGrid, useMantineTheme} from "@mantine/core";
import {useColor} from "~/components/settings/ColorProvider";
import {IconCheck} from "@tabler/icons-react";

const colors = ["red", "orange", "yellow", "lime", "green", "teal", "cyan", "blue", "indigo", "violet", "pink", "gray"];


export function ThemeColorPicker() {
    const theme = useMantineTheme();
    const {primaryColor, selectColor} = useColor();

    const colorSquares = [];

    for (const colorName of colors) {
        const sameColor = colorName === primaryColor;

        colorSquares.push(
            <Center
                key={colorName}
                style={{
                    backgroundColor: theme.colors[colorName][sameColor ? 9 : 5],
                    width: 50,
                    height: 50,
                    borderRadius: 5,
                    cursor: "pointer",
                }}
                onClick={() => {
                    console.log("SETTING TO " + colorName);
                    selectColor(colorName);
                    console.log(primaryColor);
                }}>
                {sameColor && <IconCheck size={30}/>}
            </Center>
        );
    }

    return (
        <Center>
            <SimpleGrid cols={6} bg={theme.colorScheme} p={"sm"} style={{borderRadius: 5}}>
                {colorSquares}
            </SimpleGrid>
        </Center>
    );
}