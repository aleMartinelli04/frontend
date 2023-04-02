import {Image} from "@mantine/core";
import logo from '~/images/logo.png';
import {Link} from "@remix-run/react";

export function AppLogo() {
    return (
        <Link to={"/dashboard"}>
            <Image src={logo} alt={"Logo"} height={60} width={60}/>
        </Link>
    );
}