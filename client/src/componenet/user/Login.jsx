import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../../context/AppContext';

function Login() {
  const navigate = useNavigate();
  const { LoginUser } = React.useContext(AppContext);

  // Formik validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await LoginUser(values.email, values.password);
      if (result.success) {
        navigate('/');
      } else {
        toast.error(result.message || 'Login failed');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-indigo-500 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
          ></div>
          <div
            className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
          >
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl text-pink-600 font-semibold">Login</h1>
              <div className="divide-y divide-gray-200">
                <div
                  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                   data-aos="slide-right"
                  data-aos-duration="600"
                 >
                  {/* Email Field */}
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`peer placeholder-transparent h-10 w-full border-b-2 ${
                        formik.touched.email && formik.errors.email
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } text-gray-700 focus:outline-none focus:border-rose-600`}
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`peer placeholder-transparent h-10 w-full border-b-2 ${
                        formik.touched.password && formik.errors.password
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } text-gray-700 focus:outline-none focus:border-rose-600`}
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="relative">
                  <button
                      type="submit"
                      className="inset-0 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-md px-2 py-1"
                      disabled={formik.isSubmitting} // Disable the button during submission
                    >
                      {formik.isSubmitting ? (
                       "Login..."
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
