import {Button} from "@mantine/core";
import {Link, useLocation} from "@remix-run/react";
import React from "react";

export function NavbarButton({icon, text, href, onClick}: {
    icon: JSX.Element,
    text: string,
    href: string,
    onClick: () => any
}) {
    const path = useLocation().pathname;
    const isCurrentPage = href === '/dashboard' ? href === path : path.startsWith(href);

    const color = isCurrentPage ? 'red' : 'gray';
    const variant = isCurrentPage ? 'outline' : 'subtle';

    return (
        <Button
            component={Link}
            to={href}
            color={color}
            radius="md"
            variant={variant}
            leftIcon={icon}
            onClick={onClick}
            fullWidth>
            {text}
        </Button>
    );
}