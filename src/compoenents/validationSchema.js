import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "At least 3 characters")
    .required("Full name is required"),
  mobile: Yup.string()
    .matches(/^[6-9][0-9]{9}$/, "Enter valid 10-digit mobile starting with 6-9")
    .required("Mobile number is required"),

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
