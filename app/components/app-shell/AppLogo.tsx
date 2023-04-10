import {Image} from "@mantine/core";
import logo from '~/images/logo.png';
import {Link} from "@remix-run/react";

export function AppLogo() {
    return (
        <Link to={"/"}>
            <Image src={logo} alt={"Logo"} width={60}/>
        </Link>
    );
}