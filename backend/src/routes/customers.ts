import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/db';

const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await prisma.customer.findMany({
            include: {
                tasks: {
                    select: {
                        id: true,
                        title: true,
                        status: true
                    }
                },
                attachments: {
                    select: {
                        id: true,
                        filename: true,
                        originalName: true
                    }
                },
                _count: {
                    select: {
                        tasks: true,
                        attachments: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json({
            customers,
            total: customers.length
        });
    } catch (error) {
        console.error('Get customers error:', error);
        res.status(500).json({ message: 'Error fetching customers' });
    }
});

// Get single customer
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await prisma.customer.findUnique({
            where: { id },
            include: {
                tasks: {
                    include: {
                        lawyer: {
                            select: {
                                id: true,
                                name: true,
                                specialty: true
                            }
                        },
                        businessUser: {
                            select: {
                                id: true,
                                name: true,
                                company: true
                            }
                        }
                    }
                },
                attachments: true
            }
        });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json({ customer });
    } catch (error) {
        console.error('Get customer error:', error);
        res.status(500).json({ message: 'Error fetching customer' });
    }
});

// Create new customer
router.post('/', [
    body('name').trim().isLength({ min: 2 }),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional().trim(),
    body('company').optional().trim(),
    body('address').optional().trim(),
    body('notes').optional().trim(),
    body('status').optional().isIn(['ACTIVE', 'INACTIVE', 'VIP'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, company, address, notes, status = 'ACTIVE' } = req.body;

        // Check if customer with email already exists
        const existingCustomer = await prisma.customer.findUnique({
            where: { email }
        });

        if (existingCustomer) {
            return res.status(400).json({ message: 'Customer with this email already exists' });
        }

        const customer = await prisma.customer.create({
            data: {
                name,
                email,
                phone,
                company,
                address,
                notes,
                status
            }
        });

        res.status(201).json({
            message: 'Customer created successfully',
            customer
        });
    } catch (error) {
        console.error('Create customer error:', error);
        res.status(500).json({ message: 'Error creating customer' });
    }
});

// Update customer
router.put('/:id', [
    body('name').optional().trim().isLength({ min: 2 }),
    body('email').optional().isEmail().normalizeEmail(),
    body('phone').optional().trim(),
    body('company').optional().trim(),
    body('address').optional().trim(),
    body('notes').optional().trim(),
    body('status').optional().isIn(['ACTIVE', 'INACTIVE', 'VIP'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const updateData = req.body;

        // Check if customer exists
        const existingCustomer = await prisma.customer.findUnique({
            where: { id }
        });

        if (!existingCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // If email is being updated, check if it's already taken
        if (updateData.email && updateData.email !== existingCustomer.email) {
            const emailExists = await prisma.customer.findUnique({
                where: { email: updateData.email }
            });

            if (emailExists) {
                return res.status(400).json({ message: 'Email already taken by another customer' });
            }
        }

        const customer = await prisma.customer.update({
            where: { id },
            data: updateData
        });

        res.json({
            message: 'Customer updated successfully',
            customer
        });
    } catch (error) {
        console.error('Update customer error:', error);
        res.status(500).json({ message: 'Error updating customer' });
    }
});

// Delete customer
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if customer exists
        const existingCustomer = await prisma.customer.findUnique({
            where: { id }
        });

        if (!existingCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        await prisma.customer.delete({
            where: { id }
        });

        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Delete customer error:', error);
        res.status(500).json({ message: 'Error deleting customer' });
    }
});

export default router;