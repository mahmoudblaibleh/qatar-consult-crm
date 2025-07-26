import { createTheme } from '@mui/material/styles';

export const qatarTheme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#8b1538',
            light: '#a01847',
            dark: '#722030',
        },
        secondary: {
            main: '#ffffff',
        },
        background: {
            default: '#f8f9fa',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Cairo, Arial, sans-serif',
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: 'linear-gradient(135deg, #8b1538 0%, #722030 50%, #5a1a28 100%)',
                    color: 'white',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        transform: 'translateX(5px)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        borderRight: '4px solid white',
                    },
                },
            },
        },
    },
});
