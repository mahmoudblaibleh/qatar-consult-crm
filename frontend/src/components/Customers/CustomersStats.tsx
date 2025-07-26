// @ts-nocheck
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Customer } from '../../types';

interface CustomersStatsProps {
    customers: Customer[];
}

const CustomersStats: React.FC<CustomersStatsProps> = ({ customers }) => {
    const getActiveCustomersCount = () => customers.filter(c => c.status === 'ACTIVE').length;
    const getVIPCustomersCount = () => customers.filter(c => c.status === 'VIP').length;
    const getInactiveCustomersCount = () => customers.filter(c => c.status === 'INACTIVE').length;

    const stats = [
        {
            title: 'إجمالي العملاء',
            value: customers.length,
            color: '#8b1538',
            borderColor: '#e0e0e0'
        },
        {
            title: 'عملاء نشطون',
            value: getActiveCustomersCount(),
            color: '#4caf50',
            borderColor: '#4caf50'
        },
        {
            title: 'عملاء مميزون',
            value: getVIPCustomersCount(),
            color: '#f44336',
            borderColor: '#f44336'
        },
        {
            title: 'عملاء غير نشطين',
            value: getInactiveCustomersCount(),
            color: '#9e9e9e',
            borderColor: '#9e9e9e'
        }
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{
                        textAlign: 'center',
                        border: `1px solid ${stat.borderColor}`,
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 12px rgba(139, 21, 56, 0.15)`,
                            transition: 'all 0.3s ease'
                        }
                    }}>
                        <CardContent>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: stat.color,
                                    fontWeight: 'bold',
                                    mb: 1
                                }}
                            >
                                {stat.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {stat.title}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CustomersStats;