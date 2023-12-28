import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import StripePaymentForm from '../../components/StripePaymentForm';
import Logo from '../../Assets/Images/Nav-logo.png';
import '../../Assets/css/styles.scss';
import './register.scss';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic
      setShowPaymentForm(true);
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  const handleStart = () => {
    if (errors.email) {
      showSwal('Validation Error', errors.email, 'error');
      return;
    }

    if (errors.password) {
      showSwal('Validation Error', errors.password, 'error');
      return;
    }

    if (errors.repeatPassword) {
      showSwal('Validation Error', errors.repeatPassword, 'error');
      return;
    }

    // Proceed to show payment form
    setShowPaymentForm(true);
  };

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? '',
      text: message,
      icon: type,
    });
  };

  const [showPaymentForm, setShowPaymentForm] = React.useState(false);

  return (
    <div className="loginNew">
      <div className="top">
        <div className="wrapper">
          <a href={'/'} className="link">
            <img className="logo" src={Logo} width="100px" height="100px" alt="" />
          </a>
        </div>
      </div>

      <div className="section">
        <div className="intro-section">
          <h1>Welcome to Haniflix</h1>
          <br />
          <h3>
            We are the ultimate streaming service offering unlimited award-winning TV
            shows, movies, and more in 4k on any device ad-free for only $4.99/month!
          </h3>
          <br />
          Watch anywhere. Cancel anytime.
          <br />
          Ready to watch? Create an account.
          <br />
          <div className="circle pulse arrow-down">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="intro-section">
          <h2>Create your account</h2>
          <form onSubmit={handleSubmit} style={{ maxWidth: '450px', width: '100%' }}>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              margin="normal"
              variant="outlined"
            />

            <input
              fullWidth
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              margin="normal"
              variant="outlined"
            />

            <input
              fullWidth
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              placeholder="Repeat Password"
              value={values.repeatPassword}
              onChange={handleChange}
              error={touched.repeatPassword && Boolean(errors.repeatPassword)}
              helperText={touched.repeatPassword && errors.repeatPassword}
              margin="normal"
              variant="outlined"
            />

            <button className="registerButton" type="button" onClick={handleStart}>
              Get Started
            </button>
          </form>

          {showPaymentForm && (
            <div className="payment-modal">
              <h2>Continue for 4.99$/month</h2>
              <StripePaymentForm newUser={values} />
            </div>
          )}

          <Link className="link text-dark" to={{ pathname: '/login' }}>
            Already registered? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
