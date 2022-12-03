import { useEffect, useState } from 'react';
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
    Loader
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconUserPlus } from '@tabler/icons';
import { ActionButton } from '../../../components/ActionButton';
import UserModal from './UserModal';
import { dispatch } from '../../../redux/store';
import { getEmployees } from '../../../redux/slices/employeesSlice';
import useEmployee from '../../../hooks/useEmployee';

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
    const [updateData, setUpdateData] = useState(true)

    const { isLoading, employees } = useEmployee();

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(employees);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(employees, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(employees, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => {
        console.log("setting rows");
        console.log(sortedData);
        return <tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
            <td><ActionButton /></td>
        </tr>
    });
    const { classes } = useStyles();

    useEffect(() => {

        if (updateData) {
            console.log("fetching employees");
            dispatch(getEmployees()).then(() => {
                setUpdateData(false)
                setSortedData(employees)
            });
        }


    }, [updateData, employees])


    const handleUpdate = async () => {
        console.log("cue");
        setUpdateData(true);

    };

    if (isLoading)
        return <Loader size="xl" />

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
                                    sorted={sortBy === 'role'}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting('role')}
                                >
                                    Role
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
                                    <td colSpan={employees?.length > 0 ? Object.keys(employees[0]).length : 0}>
                                        <Text weight={500} align="center">
                                            Nothing found
                                        </Text>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </ScrollArea>
                {modalOpen && <UserModal handleUpdate={() => handleUpdate()} show={modalOpen} handleClose={() => setModalOpen(false)} />}

            </Container>
        </>
    );
}