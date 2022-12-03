import { Button, Menu, useMantineTheme } from '@mantine/core';
import {
    IconChevronDown,
    IconEdit,
    IconTrash,
} from '@tabler/icons';

export function ActionButton() {
    const theme = useMantineTheme();
    return (
        <Menu transition="pop-top-right" position="top-end" width={220} withinPortal>
            <Menu.Target>
                <Button rightIcon={<IconChevronDown size={18} stroke={1.5} />} pr={12}>
                    Action
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    icon={<IconEdit size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                    onClick={() => console.log("test")}
                >
                    Edit
                </Menu.Item>
                <Menu.Item
                    icon={<IconTrash size={16} color={theme.colors.pink[6]} stroke={1.5} />}

                >
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}