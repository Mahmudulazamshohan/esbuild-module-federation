import * as React from 'react';
import { Container, Alert } from '@mui/material';

interface ErrorBoundaryProps {
    children: JSX.Element;
    serviceName?: string;
};

interface ErrorBoundaryState {
    hasError: boolean;
    message?: string;
};

export default class ErrorBoundary
    extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: any) {
        super(props);
        this.state = { hasError: false, message: '' };
    }

    static getDerivedStateFromError(error: any) {
        return {
            hasError: true,
            message: error?.message || '',
        };
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
                   {this.state?.hasError && (
                            <Alert style={{ marginTop: 10 }} variant="filled" severity="error">{this.state.message}</Alert>
                        )}
                </Container>
            );
        }

        return this.props.children;
    }
};