import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  EMPLOYEES_STYLE, JOB, NAME, SALARY, SURNAME, BRANCH_NAME
} from '../../../constants/firmStructureElements';
import { branchesValidationSchema, employeesValidationSchema } from '../../../validators/firmStructureShemas';
import FormField from './FormField';

const AddFirmStructItemForm = ({ tableStyle, setModalShowAction, addDataFromFormToFirmStruct }) => {
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
      addDataFromFormToFirmStruct({ ...submitValues, salary: +submitValues.salary });
      setModalShowAction(false);
    },
    validationSchema: tableStyle === EMPLOYEES_STYLE ? employeesValidationSchema : branchesValidationSchema,
  });
  const { t } = useTranslation(['FirmStructure', 'common']);

  return (
    <Form onSubmit={handleSubmit}>
      {
          tableStyle === EMPLOYEES_STYLE
            ? (
              <>
                <FormField
                  groupClass="mt-2"
                  type="text"
                  placeholder={t('Enter job')}
                  nameAndId={JOB}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.job}
                  label={`${t('Job')}:`}
                  errorText={errors.job && touched.job ? errors.job : ''}
                />
                <FormField
                  groupClass="mt-2"
                  type="text"
                  placeholder={t('Enter Name')}
                  nameAndId={NAME}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.name}
                  label={`${t('common:Name')}:`}
                  errorText={errors.name && touched.name ? errors.name : ''}
                />
                <FormField
                  groupClass="mt-2"
                  type="text"
                  placeholder={t('Enter Surname')}
                  nameAndId={SURNAME}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.surname}
                  label={`${t('Surname')}:`}
                  errorText={errors.surname && touched.surname ? errors.surname : ''}
                />
                <FormField
                  groupClass="mt-2 mb-2"
                  type="text"
                  placeholder={t('Enter salary')}
                  nameAndId={SALARY}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.salary}
                  label={`${t('Salary')}:`}
                  errorText={errors.salary && touched.salary ? errors.salary : ''}
                />
              </>
            )
            : (
              <FormField
                groupClass="mt-2 mb-2"
                type="text"
                placeholder={t('Enter branch name')}
                nameAndId={BRANCH_NAME}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.branchName}
                label={`${t('Branch name')}:`}
                errorText={errors.branchName && touched.branchName ? errors.branchName : ''}
              />
            )
        }
      <Button className="mb-2" variant="primary" type="submit">
        {t('Add')}
      </Button>
      <Button onClick={handleReset} className="mb-2 ms-2" variant="secondary" type="button">
        {t('Reset')}
      </Button>
    </Form>
  );
};
AddFirmStructItemForm.propTypes = {
  tableStyle: PropTypes.string.isRequired,
  setModalShowAction: PropTypes.func.isRequired,
  addDataFromFormToFirmStruct: PropTypes.func.isRequired
};

export default AddFirmStructItemForm;
