import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import {
  EMPLOYEES_STYLE, JOB, NAME, SALARY, SURNAME, BRANCH_NAME
} from '../../../constants/firmStructureElements';
import { branchesValidationSchema, employeesValidationSchema } from '../../../validators/firmStructureShemas';
import FormField from './FormField';
import withTranslation from '../../../HOC/withTranslation';
import withAppLanguageConsumer from '../../../HOC/withAppLanguageConsumer';

const AddFirmStructItemForm = ({
  tableStyle, setModalShow, addDataFromFormToFirmStruct, appLanguage, getTranslation = () => null
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
  const defaultAppTranslation = {
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
  };
  const appTranslation = getTranslation(appLanguage) || defaultAppTranslation;

  return (
    <Form onSubmit={handleSubmit}>
      {
          tableStyle === EMPLOYEES_STYLE
            ? (
              <>
                <FormField
                  groupClass="mt-2"
                  type="text"
                  placeholder={appTranslation.placeholderJob}
                  nameAndId={JOB}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.job}
                  label={`${appTranslation.labelJob}:`}
                  errorText={errors.job && touched.job ? errors.job : ''}
                />
                <FormField
                  groupClass="mt-2"
                  type="text"
                  placeholder={appTranslation.placeholderName}
                  nameAndId={NAME}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.name}
                  label={`${appTranslation.labelName}:`}
                  errorText={errors.name && touched.name ? errors.name : ''}
                />
                <FormField
                  groupClass="mt-2"
                  type="text"
                  placeholder={appTranslation.placeholderSurname}
                  nameAndId={SURNAME}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.surname}
                  label={`${appTranslation.labelSurname}:`}
                  errorText={errors.surname && touched.surname ? errors.surname : ''}
                />
                <FormField
                  groupClass="mt-2 mb-2"
                  type="text"
                  placeholder={appTranslation.placeholderSalary}
                  nameAndId={SALARY}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.salary}
                  label={`${appTranslation.labelSalary}:`}
                  errorText={errors.salary && touched.salary ? errors.salary : ''}
                />
              </>
            )
            : (
              <FormField
                groupClass="mt-2 mb-2"
                type="text"
                placeholder={appTranslation.placeholderBranchName}
                nameAndId={BRANCH_NAME}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.branchName}
                label={`${appTranslation.labelBranchName}:`}
                errorText={errors.branchName && touched.branchName ? errors.branchName : ''}
              />
            )
        }
      <Button className="mb-2" variant="primary" type="submit">
        {appTranslation.addItem}
      </Button>
      <Button onClick={handleReset} className="mb-2 ms-2" variant="secondary" type="button">
        {appTranslation.resetForm}
      </Button>
    </Form>
  );
};
AddFirmStructItemForm.propTypes = {
  appLanguage: PropTypes.string.isRequired,
  getTranslation: PropTypes.func.isRequired,
  tableStyle: PropTypes.string.isRequired,
  setModalShow: PropTypes.func.isRequired,
  addDataFromFormToFirmStruct: PropTypes.func.isRequired
};

export default compose(
  withAppLanguageConsumer,
  withTranslation,
)(AddFirmStructItemForm);
