import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData} from "@remix-run/react";
import type {LoaderArgs, MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useState} from "react";
import type {ColorScheme} from "@mantine/core";
import {ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {StylesPlaceholder} from "@mantine/remix";
import file from "~/styles/main.css";
import cookie from 'cookie';
import Cookies from 'js-cookie';
import {Notifications} from "@mantine/notifications";

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Presenze corsi',
    viewport: 'width=device-width,initial-scale=1',
});

export const links = () => [
    {
        rel: 'stylesheet',
        href: file
    }
];

export async function loader({request}: LoaderArgs) {
    const cookies = request.headers.get("Cookie");
    const parsedCookies = cookie.parse(cookies || '');

    return json({
        theme: parsedCookies.theme || 'light'
    });
}

export default function App() {
    const {theme} = useLoaderData<{ theme: ColorScheme }>();
    const [colorScheme, setColorScheme] = useState<ColorScheme>(theme || Cookies.get('theme') || 'light');

    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
        Cookies.set('theme',
            value || (colorScheme === 'dark' ? 'light' : 'dark'),
            {path: '/', expires: 365});
    };

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: colorScheme}}>
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
            </MantineProvider>
        </ColorSchemeProvider>
    );
}