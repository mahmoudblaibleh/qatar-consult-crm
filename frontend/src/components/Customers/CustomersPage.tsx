// @ts-nocheck
import React from 'react';
import CustomersList from './CustomersList';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { Customer } from '../../types';

interface CustomersPageProps {
    currentView: 'list' | 'add' | 'edit';
    editingCustomer: Customer | null;
    onNavigate: (view: 'list' | 'add' | 'edit', customer?: Customer) => void;
}

const CustomersPage: React.FC<CustomersPageProps> = ({
                                                         currentView,
                                                         editingCustomer,
                                                         onNavigate
                                                     }) => {
    const handleBackToList = () => {
        onNavigate('list');
    };

    const handleAddCustomer = () => {
        onNavigate('add');
    };

    const handleEditCustomer = (customer: Customer) => {
        onNavigate('edit', customer);
    };

    const handleSaveCustomer = async (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
        try {
            const response = await fetch('http://localhost:3001/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData)
            });

            if (!response.ok) {
                throw new Error('Failed to save customer');
            }

            const result = await response.json();
            console.log('Customer saved:', result);

            // Navigate back to list after successful save
            onNavigate('list');
        } catch (error) {
            console.error('Error saving customer:', error);
            alert('فشل في حفظ العميل. حاول مرة أخرى.');
        }
    };

    switch (currentView) {
        case 'add':
            return (
                <AddCustomer
                    onBack={handleBackToList}
                    onSave={handleSaveCustomer}
                />
            );
        case 'edit':
            return (
                <EditCustomer
                    customer={editingCustomer}
                    onBack={handleBackToList}
                    onSave={handleSaveCustomer}
                />
            );
        case 'list':
        default:
            return (
                <CustomersList
                    onAddCustomer={handleAddCustomer}
                    onEditCustomer={handleEditCustomer}
                />
            );
    }
};

export default CustomersPage;