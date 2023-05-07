import {Switch, useMantineColorScheme, useMantineTheme} from '@mantine/core';
import {IconMoonStars, IconSun} from '@tabler/icons-react';

export function ThemeToggle() {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const theme = useMantineTheme();

    return (
        <Switch
            checked={colorScheme === 'dark'}
            color={theme.primaryColor}
            onChange={() => toggleColorScheme()}
            size="lg"
            onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5}/>}
            offLabel={<IconMoonStars color={theme.colors.gray[6]} size="1.25rem" stroke={1.5}/>}
        />
    );
}