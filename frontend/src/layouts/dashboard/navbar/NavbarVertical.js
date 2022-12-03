import { useState } from 'react';
import { createStyles, Navbar, Group, Code, Text } from '@mantine/core';
import {
    IconDashboard,
    IconUsers,
    IconLogout,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import { Link } from 'react-router-dom';
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
import { dispatch } from '../../../redux/store';
import { resetAuth } from '../../../redux/slices/authSlice';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        navbar: {
            backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
                .background,
        },

        version: {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
                0.1
            ),
            color: theme.white,
            fontWeight: 700,
        },

        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
                0.1
            )}`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
                0.1
            )}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.white,
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
                    0.1
                ),
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.white,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
                    0.15
                ),
                [`& .${icon}`]: {
                    opacity: 0.9,
                },
            },
        },
    };
});

const data = [
    { link: PATH_DASHBOARD.general.landing, label: 'Dashboard', icon: IconDashboard },
    { link: PATH_DASHBOARD.general.users, label: 'Users', icon: IconUsers },
];


export default function NavbarVertical() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Users');

    const links = data.map((item) => {
        return <Link
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            to={item.link}
            key={item.label}
            onClick={(event) => {
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    }
    );

    const logout = async () => {
        try {
            dispatch(resetAuth())

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Navbar p="md" className={classes.navbar} >
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <MantineLogo size={28} inverted />
                    <Code className={classes.version}>v3.1.2</Code>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>


                <Link className={classes.link} onClick={(event) => logout()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </Link>
            </Navbar.Section>
        </Navbar>
    );
}