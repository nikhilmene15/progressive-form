import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "At least 3 characters")
    .required("Full name is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address"
    )
    .required("Email is required"),
  city: Yup.string()
    .min(3, "At least 3 characters")
    .required("City is required"),
  sport: Yup.string().required("Favorite sport is required"),
  team: Yup.string().required("Favorite team is required"),
  icon: Yup.string().required("Favorite sports icon is required"),
});

export default validationSchema;
