// @ts-nocheck
// src/components/Customers/EditCustomer.tsx
import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Card, CardContent, TextField, Grid,
    FormControl, InputLabel, Select, MenuItem, Alert, Breadcrumbs, Link
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    Home as HomeIcon
} from '@mui/icons-material';
import { Customer, CustomerFormData } from '../../types';
import FileUploadSection from './FileUploadSection';

interface EditCustomerProps {
    customer: Customer | null;
    onBack: () => void;
    onSave: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
}

const EditCustomer: React.FC<EditCustomerProps> = ({ customer, onBack, onSave }) => {
    const [customerForm, setCustomerForm] = useState<CustomerFormData>({
        name: '',
        email: '',
        phone: '',
        // Turkey Address
        turkeyStreet: '',
        turkeyCity: '',
        turkeyState: '',
        turkeyPostalCode: '',
        // Qatar Address
        qatarStreet: '',
        qatarCity: '',
        qatarState: '',
        qatarPostalCode: '',
        notes: '',
        status: 'ACTIVE'
    });

    const [attachments, setAttachments] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [successMessage, setSuccessMessage] = useState('');

    // Load customer data when component mounts
    useEffect(() => {
        if (customer) {
            // Parse Turkey address back into components
            const turkeyAddressParts = customer.turkeyAddress ? customer.turkeyAddress.split(', ') : [];
            const qatarAddressParts = customer.qatarAddress ? customer.qatarAddress.split(', ') : [];

            setCustomerForm({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                // Turkey Address parsing
                turkeyStreet: turkeyAddressParts[0] || '',
                turkeyCity: turkeyAddressParts[1] || '',
                turkeyState: turkeyAddressParts[2] || '',
                turkeyPostalCode: turkeyAddressParts[4] || '', // Skip country at index 3
                // Qatar Address parsing
                qatarStreet: qatarAddressParts[0] || '',
                qatarCity: qatarAddressParts[1] || '',
                qatarState: qatarAddressParts[2] || '',
                qatarPostalCode: qatarAddressParts[4] || '', // Skip country at index 3
                notes: customer.notes,
                status: customer.status
            });
        }
    }, [customer]);

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};

        if (!customerForm.name.trim()) {
            newErrors.name = 'اسم العميل مطلوب';
        }

        if (!customerForm.email.trim()) {
            newErrors.email = 'البريد الإلكتروني مطلوب';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerForm.email)) {
            newErrors.email = 'البريد الإلكتروني غير صحيح';
        }

        if (!customerForm.phone.trim()) {
            newErrors.phone = 'رقم الهاتف مطلوب';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof CustomerFormData, value: string) => {
        setCustomerForm(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            // Combine Turkey address fields
            const turkeyAddress = [
                customerForm.turkeyStreet,
                customerForm.turkeyCity,
                customerForm.turkeyState,
                'تركيا',
                customerForm.turkeyPostalCode
            ].filter(Boolean).join(', ');

            // Combine Qatar address fields
            const qatarAddress = [
                customerForm.qatarStreet,
                customerForm.qatarCity,
                customerForm.qatarState,
                'قطر',
                customerForm.qatarPostalCode
            ].filter(Boolean).join(', ');

            const customerData: Omit<Customer, 'id' | 'createdAt'> = {
                name: customerForm.name,
                email: customerForm.email,
                phone: customerForm.phone,
                turkeyAddress: turkeyAddress || '',
                qatarAddress: qatarAddress || '',
                notes: customerForm.notes,
                status: customerForm.status
            };

            // In a real app, upload files to server here
            console.log('Updated customer data:', customerData);
            console.log('Updated attachments:', attachments);

            onSave(customerData);
            setSuccessMessage('تم تحديث بيانات العميل بنجاح');

            // Go back after successful save
            setTimeout(() => {
                onBack();
            }, 1500);

        } catch (error) {
            console.error('Error updating customer:', error);
            setSuccessMessage('خطأ في تحديث بيانات العميل');
        } finally {
            setLoading(false);
        }
    };

    if (!customer) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                    لم يتم العثور على بيانات العميل
                </Typography>
                <Button onClick={onBack} sx={{ mt: 2 }}>
                    العودة
                </Button>
            </Box>
        );
    }

    // Common field styles for RTL
    const fieldStyles = {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: '#8b1538' },
            '&.Mui-focused fieldset': { borderColor: '#8b1538' }
        },
        '& .MuiInputLabel-root': {
            right: 14,
            left: 'auto',
            transformOrigin: 'top right',
            zIndex: 1,
            '&.Mui-focused': {
                color: '#8b1538',
                transform: 'translate(0, -9px) scale(0.75)',
                right: 8
            },
            '&.MuiInputLabel-shrink': {
                transform: 'translate(0, -9px) scale(0.75)',
                right: 8
            }
        },
        '& .MuiOutlinedInput-input': {
            textAlign: 'right'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            '& legend': {
                textAlign: 'right',
                marginLeft: 'auto',
                marginRight: 0
            }
        }
    };

    const selectStyles = {
        right: 14,
        left: 'auto',
        transformOrigin: 'top right',
        zIndex: 1,
        '&.Mui-focused': {
            color: '#8b1538',
            transform: 'translate(0, -9px) scale(0.75)',
            right: 8
        },
        '&.MuiInputLabel-shrink': {
            transform: 'translate(0, -9px) scale(0.75)',
            right: 8
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    color="inherit"
                    href="#"
                    onClick={onBack}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    <HomeIcon sx={{ fontSize: 20 }} />
                    العملاء
                </Link>
                <Typography color="text.primary">تعديل بيانات العميل</Typography>
            </Breadcrumbs>

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
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    sx={{ color: '#8b1538' }}
                >
                    العودة
                </Button>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ color: '#8b1538' }}>
                        تعديل بيانات العميل
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        تعديل معلومات العميل: {customer.name}
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Customer Information */}
                <Grid item xs={12} md={8}>
                    {/* Basic Information */}
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ color: '#8b1538', mb: 3 }}>
                                المعلومات الأساسية
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    fullWidth
                                    label="اسم العميل *"
                                    value={customerForm.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    sx={fieldStyles}
                                />
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    fullWidth
                                    label="البريد الإلكتروني *"
                                    type="email"
                                    value={customerForm.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={fieldStyles}
                                />
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    fullWidth
                                    label="رقم الهاتف *"
                                    value={customerForm.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                    placeholder="+90 XXX XXX XX XX / +974 XXXX XXXX"
                                    sx={fieldStyles}
                                />
                            </Box>

                            <Box sx={{ mb: 0 }}>
                                <FormControl fullWidth>
                                    <InputLabel sx={selectStyles}>
                                        حالة العميل
                                    </InputLabel>
                                    <Select
                                        value={customerForm.status}
                                        label="حالة العميل"
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        sx={{
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#8b1538' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#8b1538' },
                                            '& .MuiSelect-select': { textAlign: 'right' },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                '& legend': {
                                                    textAlign: 'right',
                                                    marginLeft: 'auto',
                                                    marginRight: 0
                                                }
                                            }
                                        }}
                                    >
                                        <MenuItem value="ACTIVE">نشط</MenuItem>
                                        <MenuItem value="INACTIVE">غير نشط</MenuItem>
                                        <MenuItem value="VIP">مميز</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Turkey Address */}
                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ color: '#8b1538', mb: 3 }}>
                                العنوان في تركيا
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="الشارع / العنوان التفصيلي (تركيا)"
                                        value={customerForm.turkeyStreet}
                                        onChange={(e) => handleInputChange('turkeyStreet', e.target.value)}
                                        sx={fieldStyles}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="المدينة (تركيا)"
                                        value={customerForm.turkeyCity}
                                        onChange={(e) => handleInputChange('turkeyCity', e.target.value)}
                                        sx={fieldStyles}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="المنطقة / الولاية (تركيا)"
                                        value={customerForm.turkeyState}
                                        onChange={(e) => handleInputChange('turkeyState', e.target.value)}
                                        sx={fieldStyles}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="الرمز البريدي (تركيا)"
                                        value={customerForm.turkeyPostalCode}
                                        onChange={(e) => handleInputChange('turkeyPostalCode', e.target.value)}
                                        sx={fieldStyles}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Qatar Address */}
                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ color: '#8b1538', mb: 3 }}>
                                العنوان في قطر
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="الشارع / العنوان التفصيلي (قطر)"
                                        value={customerForm.qatarStreet}
                                        onChange={(e) => handleInputChange('qatarStreet', e.target.value)}
                                        sx={fieldStyles}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="المدينة (قطر)"
                                        value={customerForm.qatarCity}
                                        onChange={(e) => handleInputChange('qatarCity', e.target.value)}
                                        sx={fieldStyles}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="المنطقة / الولاية (قطر)"
                                        value={customerForm.qatarState}
                                        onChange={(e) => handleInputChange('qatarState', e.target.value)}
                                        sx={fieldStyles}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="الرمز البريدي (قطر)"
                                        value={customerForm.qatarPostalCode}
                                        onChange={(e) => handleInputChange('qatarPostalCode', e.target.value)}
                                        sx={fieldStyles}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Notes */}
                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ color: '#8b1538', mb: 3 }}>
                                ملاحظات إضافية
                            </Typography>

                            <TextField
                                fullWidth
                                label=""
                                multiline
                                rows={4}
                                value={customerForm.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                placeholder="أضف أي ملاحظات حول العميل..."
                                sx={{
                                    ...fieldStyles,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        '& legend': {
                                            textAlign: 'right',
                                            marginLeft: 'auto',
                                            marginRight: 0
                                        }
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* File Upload Section */}
                <Grid item xs={12} md={4}>
                    <FileUploadSection
                        files={attachments}
                        onFilesChange={setAttachments}
                    />
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    onClick={onBack}
                    disabled={loading}
                    sx={{
                        borderColor: '#8b1538',
                        color: '#8b1538',
                        '&:hover': {
                            borderColor: '#722030',
                            backgroundColor: 'rgba(139, 21, 56, 0.04)'
                        }
                    }}
                >
                    إلغاء
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading || !customerForm.name || !customerForm.email || !customerForm.phone}
                    sx={{
                        backgroundColor: '#8b1538',
                        '&:hover': { backgroundColor: '#722030' },
                        '&:disabled': { backgroundColor: '#ccc' },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <SaveIcon sx={{ fontSize: 20 }} />
                    {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </Button>
            </Box>
        </Box>
    );
};

export default EditCustomer;