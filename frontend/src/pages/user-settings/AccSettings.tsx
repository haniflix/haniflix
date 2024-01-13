import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/auth";

const url = import.meta.env.VITE_APP_API_URL;

const AccSettings = () => {
  const user = useAppSelector(selectUser);
  const userId = user?._id;
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: userId,
    name: user.fullname,
    email: user.email,
  });

  const fetchUserDetails = useCallback(async () => {
    if (userId) {
      try {
        setLoading(true);
        const response = await axios.get(`${url}users/find/${userId}`);
        console.log("Data available:", response.data);
        setUserDetails({
          id: response.data._id,
          name: response.data.fullname,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name cannot be left blank"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email cannot be left blank"),
  });

  const handleSubmitUserDetails = async (
    values,
    { resetForm, setSubmitting }
  ) => {
    setLoading(true);
    try {
      const res = await axios.put(`${url}users/updateUserDetails/${userId}`, {
        id: userId,
        name: values.name,
        email: values.email,
      });
      setUserDetails({
        id: res.data._id,
        name: res.data.fullname,
        email: res.data.email,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Details Updated Successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        style={{
          marginTop: "20vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{ fontWeight: 700 }}
          sx={{ mt: 4, mb: 2 }}
        >
          Update Account Details
        </Typography>

        <Formik
          initialValues={userDetails}
          validationSchema={validationSchema}
          onSubmit={handleSubmitUserDetails}
        >
          {({ isSubmitting }) => (
            <Form style={{ maxWidth: "450px", width: "100%" }}>
              <Field
                as={TextField}
                fullWidth
                id="name"
                name="name"
                label="Name"
                margin="normal"
                variant="outlined"
              />

              <Field
                as={TextField}
                fullWidth
                id="email"
                name="email"
                label="E-mail"
                margin="normal"
                variant="outlined"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#1976d2" }}
                disabled={isSubmitting || loading}
                sx={{ mt: 2, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Save Changes"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AccSettings;
