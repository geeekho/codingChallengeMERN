import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Paper,
    Group,
    Button,
    Anchor,
    Checkbox,
    Container,
    Stack,
    Text,
    Title,
    createStyles,
} from '@mantine/core';
import React, { useState } from 'react'
import "./style.css"
import { dispatch } from '../../../redux/store';
import { login } from '../../../redux/slices/authSlice';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 900,
        width: '100%',
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },

    form: {
        borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
        minHeight: 900,
        maxWidth: 450,
        paddingTop: 80,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export default function Login() {

    const { classes } = useStyles();


    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (val) => (val.length < 4 ? 'Password should include at least 4 characters' : null),
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log(data);
            dispatch(login(data))

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    Welcome back !
                </Title>

                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                    <Stack>


                        <TextInput
                            label="Email"
                            placeholder="Email"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                        />

                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 4 characters'}
                        />


                    </Stack>
                    <Group position="apart" mt="xl">

                        <Button type="submit" fullWidth mt="xl" size="md">Login</Button>
                    </Group>

                </form>

            </Paper>
        </div>
    );
}