import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData} from "@remix-run/react";
import type {LoaderArgs, MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useState} from "react";
import type {ColorScheme} from "@mantine/core";
import {ColorSchemeProvider, MantineProvider} from "@mantine/core";
import file from "~/styles/main.css";
import cookie from 'cookie';
import Cookies from 'js-cookie';
import {StylesPlaceholder} from "@mantine/remix";
import {Notifications} from "@mantine/notifications";
import {ColorProvider} from "~/components/settings/ColorProvider";

export const meta: MetaFunction = () => ({
    charset: 'utf-8', title: 'Presenze corsi', viewport: 'width=device-width,initial-scale=1',
});

export const links = () => [{
    rel: 'stylesheet', href: file
}];

export async function loader({request}: LoaderArgs) {
    const cookies = request.headers.get("Cookie");
    const parsedCookies = cookie.parse(cookies || '');

    return json({
        theme: parsedCookies.theme || 'light', color: parsedCookies.color || 'red'
    });
}

export default function App() {
    const {theme, color} = useLoaderData<{ theme: ColorScheme, color: string }>();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(theme);
    const [primaryColor, setPrimaryColor] = useState<string>(color);

    const toggleColorScheme = (value?: ColorScheme) => {
        const newColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');

        setColorScheme(newColorScheme);
        Cookies.set('theme', newColorScheme, {path: '/', expires: 365});
    };

    const selectColor = (color: string) => {
        setPrimaryColor(color);
        Cookies.set('color', color, {path: '/', expires: 365});
    }

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme, primaryColor}}>
                <ColorProvider color={primaryColor} setColor={selectColor}>
                    <html lang="en">
                    <head>
                        <StylesPlaceholder/>
                        <Meta/>
                        <Links/>
                    </head>
                    <body>

                    <Outlet/>

                    <Notifications limit={3}/>
                    <ScrollRestoration/>
                    <Scripts/>
                    <LiveReload/>
                    </body>
                    </html>
                </ColorProvider>
            </MantineProvider>
        </ColorSchemeProvider>);
}