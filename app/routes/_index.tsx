import {redirect} from "@remix-run/node";
import Cookies from "js-cookie";

export const loader = async () => {
    let theme = Cookies.get("theme");

    if (!theme) {
        theme = "light";
    }

    return redirect("/dashboard", {
        headers: {
            "Set-Cookie": theme
        }
    });
}