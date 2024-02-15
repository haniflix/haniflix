import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProvider } from 'formik';

import {
    TextField,
    Button,
    // CircularProgress,
} from "@mui/material";

import CircularProgress from "@mui/material-next/CircularProgress";

import { styled } from '@mui/material/styles';


const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.grey[500], // Darker gray outline
            '&:hover fieldset': {
                borderColor: theme.palette.grey[600], // Slightly lighter on hover
            },
        },
    },
    '& .MuiInputLabel-root': { // Target the label
        color: 'white', // Set label color to white
    },
    '& .MuiInputBase-input': {
        color: 'white', // Set text color to white
    },
}));


const ChangePasswordForm = ({ formik, isLoading }) => {
    // return <div className='bg-white h-[50px]'>I am fine</div>
    const { errors, touched } = formik

    return (
        <FormikProvider
            value={formik}
        >

            <div className='font-bold text-2xl text-gray-300  mt-8 mb-3'>
                Change Password
            </div>
            <div
                className='border border-[gray] sm:w-[450px] max-w-[450px] p-[10px] rounded mb-20'>

                <div>
                    <Field
                        as={CustomTextField}
                        type="password" name="currentPassword" id="currentPassword"
                        fullWidth
                        label="Current Password"
                        margin="normal"
                        variant="outlined"
                    />
                    {errors.currentPassword && touched.currentPassword && (
                        <div className="text-[red] text-xs">{errors.currentPassword}</div>
                    )}
                </div>
                <div>
                    <Field
                        as={CustomTextField}
                        name="newPassword" id="newPassword"
                        fullWidth
                        label="New Password"
                        margin="normal"
                        variant="outlined"
                        type="password" />
                    {errors.newPassword && touched.newPassword && (
                        <div className="text-[red] text-xs">{errors.newPassword}</div>
                    )}

                </div>
                <div>
                    <Field type="password" name="confirmPassword" id="confirmPassword"
                        fullWidth
                        label="Confirm Password"
                        margin="normal"
                        variant="outlined"
                        as={CustomTextField}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <div className="text-[red] text-xs">{errors.confirmPassword}</div>
                    )}
                </div>
                <Button
                    className="gradientButton"
                    onClick={formik.handleSubmit}
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#1976d2" }}
                    // disabled={isSubmitting || loading}
                    sx={{ mt: 2, mb: 2 }}
                >
                    {isLoading ? <div className='text-white'><CircularProgress color="inherit" size={24} /></div> : "Save Changes"}
                </Button>
            </div>

        </FormikProvider >
    );
};

export default ChangePasswordForm;
