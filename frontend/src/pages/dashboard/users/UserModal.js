import { Box, Button, Center, Checkbox, Group, Modal, PasswordInput, Progress, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React from 'react'
import { addEmployee } from '../../../redux/slices/employeesSlice';
import { useDispatch } from '../../../redux/store';


export default function UserModal({ handleUpdate, show, handleClose }) {



    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            role: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            name: (val) => (val.length < 4 ? 'Name should include at least 4 characters' : null
            ),
            role: (val) =>
            (val.length < 4 ? 'Name should include at least 4 characters' : null
            ),
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log(data);
            dispatch(addEmployee(data)).then(async (res) => {
                await handleUpdate();
                handleClose()
            })

            //
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            centered
            opened={show}
            onClose={handleClose}
            title="Add Employee"
        >
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    mt="sm"
                    label="Name"
                    placeholder="John"
                    value={form.values.name}
                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                    error={form.errors.name && 'Invalid name'}
                />
                <TextInput
                    mt="sm"
                    label="Email"
                    placeholder="hello@test.dev"
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    error={form.errors.email && 'Invalid email'}
                />
                <TextInput
                    mt="sm"
                    label="Role"
                    placeholder="Developer"
                    value={form.values.role}
                    onChange={(event) => form.setFieldValue('role', event.currentTarget.value)}
                    error={form.errors.role && 'Invalid role'}
                />



                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>
    )
}