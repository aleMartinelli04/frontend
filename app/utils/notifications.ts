import {notifications} from "@mantine/notifications";

export function notify(message: string, color: string, title?: string, autoClose: number | boolean = 4000) {
    notifications.show({
        message: message,
        title: title,
        color: color,
        autoClose: autoClose
    });
}