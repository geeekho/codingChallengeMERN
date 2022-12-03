import { Outlet } from 'react-router-dom';

// config
import { HEADER } from '../../config';
//
import NavbarVertical from './navbar/NavbarVertical';
import { Box, Grid } from '@mantine/core';


// ----------------------------------------------------------------------

export default function DashboardLayout() {

    return (
        <>
            <Grid grow  >
                <Grid.Col span={1}><NavbarVertical /></Grid.Col>
                <Grid.Col span={9}>
                    <Box
                        component="main"
                        sx={{
                            px: { lg: 6 },
                            pt: {
                                xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
                                lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
                            },
                            pb: {
                                xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
                                lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
                            },
                        }}
                    >
                        <Outlet />
                    </Box>
                </Grid.Col>
            </Grid>


        </>
    );
}