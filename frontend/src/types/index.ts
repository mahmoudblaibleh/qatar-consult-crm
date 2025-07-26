// src/types/index.ts
export interface MenuItem {
    id: string;
    text: string;
    icon: React.ReactNode;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    turkeyAddress: string;  // Changed from single address
    qatarAddress: string;   // Added Qatar address
    notes: string;
    status: 'ACTIVE' | 'INACTIVE' | 'VIP';
    createdAt: string;
    attachments?: FileAttachment[];
}

export interface FileAttachment {
    id: string;
    name: string;
    size: number;
    type: string;
    url?: string;
    uploadedAt: string;
}

export interface CustomerFormData {
    name: string;
    email: string;
    phone: string;
    // Turkey Address fields
    turkeyStreet: string;
    turkeyCity: string;
    turkeyState: string;
    turkeyPostalCode: string;
    // Qatar Address fields
    qatarStreet: string;
    qatarCity: string;
    qatarState: string;
    qatarPostalCode: string;
    notes: string;
    status: 'ACTIVE' | 'INACTIVE' | 'VIP';
}

export interface Lawyer {
    id: string;
    name: string;
    email: string;
    phone: string;
    specialty: string;
    licenseNumber: string;
    yearsExperience: number;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string;
}

export interface BusinessUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    company: string;
    businessType: string;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    customerId?: string;
    lawyerId?: string;
    businessUserId?: string;
    dueDate?: string;
    createdAt: string;
}