import { useState } from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    Container,
    Flex,
    Button,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconUserPlus } from '@tabler/icons';
import { ActionButton } from '../../../components/ActionButton';
import UserModal from './UserModal';

const useStyles = createStyles((theme) => ({
    th: {
        padding: '0 !important',
    },

    control: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },
    feature: {
        position: 'relative',
        paddingTop: theme.spacing.xl,
        paddingLeft: theme.spacing.xl,
    },

    overlay: {
        position: 'absolute',
        height: 100,
        width: 160,
        top: 0,
        left: 0,
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        zIndex: 1,
    },

    content: {
        position: 'relative',
        zIndex: 2,
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
}));

function Th({ children, reversed, sorted, onSort }) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text weight={500} size="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size={14} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

function filterData(data, search) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}

function sortData(
    data,
    payload
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}

export default function Users() {


    const [modalOpen, setModalOpen] = useState(false)

    const data = [
        {
            "name": "Athena Weissnat",
            "company": "Little - Rippin",
            "email": "Elouise.Prohaska@yahoo.com"
        },
        {
            "name": "Deangelo Runolfsson",
            "company": "Greenfelder - Krajcik",
            "email": "Kadin_Trantow87@yahoo.com"
        },
        {
            "name": "Danny Carter",
            "company": "Kohler and Sons",
            "email": "Marina3@hotmail.com"
        },
        {
            "name": "Trace Tremblay PhD",
            "company": "Crona, Aufderhar and Senger",
            "email": "Antonina.Pouros@yahoo.com"
        },
        {
            "name": "Derek Dibbert",
            "company": "Gottlieb LLC",
            "email": "Abagail29@hotmail.com"
        },
        {
            "name": "Viola Bernhard",
            "company": "Funk, Rohan and Kreiger",
            "email": "Jamie23@hotmail.com"
        },
        {
            "name": "Austin Jacobi",
            "company": "Botsford - Corwin",
            "email": "Genesis42@yahoo.com"
        },
        {
            "name": "Hershel Mosciski",
            "company": "Okuneva, Farrell and Kilback",
            "email": "Idella.Stehr28@yahoo.com"
        },
        {
            "name": "Mylene Ebert",
            "company": "Kirlin and Sons",
            "email": "Hildegard17@hotmail.com"
        },
        {
            "name": "Lou Trantow",
            "company": "Parisian - Lemke",
            "email": "Hillard.Barrows1@hotmail.com"
        },
        {
            "name": "Dariana Weimann",
            "company": "Schowalter - Donnelly",
            "email": "Colleen80@gmail.com"
        },
        {
            "name": "Dr. Christy Herman",
            "company": "VonRueden - Labadie",
            "email": "Lilyan98@gmail.com"
        },

    ]
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => (
        <tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.company}</td>
            <td><ActionButton /></td>
        </tr>
    ));
    const { classes, cx } = useStyles();

    return (
        <>
            <Container fluid py={'xl'}>
                <Flex
                    pb={'xl'}
                    pr={'lg'}
                    direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                    justify={{ sm: 'space-between' }}
                >
                    <Text weight={700} size="xl" mb="xs" mt={5} className={classes.title}>
                        {"Users"}
                    </Text>
                    <Button
                        onClick={() => setModalOpen(true)}
                        rightIcon={<IconUserPlus size={18} stroke={1.5} />}>Add</Button>
                </Flex>
                <ScrollArea>
                    <TextInput
                        placeholder="Search by any field"
                        mb="md"
                        icon={<IconSearch size={14} stroke={1.5} />}
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <Table
                        horizontalSpacing="md"
                        verticalSpacing="xs"
                        sx={{ tableLayout: 'fixed', minWidth: 700 }}
                    >
                        <thead>
                            <tr>
                                <Th
                                    sorted={sortBy === 'name'}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting('name')}
                                >
                                    Name
                                </Th>
                                <Th
                                    sorted={sortBy === 'email'}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting('email')}
                                >
                                    Email
                                </Th>
                                <Th
                                    sorted={sortBy === 'company'}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting('company')}
                                >
                                    Company
                                </Th>
                                <Th>
                                    Action
                                </Th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length > 0 ? (
                                rows

                            ) : (
                                <tr>
                                    <td colSpan={Object.keys(data[0]).length}>
                                        <Text weight={500} align="center">
                                            Nothing found
                                        </Text>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </ScrollArea>
                {modalOpen && <UserModal show={modalOpen} handleClose={() => setModalOpen(false)} />}

            </Container>
        </>
    );
}