import * as Yup from "yup";

export const CategoryFormValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});
