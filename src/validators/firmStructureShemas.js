import * as Yup from 'yup';

export const employeesValidationSchema = Yup.object().shape({
  job: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('This field is Required!'),
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('This field is Required!'),
  surname: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('This field is Required!'),
  salary: Yup.number()
    .min(100, 'Min value should be more then 99!')
    .max(9000, 'Max value should be equals or less than 9000!')
    .required('This field is Required!')
});
export const branchesValidationSchema = Yup.object().shape({
  branchName: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('This field is Required!')
});
