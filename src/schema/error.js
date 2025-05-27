import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const basicSchema = yup.object().shape({
  name: yup.string("").required("name is required"),
  email: yup.string().email("enter valid email").required("email is required"),
  password: yup
    .string()
    .min(4, "min 4 characters required")
    // .matches(passwordRules, "please enter a stronger password")
    .required("password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("please confirm your password"),
});
