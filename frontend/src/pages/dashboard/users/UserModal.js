import { Box, Button, Center, Checkbox, Group, Modal, PasswordInput, Progress, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons';
import React from 'react'
import { useDispatch } from '../../../redux/store';

function PasswordRequirement({ meets, label }) {
    return (
        <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
            <Center inline>
                {meets ? <IconCheck size={14} stroke={1.5} /> : <IconX size={14} stroke={1.5} />}
                <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
    let multiplier = password.length > 4 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export default function UserModal({ show, handleClose }) {



    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length < 4 ? 'Password should include at least 4 characters' :

                ! /[0-9]/.test(val) ? 'Must Include numbers' :
                    ! /[a-z]/.test(val) ? 'Must Include lowercase letter' :
                        ! /[A-Z]/.test(val) ? 'Must Include uppercase letter' :
                            ! /[$&+,:;=?@#|'<>.^*()%!-]/.test(val) ? 'Must Include special symbol' : null
            ),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
        },
    });

    const strength = getStrength(form.values.password);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(form.values.password)} />
    ));
    const bars = Array(5)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{ bar: { transitionDuration: '0ms' } }}
                value={
                    form.values.password.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 5) * 100 ? 100 : 0
                }
                color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
                key={index}
                size={5}
            />
        ));

    const onSubmit = async (data) => {
        try {
            // dispatch(setBase(data.base))
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            centered
            opened={show}
            onClose={handleClose}
            title="Add User"
        >
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    mt="sm"
                    label="Email"
                    placeholder="hello@test.dev"
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    error={form.errors.email && 'Invalid email'}
                />
                <>
                    <PasswordInput
                        mt="sm"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Invalid password'}
                        placeholder="Your password"
                        label="Password"
                    />


                    <Group spacing={5} grow mt="xs" mb="md">
                        {bars}
                    </Group>

                    <PasswordRequirement label="Has at least 4 characters" meets={form.values.password.length > 4} />
                    {checks}
                </>
                <PasswordInput
                    mt="sm"
                    label="Confirm password"
                    placeholder="Confirm password"
                    {...form.getInputProps('confirmPassword')}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>
    )
}