// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Card, CardContent,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Chip
} from '@mui/material';
import {
    Person as PersonIcon,
    Gavel as GavelIcon,
    Business as BusinessIcon,
    Assignment as AssignmentIcon
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
    const [apiData, setApiData] = useState<any>(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/health')
            .then(res => res.json())
            .then(data => {
                console.log('API Connected:', data);
                setApiData(data);
            })
            .catch(err => console.error('API Error:', err));
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#8b1538' }}>
                    لوحة التحكم
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    مرحباً بك في نظام إدارة العملاء - القنصلية العامة لدولة قطر في إسطنبول
                </Typography>
                {apiData && (
                    <Chip
                        label={`API متصل: ${apiData.message}`}
                        color="success"
                        sx={{ mt: 1 }}
                    />
                )}
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ background: '#8b1538', color: 'white', '&:hover': { transform: 'translateY(-2px)' } }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Box sx={{ fontSize: '2rem', mb: 2 }}><PersonIcon /></Box>
                            <Typography variant="h3" component="div" sx={{ mb: 1 }}>247</Typography>
                            <Typography variant="body2">إجمالي العملاء</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ background: '#8b1538', color: 'white', '&:hover': { transform: 'translateY(-2px)' } }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Box sx={{ fontSize: '2rem', mb: 2 }}><GavelIcon /></Box>
                            <Typography variant="h3" component="div" sx={{ mb: 1 }}>18</Typography>
                            <Typography variant="body2">المحامون</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ background: '#8b1538', color: 'white', '&:hover': { transform: 'translateY(-2px)' } }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Box sx={{ fontSize: '2rem', mb: 2 }}><BusinessIcon /></Box>
                            <Typography variant="h3" component="div" sx={{ mb: 1 }}>52</Typography>
                            <Typography variant="body2">مستخدمو الأعمال</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ background: '#8b1538', color: 'white', '&:hover': { transform: 'translateY(-2px)' } }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Box sx={{ fontSize: '2rem', mb: 2 }}><AssignmentIcon /></Box>
                            <Typography variant="h3" component="div" sx={{ mb: 1 }}>89</Typography>
                            <Typography variant="body2">المهام النشطة</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Recent Tasks Table */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: '#8b1538' }}>
                        المهام الأخيرة
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>المهمة</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>العميل</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>المحامي</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>الحالة</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>التاريخ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[
                                    {
                                        task: 'مراجعة العقد التجاري',
                                        client: 'شركة الخليج للتجارة',
                                        lawyer: 'أحمد محمد',
                                        status: 'قيد التنفيذ',
                                        date: '2024-07-25'
                                    },
                                    {
                                        task: 'استشارة قانونية',
                                        client: 'محمد علي',
                                        lawyer: 'فاطمة أحمد',
                                        status: 'جديد',
                                        date: '2024-07-24'
                                    },
                                    {
                                        task: 'صياغة اتفاقية شراكة',
                                        client: 'مؤسسة النور',
                                        lawyer: 'خالد حسن',
                                        status: 'مكتمل',
                                        date: '2024-07-23'
                                    }
                                ].map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.task}</TableCell>
                                        <TableCell>{row.client}</TableCell>
                                        <TableCell>{row.lawyer}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.status}
                                                color={row.status === 'مكتمل' ? 'success' : row.status === 'قيد التنفيذ' ? 'warning' : 'info'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{row.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;