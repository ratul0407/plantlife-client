import { Link, useNavigate } from "react-router";
import loginImg from "../../assets/static/login-page-img.jpg";
import { useFormik } from "formik";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginSchema } from "../../schema/error";
import { useAuth } from "../../hooks/useAuth";
import {
  FormButton,
  GoogleLogin,
} from "../../components/microComponents/MicroComponents";
import { saveUser } from "../../api/utils";
export const Login = () => {
  const { loginUser } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate("");
  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, action) => {
      console.log("on submit", values);
      await loginUser(values.email, values.password);
      await saveUser(values);
      action.resetForm();
      navigate("/plants");
    },
    validationSchema: loginSchema,
  });
  return (
    <div className="flex min-h-screen items-center">
      <div className="mx-auto basis-1/2 lg:max-w-lg lg:space-y-12">
        <div className="space-y-8">
          <div className="flex flex-col gap-4 text-center">
            <Link to="/" className="font-metal text-4xl sm:text-3xl">
              PlantLife
            </Link>
            <p className="font-metal text-3xl text-gray-600">
              Connect with nature, Connect with your roots
            </p>
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email" className="w-20 font-semibold text-gray-600">
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
            <label htmlFor="email" className="w-20 font-semibold text-gray-600">
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
          <FormButton isSubmitting={isSubmitting} text={"Login"} />
        </form>
        <div>
          <p className="space-x-2">
            <span>New to PlantLife?</span>
            <Link to="/signup" className="font-bold text-green-700 underline">
              Create an account
            </Link>
          </p>
        </div>
        <div className="justify-cener flex items-center gap-4">
          <span className="h-[1px] w-full bg-gray-300"></span>
          <p className="text-gray-400">Or</p>
          <span className="h-[1px] w-full bg-gray-300"></span>
        </div>
        <GoogleLogin />
      </div>
      <div className="hidden basis-1/2 lg:block">
        <img className="max-h-screen w-full" src={loginImg} />
      </div>
    </div>
  );
};
