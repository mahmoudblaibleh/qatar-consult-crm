// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Card, CardContent, Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Customer } from '../../types';
import CustomersTable from './CustomersTable';
import CustomersStats from './CustomersStats';

interface CustomersListProps {
    onAddCustomer: () => void;
    onEditCustomer: (customer: Customer) => void;
}

const CustomersList: React.FC<CustomersListProps> = ({
                                                         onAddCustomer,
                                                         onEditCustomer
                                                     }) => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            // Comment out API call for now - using mock data only
            // const response = await fetch('http://localhost:3001/api/customers');
            // const data = await response.json();

            // if (data.customers && data.customers.length > 0) {
            //     setCustomers(data.customers);
            // } else {
            // Mock data for demo - Updated with Turkey and Qatar addresses
            setCustomers([
                {
                    id: '1',
                    name: 'محمد علي أحمد',
                    email: 'mohammed.ali@email.com',
                    phone: '+974 5555 1234',
                    turkeyAddress: 'شارع إستقلال، بيوغلو، إسطنبول، تركيا',
                    qatarAddress: 'شارع الكورنيش، الدوحة، قطر',
                    notes: 'عميل مهم - يحتاج متابعة خاصة',
                    status: 'VIP',
                    createdAt: '2024-01-15'
                },
                {
                    id: '2',
                    name: 'سارة حسن محمد',
                    email: 'sara.hassan@email.com',
                    phone: '+974 5555 5678',
                    turkeyAddress: 'شارع باغدات، كاديكوي، إسطنبول، تركيا',
                    qatarAddress: 'حي الريان، الريان، قطر',
                    notes: 'عميل جديد',
                    status: 'ACTIVE',
                    createdAt: '2024-02-20'
                },
                {
                    id: '3',
                    name: 'خالد أحمد الكعبي',
                    email: 'khalid.kaabi@email.com',
                    phone: '+974 5555 9999',
                    turkeyAddress: 'منطقة بشكتاش، إسطنبول، تركيا',
                    qatarAddress: 'مدينة لوسيل، لوسيل، قطر',
                    notes: 'عميل شركات كبير',
                    status: 'VIP',
                    createdAt: '2024-03-10'
                },
                {
                    id: '4',
                    name: 'فاطمة عبدالله السليطي',
                    email: 'fatima.sulaiti@email.com',
                    phone: '+974 5555 7777',
                    turkeyAddress: 'منطقة أتاشهير، إسطنبول، تركيا',
                    qatarAddress: 'مدينة الخور، الخور، قطر',
                    notes: 'استشارات قانونية متخصصة',
                    status: 'ACTIVE',
                    createdAt: '2024-04-05'
                },
                {
                    id: '5',
                    name: 'عبدالرحمن محمد الثاني',
                    email: 'abdulrahman.thani@email.com',
                    phone: '+974 5555 3333',
                    turkeyAddress: 'شارع تونالي هلمي، أنقرة، تركيا',
                    qatarAddress: 'مدينة الوكرة، الوكرة، قطر',
                    notes: 'عميل غير نشط حالياً',
                    status: 'INACTIVE',
                    createdAt: '2024-02-28'
                }
            ]);
            // }
        } catch (error) {
            console.error('Error loading customers:', error);
            setSuccessMessage('خطأ في تحميل بيانات العملاء');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCustomer = async (customerId: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا العميل؟')) {
            try {
                // In real app, call API: await fetch(`/api/customers/${customerId}`, { method: 'DELETE' })
                setCustomers(customers.filter(c => c.id !== customerId));
                setSuccessMessage('تم حذف العميل بنجاح');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (error) {
                console.error('Error deleting customer:', error);
                setSuccessMessage('خطأ في حذف العميل');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Success Message */}
            {successMessage && (
                <Alert
                    severity={successMessage.includes('خطأ') ? 'error' : 'success'}
                    sx={{ mb: 2 }}
                    onClose={() => setSuccessMessage('')}
                >
                    {successMessage}
                </Alert>
            )}

            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#8b1538' }}>
                        إدارة العملاء
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        إدارة معلومات العملاء ومتابعة طلباتهم القانونية
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAddCustomer}
                    sx={{
                        backgroundColor: '#8b1538',
                        '&:hover': { backgroundColor: '#722030' },
                        fontSize: '14px'
                    }}
                >
                    إضافة عميل جديد
                </Button>
            </Box>

            {/* Statistics */}
            <CustomersStats customers={customers} />

            {/* Customers Table */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: '#8b1538', mb: 2 }}>
                        قائمة العملاء ({customers.length} عميل)
                    </Typography>
                    <CustomersTable
                        customers={customers}
                        onEdit={onEditCustomer}
                        onDelete={handleDeleteCustomer}
                        loading={loading}
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default CustomersList;