import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ErrorBoundary from './ErrorBoundary';
import { AppBar, Box, Divider, Toolbar } from '@mui/material';

const ServiceApp1 = React.lazy(() => import('service1/Service1'));
const ServiceApp2 = React.lazy(() => import('service2/Service2'));

export default function App() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 5, position: 'relative' }}>
            <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                    <AppBar component={'nav'} position="relative">
                        <Toolbar>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                                Host Service
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <React.Suspense fallback={<div>Loading Remote App...</div>}>
                        <ErrorBoundary>
                            <ServiceApp1 />
                        </ErrorBoundary>
                    </React.Suspense>
                    <Divider/>
                    <React.Suspense fallback={<div>Loading Remote App...</div>}>
                        <ErrorBoundary>
                            <ServiceApp2/>
                        </ErrorBoundary>
                    </React.Suspense>
                </CardContent>
            </Card>
        </Box>
    );
}