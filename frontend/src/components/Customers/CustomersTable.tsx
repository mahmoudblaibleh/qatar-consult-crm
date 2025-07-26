import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Avatar, Box, Typography, Chip, IconButton, Tooltip, CircularProgress
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';
import { Customer } from '../../types';

interface CustomersTableProps {
    customers: Customer[];
    onEdit: (customer: Customer) => void;
    onDelete: (customerId: string) => void;
    loading?: boolean;
}

const CustomersTable: React.FC<CustomersTableProps> = ({
                                                           customers,
                                                           onEdit,
                                                           onDelete,
                                                           loading = false
                                                       }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'VIP': return 'error';
            case 'ACTIVE': return 'success';
            case 'INACTIVE': return 'default';
            default: return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'VIP': return 'مميز';
            case 'ACTIVE': return 'نشط';
            case 'INACTIVE': return 'غير نشط';
            default: return status;
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress sx={{ color: '#8b1538' }} />
            </Box>
        );
    }

    if (customers.length === 0) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="h6" color="text.secondary">
                    لا توجد عملاء مسجلون حالياً
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    اضغط على "إضافة عميل جديد" لإضافة أول عميل
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>العميل</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>معلومات الاتصال</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>العنوان في تركيا</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>العنوان في قطر</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>الحالة</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>تاريخ التسجيل</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8b1538' }}>الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow
                            key={customer.id}
                            sx={{
                                '&:hover': { backgroundColor: 'rgba(139, 21, 56, 0.02)' },
                                '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.01)' }
                            }}
                        >
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: '#8b1538', width: 40, height: 40 }}>
                                        {customer.name.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {customer.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                            {customer.notes || 'لا توجد ملاحظات'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <EmailIcon sx={{ fontSize: 16, color: '#8b1538' }} />
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                            {customer.email}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PhoneIcon sx={{ fontSize: 16, color: '#8b1538' }} />
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                            {customer.phone}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'start', gap: 1 }}>
                                    <LocationIcon sx={{ fontSize: 16, color: '#8b1538', mt: 0.5, flexShrink: 0 }} />
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                                        {customer.turkeyAddress || 'لا يوجد عنوان'}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'start', gap: 1 }}>
                                    <LocationIcon sx={{ fontSize: 16, color: '#8b1538', mt: 0.5, flexShrink: 0 }} />
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                                        {customer.qatarAddress || 'لا يوجد عنوان'}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={getStatusText(customer.status)}
                                    color={getStatusColor(customer.status)}
                                    size="small"
                                    sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                    {customer.createdAt}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Tooltip title="عرض التفاصيل">
                                        <IconButton size="small" sx={{ color: '#8b1538' }}>
                                            <ViewIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="تعديل البيانات">
                                        <IconButton
                                            size="small"
                                            sx={{ color: '#1976d2' }}
                                            onClick={() => onEdit(customer)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="حذف العميل">
                                        <IconButton
                                            size="small"
                                            sx={{ color: '#d32f2f' }}
                                            onClick={() => onDelete(customer.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomersTable;