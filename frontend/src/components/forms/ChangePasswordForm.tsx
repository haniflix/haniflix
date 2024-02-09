import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProvider } from 'formik';

import {
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";


const ChangePasswordForm = ({ formik }) => {
    // return <div className='bg-white h-[50px]'>I am fine</div>
    const { errors, touched } = formik

    return (
        <FormikProvider
            value={formik}
        >

            <div
                className='border sm:w-[450px] max-w-[450px] p-[10px] bg-white rounded mt-6 mb-20'>
                <div className='font-bold text-2xl text-gray-300'>
                    Change Password
                </div>
                <div>
                    <Field
                        as={TextField}
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
                        as={TextField}
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
                        as={TextField}
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
                    {false ? <CircularProgress size={24} /> : "Save Changes"}
                </Button>
            </div>

        </FormikProvider >
    );
};

export default ChangePasswordForm;
