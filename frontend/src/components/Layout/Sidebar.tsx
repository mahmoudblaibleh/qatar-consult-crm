import React from 'react';
import {
    Box, Drawer, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Typography
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Person as PersonIcon,
    Gavel as GavelIcon,
    Business as BusinessIcon,
    Assignment as AssignmentIcon,
    Assessment as ReportsIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import { MenuItem } from '../../types';

interface SidebarProps {
    drawerWidth: number;
    mobileOpen: boolean;
    onDrawerToggle: () => void;
    selectedPage: string;
    onMenuClick: (pageId: string) => void;
}

const menuItems: MenuItem[] = [
    { id: 'dashboard', text: 'لوحة التحكم', icon: <DashboardIcon /> },
    { id: 'customers', text: 'العملاء', icon: <PersonIcon /> },
    { id: 'lawyers', text: 'المحامون', icon: <GavelIcon /> },
    { id: 'business-users', text: 'مستخدمو الأعمال', icon: <BusinessIcon /> },
    { id: 'tasks', text: 'المهام', icon: <AssignmentIcon /> },
    { id: 'reports', text: 'التقارير', icon: <ReportsIcon /> },
    { id: 'settings', text: 'الإعدادات', icon: <SettingsIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({
                                             drawerWidth,
                                             mobileOpen,
                                             onDrawerToggle,
                                             selectedPage,
                                             onMenuClick
                                         }) => {
    const drawer = (
        <Box>
            {/* Logo Section */}
            <Box sx={{ textAlign: 'center', py: 3 }}>
                <Box
                    sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 2,
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 4px 15px rgba(139, 21, 56, 0.3)',
                        border: '2px solid rgba(255,255,255,0.2)'
                    }}
                >
                    <img
                        src="/logo/qatar-emblem.png"
                        alt="Qatar Emblem"
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'contain',
                            filter: 'brightness(0) invert(1)' // Makes it white if needed
                        }}
                    />
                </Box>

                <Typography variant="body1" sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: 1.4,
                    mb: 0.5
                }}>
                    القنصلية العامة لدولة قطر في
                </Typography>
                <Typography variant="body1" sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: 1.4,
                    mb: 1
                }}>
                    إسطنبول - الجمهورية التركية
                </Typography>
                <Typography variant="body2" sx={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '11px'
                }}>
                    نظام إدارة العملاء القانوني
                </Typography>
            </Box>

            {/* Menu Items */}
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton
                            selected={selectedPage === item.id}
                            onClick={() => onMenuClick(item.id)}
                            sx={{ px: 3 }}
                        >
                            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                anchor="right"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
