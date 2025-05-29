import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string("").required("name is required"),
  email: yup.string().email("enter valid email").required("email is required"),
  password: yup
    .string()
    .min(6, "min 6 characters required")
    .required("password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("please confirm your password"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("enter valid email").required("email is required"),
  password: yup.string().min(6, "min 6 characters required"),
});
