import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProvider } from 'formik';

import {
    TextField,
    Button,
    // CircularProgress,
} from "@mui/material";

import CircularProgress from "@mui/material-next/CircularProgress";

import styles from '../SettingsSideBar/sidebar.module.scss'


const ChangePasswordForm = ({ formik, isLoading }) => {
    // return <div className='bg-white h-[50px]'>I am fine</div>
    const { errors, touched } = formik

    return (
        <FormikProvider
            value={formik}
        >

            <div
                className=' mb-20'>

                <label className={styles['input_label']}>
                    Current Password
                </label>
                <div className={styles['inputWrapper']}>
                    <Field
                        type="password" name="currentPassword" id="currentPassword"
                        label="Current Password"
                        margin="normal"
                        variant="outlined"
                    />

                </div>
                {errors.currentPassword && touched.currentPassword && (
                    <div className="text-[red] text-xs">{errors.currentPassword}</div>
                )}
                <label className={styles['input_label']}>
                    New Password
                </label>
                <div className={styles['inputWrapper']}>
                    <Field
                        name="newPassword" id="newPassword"
                        label="New Password"
                        margin="normal"
                        variant="outlined"
                        type="password" />


                </div>
                {errors.newPassword && touched.newPassword && (
                    <div className="text-[red] text-xs">{errors.newPassword}</div>
                )}
                <label className={styles['input_label']}>
                    Confirm Password
                </label>
                <div className={styles['inputWrapper']}>
                    <Field
                        type="password" name="confirmPassword" id="confirmPassword"
                        label="Confirm Password"
                        margin="normal"
                        variant="outlined"
                    />

                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-[red] text-xs">{errors.confirmPassword}</div>
                )}
                {/* Divider */}
                <div className="my-6 border-b border-[#4B4B4B]" />
                <Button
                    className={styles['app_button']}
                    onClick={formik.handleSubmit}
                    fullWidth
                    variant="contained"
                    color="primary"
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
