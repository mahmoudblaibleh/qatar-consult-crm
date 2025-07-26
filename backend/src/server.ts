import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage for now (replace with database later)
let customers: any[] = [
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
    }
];

// Middleware
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Qatar Consult API is running!',
        timestamp: new Date().toISOString()
    });
});

// CUSTOMER ENDPOINTS

// Get all customers
app.get('/api/customers', (req, res) => {
    res.json({
        message: 'Customers retrieved successfully',
        customers: customers
    });
});

// Get single customer
app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === req.params.id);
    if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({
        message: 'Customer retrieved successfully',
        customer
    });
});

// Create new customer
app.post('/api/customers', (req, res) => {
    const newCustomer = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString().split('T')[0]
    };

    customers.push(newCustomer);

    res.status(201).json({
        message: 'Customer created successfully',
        customer: newCustomer
    });
});

// Update customer
app.put('/api/customers/:id', (req, res) => {
    const index = customers.findIndex(c => c.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Customer not found' });
    }

    customers[index] = {
        ...customers[index],
        ...req.body,
        id: req.params.id // Preserve the ID
    };

    res.json({
        message: 'Customer updated successfully',
        customer: customers[index]
    });
});

// Delete customer
app.delete('/api/customers/:id', (req, res) => {
    const index = customers.findIndex(c => c.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Customer not found' });
    }

    customers.splice(index, 1);

    res.json({
        message: 'Customer deleted successfully'
    });
});

// Other endpoints
app.get('/api/lawyers', (req, res) => {
    res.json({ message: 'Lawyers endpoint working', lawyers: [] });
});

app.get('/api/business-users', (req, res) => {
    res.json({ message: 'Business users endpoint working', businessUsers: [] });
});

app.get('/api/tasks', (req, res) => {
    res.json({ message: 'Tasks endpoint working', tasks: [] });
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Qatar Consult API server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`👥 Customers API: http://localhost:${PORT}/api/customers`);
    console.log(`🗄️ Database: In-memory (temporary)`);
});

export default app;