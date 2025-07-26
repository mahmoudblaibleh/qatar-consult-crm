import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const TasksList: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{ color: '#8b1538', mb: 2 }}>
                إدارة العملاء
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />}>
                إضافة عميل
            </Button>
        </Box>
    );
};

export default TasksList;