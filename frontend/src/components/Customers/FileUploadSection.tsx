import React, { useRef } from 'react';
import {
    Card, CardContent, Typography, Button, List, ListItem,
    ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton,
    Box, Divider, Paper
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    AttachFile as AttachFileIcon,
    Delete as DeleteIcon,
    InsertDriveFile as FileIcon,
    Image as ImageIcon,
    PictureAsPdf as PdfIcon,
    Description as DocumentIcon
} from '@mui/icons-material';

interface FileUploadSectionProps {
    files: File[];
    onFilesChange: (files: File[]) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
                                                                 files,
                                                                 onFilesChange
                                                             }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newFiles: File[] = [];

            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];

                // Check file size (max 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    alert(`الملف ${file.name} كبير جداً. الحد الأقصى 10 ميجابايت`);
                    continue;
                }

                // Check if file already exists
                const fileExists = files.some(existingFile =>
                    existingFile.name === file.name && existingFile.size === file.size
                );

                if (fileExists) {
                    alert(`الملف ${file.name} موجود بالفعل`);
                    continue;
                }

                newFiles.push(file);
            }

            onFilesChange([...files, ...newFiles]);
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (fileIndex: number) => {
        const updatedFiles = files.filter((_, index) => index !== fileIndex);
        onFilesChange(updatedFiles);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 بايت';
        const k = 1024;
        const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (file: File) => {
        const fileType = file.type;
        const fileName = file.name.toLowerCase();

        if (fileType.startsWith('image/')) {
            return <ImageIcon sx={{ color: '#4caf50' }} />;
        } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
            return <PdfIcon sx={{ color: '#f44336' }} />;
        } else if (
            fileType.includes('document') ||
            fileType.includes('word') ||
            fileName.endsWith('.doc') ||
            fileName.endsWith('.docx')
        ) {
            return <DocumentIcon sx={{ color: '#2196f3' }} />;
        } else {
            return <FileIcon sx={{ color: '#757575' }} />;
        }
    };

    const getAcceptedFileTypes = () => {
        return '.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.xlsx,.xls';
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#8b1538', mb: 2 }}>
                    المرفقات والوثائق
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    يمكنك رفع الوثائق المتعلقة بالعميل (PDF, Word, صور)
                </Typography>

                {/* Upload Area */}
                <Paper
                    sx={{
                        border: '2px dashed #8b1538',
                        borderRadius: 2,
                        p: 3,
                        textAlign: 'center',
                        backgroundColor: 'rgba(139, 21, 56, 0.02)',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 21, 56, 0.05)',
                        }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <CloudUploadIcon sx={{ fontSize: 48, color: '#8b1538', mb: 2 }} />
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                        اضغط لرفع الملفات
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        أو اسحب الملفات هنا
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        الحد الأقصى: 10 ميجابايت لكل ملف
                    </Typography>
                </Paper>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={getAcceptedFileTypes()}
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                />

                <Button
                    variant="outlined"
                    startIcon={<AttachFileIcon />}
                    onClick={() => fileInputRef.current?.click()}
                    fullWidth
                    sx={{
                        mt: 2,
                        borderColor: '#8b1538',
                        color: '#8b1538',
                        '&:hover': {
                            borderColor: '#722030',
                            backgroundColor: 'rgba(139, 21, 56, 0.04)'
                        }
                    }}
                >
                    اختيار الملفات
                </Button>

                {/* Files List */}
                {files.length > 0 && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" sx={{ mb: 2 }}>
                            الملفات المرفقة ({files.length})
                        </Typography>

                        <List dense>
                            {files.map((file, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 1,
                                        mb: 1,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <ListItemIcon>
                                        {getFileIcon(file)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {file.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="caption" color="text.secondary">
                                                {formatFileSize(file.size)}
                                            </Typography>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            onClick={() => removeFile(index)}
                                            size="small"
                                            sx={{ color: '#d32f2f' }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}

                {/* File Types Info */}
                <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                        <strong>أنواع الملفات المدعومة:</strong><br />
                        المستندات: PDF, Word (.doc, .docx)<br />
                        الصور: JPG, PNG, GIF<br />
                        جداول البيانات: Excel (.xlsx, .xls)<br />
                        ملفات نصية: TXT
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FileUploadSection;