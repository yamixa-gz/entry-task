import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import {
  EMPLOYEES_STYLE, JOB, NAME, SALARY, SURNAME, BRANCH_NAME 
} from '../../../constants/firmStructureElements';
import { branchesValidationSchema, employeesValidationSchema } from '../../../validators/firmStructureShemas';
import FormField from './FormField';
import withTranslation from '../../../HOC/withTranslation';

const AddFirmStructItemForm = ({
  tableStyle, setModalShow, addDataFromFormToFirmStruct, appLanguage 
}) => {
  const {
    handleSubmit, handleChange, values, handleBlur, handleReset, errors, touched 
  } = useFormik({
    initialValues: tableStyle === EMPLOYEES_STYLE ? {
      job: '',
      name: '',
      surname: '',
      salary: '',
    } : {
      branchName: ''
    },
    onSubmit: (submitValues) => {
      addDataFromFormToFirmStruct(submitValues);
      setModalShow(false);
    },
    validationSchema: tableStyle === EMPLOYEES_STYLE ? employeesValidationSchema : branchesValidationSchema,
  });
  return (
    <Form onSubmit={handleSubmit}>
      {
          tableStyle === EMPLOYEES_STYLE
            ? (
              <>
                <FormField
                  groupClass="mt-2"
                  type="text"
                  placeholder={appLanguage.placeholderJob}
                  nameAndId={JOB}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.job}
                  label={`${appLanguage.labelJob}:`}
                  errorText={errors.job && touched.job ? errors.job : ''}
                />
                <FormField
                  groupClass="mt-2"
                  type="text"
                  placeholder={appLanguage.placeholderName}
                  nameAndId={NAME}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.name}
                  label={`${appLanguage.labelName}:`}
                  errorText={errors.name && touched.name ? errors.name : ''}
                />
                <FormField
                  groupClass="mt-2"
                  type="text"
                  placeholder={appLanguage.placeholderSurname}
                  nameAndId={SURNAME}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.surname}
                  label={`${appLanguage.labelSurname}:`}
                  errorText={errors.surname && touched.surname ? errors.surname : ''}
                />
                <FormField
                  groupClass="mt-2 mb-2"
                  type="text"
                  placeholder={appLanguage.placeholderSalary}
                  nameAndId={SALARY}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.salary}
                  label={`${appLanguage.labelSalary}:`}
                  errorText={errors.salary && touched.salary ? errors.salary : ''}
                />
              </>
            )
            : (
              <FormField
                groupClass="mt-2 mb-2"
                type="text"
                placeholder={appLanguage.placeholderBranchName}
                nameAndId={BRANCH_NAME}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.branchName}
                label={`${appLanguage.labelBranchName}:`}
                errorText={errors.branchName && touched.branchName ? errors.branchName : ''}
              />
            )
        }
      <Button className="mb-2" variant="primary" type="submit">
        {appLanguage.addItem}
      </Button>
      <Button onClick={handleReset} className="mb-2 ms-2" variant="secondary" type="button">
        {appLanguage.resetForm}
      </Button>
    </Form>
  );
};
AddFirmStructItemForm.propTypes = {
  appLanguage: PropTypes.shape({
    labelJob: PropTypes.string,
    placeholderJob: PropTypes.string,
    labelName: PropTypes.string,
    placeholderName: PropTypes.string,
    labelSurname: PropTypes.string,
    placeholderSurname: PropTypes.string,
    labelSalary: PropTypes.string,
    placeholderSalary: PropTypes.string,
    labelBranchName: PropTypes.string,
    placeholderBranchName: PropTypes.string,
    addItem: PropTypes.string,
    resetForm: PropTypes.string,
  }),
  tableStyle: PropTypes.string.isRequired,
  setModalShow: PropTypes.func.isRequired,
  addDataFromFormToFirmStruct: PropTypes.func.isRequired
};
AddFirmStructItemForm.defaultProps = {
  appLanguage: {
    labelJob: 'Job',
    placeholderJob: 'Enter job',
    labelName: 'Name',
    placeholderName: 'Enter Name',
    labelSurname: 'Surname',
    placeholderSurname: 'Enter Surname',
    labelSalary: 'Salary',
    placeholderSalary: 'Enter Salary',
    labelBranchName: 'Branch Name',
    placeholderBranchName: 'Enter Branch Name',
    addItem: 'Add',
    resetForm: 'Reset',
  }
};

export default withTranslation(AddFirmStructItemForm);
