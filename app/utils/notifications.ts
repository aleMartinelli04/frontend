import {notifications} from "@mantine/notifications";

export function notify(message: string, title?: string, color: string = "red", autoClose: number | boolean = 4000) {
    notifications.show({
        message: message,
        title: title,
        color: color,
        autoClose: autoClose
    });
}