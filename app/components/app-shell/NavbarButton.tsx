import {Button} from "@mantine/core";
import {Link, useLocation} from "@remix-run/react";
import React from "react";

export function NavbarButton({icon, text, href}: {
    icon: JSX.Element,
    text: string,
    href: string,
}) {
    const path = useLocation().pathname;
    const isCurrentPage = href === '/dashboard' ? href === path : path.startsWith(href);

    const color = isCurrentPage ? 'red' : 'gray';
    const variant = isCurrentPage ? 'outline' : 'subtle';

    return (
        <Link to={href}>
            <Button color={color}
                    radius="md"
                    variant={variant}
                    leftIcon={icon}
                    fullWidth>
                {text}
            </Button>
        </Link>
    );
}