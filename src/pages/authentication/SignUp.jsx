import { Link, useNavigate } from "react-router";
import signUpImg from "../../assets/static/sign-up-page-img.jpg";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useFormik } from "formik";
import { signUpSchema } from "../../schema/error";
import { useAuth } from "../../hooks/useAuth";
import { saveUser } from "../../api/utils";
import {
  FormButton,
  GoogleLogin,
} from "../../components/microComponents/MicroComponents";
export const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useAuth();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async (values, action) => {
      console.log("onSubmit", values);
      await createUser(values.email, values.password);
      await updateUserProfile(values.name);
      await saveUser(values);
      action.resetForm();
      navigate("/plants");
    },
    validationSchema: signUpSchema,
  });

  return (
    <div className="px-4 lg:flex lg:min-h-screen lg:items-center lg:gap-12 lg:p-0 2xl:container 2xl:mx-auto">
      <div className="hidden basis-1/2 lg:block">
        <img src={signUpImg} className="max-h-screen w-full" />
      </div>
      <div className="pt-10 sm:mx-auto sm:max-w-lg lg:flex lg:h-full lg:basis-1/2 lg:items-center lg:justify-center lg:pt-0">
        <div className="space-y-8">
          <div className="flex flex-col gap-4 text-center">
            <Link to="/" className="font-metal text-4xl sm:text-3xl">
              PlantLife
            </Link>
            <p className="font-metal text-3xl text-gray-600">
              One step closer to bringing nature home
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="input-container">
                <label
                  htmlFor="name"
                  className="w-20 font-semibold text-gray-600"
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="enter your name"
                  className="input"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <div className="error-msg">{errors.name}</div>
                ) : null}
              </div>
              <div className="input-container">
                <label
                  htmlFor="email"
                  className="w-20 font-semibold text-gray-600"
                >
                  Email:{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="input"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <div className="error-msg">{errors.email}</div>
                ) : null}
              </div>
              <div className="input-container">
                <label
                  htmlFor="email"
                  className="w-20 font-semibold text-gray-600"
                >
                  Password:
                </label>
                <input
                  placeholder="type your password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="input"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  type="button"
                  className="absolute top-10 right-10 cursor-pointer text-gray-600"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
                {errors.password && touched.password ? (
                  <div className="error-msg">{errors.password}</div>
                ) : null}
              </div>
              <div className="input-container">
                <label
                  htmlFor="email"
                  className="w-20 font-semibold text-gray-600"
                >
                  Confirm Password:
                </label>
                <input
                  placeholder="confirm your password"
                  type="password"
                  name="confirm_password"
                  className="input"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.confirm_password && touched.confirm_password ? (
                  <div className="error-msg">{errors.confirm_password}</div>
                ) : null}
              </div>
              <div>
                <p>
                  Already Have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-green-700 underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
              <FormButton isSubmitting={isSubmitting} text={"Sign Up"} />
            </div>
          </form>

          <div className="justify-cener flex items-center gap-4">
            <span className="h-[1px] w-full bg-gray-300"></span>
            <p className="text-gray-400">Or</p>
            <span className="h-[1px] w-full bg-gray-300"></span>
          </div>
          <GoogleLogin isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
};
