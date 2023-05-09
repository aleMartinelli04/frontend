import {errCodes} from "~/utils/err-codes";

const BASE_URL = 'http://localhost';
const PORT = 4040;

const URL_PORT = BASE_URL + ':' + PORT;

function getURL(path: string): string {
    return URL_PORT + path;
}

export async function request(path: string, init?: RequestInit) {
    const response = await fetch(getURL(path), init);

    if (response.status !== 200) {
        const {err} = await response.json() as { err: string };
        throw new Error(errCodes(err));
    }

    return await response.json();
}