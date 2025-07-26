import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

interface HeaderProps {
    drawerWidth: number;
    onDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ drawerWidth, onDrawerToggle }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                bgcolor: 'white',
                color: 'text.primary',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                right: { sm: `${drawerWidth}px` },
                left: 0,
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ color: '#8b1538', fontSize: '16px' }}>
                    القنصلية العامة لدولة قطر في إسطنبول - الجمهورية التركية
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;