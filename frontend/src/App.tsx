// src/App.tsx
// @ts-nocheck
import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { qatarTheme } from './theme/qatarTheme';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import CustomersPage from './components/Customers/CustomersPage';
import LawyersList from './components/Lawyers/LawyersList';
import BusinessUsersList from './components/BusinessUsers/BusinessUsersList';
import TasksList from './components/Tasks/TasksList';
import { Customer } from './types';

const drawerWidth = 280;

function App() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState('dashboard');

    // Customer navigation state
    const [customerView, setCustomerView] = useState<'list' | 'add' | 'edit'>('list');
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (pageId: string) => {
        setSelectedPage(pageId);
        // Reset customer view when switching pages
        if (pageId !== 'customers') {
            setCustomerView('list');
            setEditingCustomer(null);
        }
    };

    const handleCustomerNavigation = (view: 'list' | 'add' | 'edit', customer?: Customer) => {
        setCustomerView(view);
        setEditingCustomer(customer || null);
    };

    const renderPage = () => {
        switch (selectedPage) {
            case 'dashboard':
                return <Dashboard />;
            case 'customers':
                return (
                    <CustomersPage
                        currentView={customerView}
                        editingCustomer={editingCustomer}
                        onNavigate={handleCustomerNavigation}
                    />
                );
            case 'lawyers':
                return <LawyersList />;
            case 'business-users':
                return <BusinessUsersList />;
            case 'tasks':
                return <TasksList />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <ThemeProvider theme={qatarTheme}>
            <Box sx={{ display: 'flex', direction: 'rtl' }}>
                <CssBaseline />

                <Header
                    drawerWidth={drawerWidth}
                    onDrawerToggle={handleDrawerToggle}
                />

                <Sidebar
                    drawerWidth={drawerWidth}
                    mobileOpen={mobileOpen}
                    onDrawerToggle={handleDrawerToggle}
                    selectedPage={selectedPage}
                    onMenuClick={handleMenuClick}
                />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        minHeight: '100vh',
                        backgroundColor: '#f8f9fa',
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        marginRight: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Box sx={{ height: '64px' }} />
                    {renderPage()}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;