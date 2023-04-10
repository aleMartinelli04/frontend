import type {Class, Student} from "~/types/types";
import {UpdateStudentModal} from "~/components/modals/UpdateStudentModal";
import {Checkbox, rem} from "@mantine/core";
import {IconPencil, IconTrash} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {deleteStudent} from "~/api/delete";
import {notify} from "~/utils/notifications";

export function StudentRow({student, editable, deletable, withCheckbox, selected, classes, setSelected}: {
    student: Student,
    deletable?: boolean,
    editable?: boolean,
    withCheckbox?: boolean
    setSelected?: (selected: number[]) => void,
    selected?: number[],
    classes?: Class[]
}) {
    const [opened, {open, close}] = useDisclosure(false);

    const del = async () => {
        try {
            await deleteStudent(student);
            window.location.reload();
        } catch (e) {
            const {message} = e as Error;
            notify(message, 'Errore');
        }
    }

    return (
        <>
            {editable && classes &&
                <UpdateStudentModal opened={opened} close={close} classes={classes} student={student}
                                    key={student.id + 'M'}/>}

            <tr key={student.id + 'R'}>
                {withCheckbox && selected && setSelected && (
                    <td style={{width: rem(40)}}>
                        <Checkbox
                            checked={selected.includes(student.id)}
                            onChange={(event) => {
                                if (event.currentTarget.checked) {
                                    setSelected([...selected, student.id]);
                                } else {
                                    setSelected(selected.filter((id) => id !== student.id));
                                }
                            }}
                        />
                    </td>
                )}
                {editable && (
                    <td style={{width: rem(40)}}>
                        <IconPencil size="0.9rem" stroke={1.5} onClick={open}/>
                    </td>
                )}
                {deletable && (
                    <td style={{width: rem(40)}}>
                        <IconTrash size="0.9rem" stroke={1.5} onClick={del}/>
                    </td>
                )}
                <td>{student.id}</td>
                <td>{student.surname}</td>
                <td>{student.name}</td>
                <td>{student.class?.name}</td>
            </tr>
        </>
    )
}