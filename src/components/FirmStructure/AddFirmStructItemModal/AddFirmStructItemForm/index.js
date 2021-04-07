import React from 'react'
import {Button, Form} from 'react-bootstrap'
import {useFormik} from 'formik'
import {EMPLOYEES_STYLE, JOB, NAME, SALARY, SURNAME} from '../../common/constants'
import {branchesValidationSchema, employeesValidationSchema} from '../../common/validators'

const BRANCH_NAME = 'branchName'
const FormField = ({
                       groupClass, type, placeholder, nameAndId, value,
                       label, errorText = '', handleBlur, handleChange
                   }) =>
        <Form.Group className={groupClass}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                    autoComplete="off"
                    id={nameAndId}
                    name={nameAndId}
                    type={type}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={value}
                    placeholder={placeholder}
            />
            <Form.Text className="text-danger">
                {errorText}
            </Form.Text>
        </Form.Group>

const AddFirmStructItemForm = ({tableStyle, setModalShow, addDataFromFormToFirmStruct}) => {
    const {handleSubmit, handleChange, values, handleBlur, handleReset, errors, touched} = useFormik({
        initialValues: tableStyle === EMPLOYEES_STYLE ? {
            job: '',
            name: '',
            surname: '',
            salary: '',
        } : {
            branchName: ''
        },
        onSubmit: values => {
            addDataFromFormToFirmStruct(values)
            setModalShow(false)
        },
        validationSchema: tableStyle === EMPLOYEES_STYLE ? employeesValidationSchema : branchesValidationSchema,
    })
    return (
            <Form onSubmit={handleSubmit}>
                {
                    tableStyle === EMPLOYEES_STYLE
                            ? <>
                                <FormField groupClass={'mt-2'}
                                           type={'text'}
                                           placeholder={'Enter job'}
                                           nameAndId={JOB}
                                           handleBlur={handleBlur}
                                           handleChange={handleChange}
                                           value={values.job}
                                           label={'Job:'}
                                           errorText={errors.job && touched.job ? errors.job : ''}
                                />
                                <FormField groupClass={'mt-2'}
                                           type={'text'}
                                           placeholder={'Enter Name'}
                                           nameAndId={NAME}
                                           handleBlur={handleBlur}
                                           handleChange={handleChange}
                                           value={values.name}
                                           label={'Name:'}
                                           errorText={errors.name && touched.name ? errors.name : ''}
                                />
                                <FormField groupClass={'mt-2'}
                                           type={'text'}
                                           placeholder={'Enter Surname'}
                                           nameAndId={SURNAME}
                                           handleBlur={handleBlur}
                                           handleChange={handleChange}
                                           value={values.surname}
                                           label={'Surname:'}
                                           errorText={errors.surname && touched.surname ? errors.surname : ''}
                                />
                                <FormField groupClass={'mt-2 mb-2'}
                                           type={'text'}
                                           placeholder={'Enter Salary'}
                                           nameAndId={SALARY}
                                           handleBlur={handleBlur}
                                           handleChange={handleChange}
                                           value={values.salary}
                                           label={'Salary:'}
                                           errorText={errors.salary && touched.salary ? errors.salary : ''}
                                />
                            </>
                            : <FormField groupClass={'mt-2 mb-2'}
                                         type={'text'}
                                         placeholder={'Enter Branch Name'}
                                         nameAndId={BRANCH_NAME}
                                         handleBlur={handleBlur}
                                         handleChange={handleChange}
                                         value={values.branchName}
                                         label={'Branch Name:'}
                                         errorText={errors.branchName && touched.branchName ? errors.branchName : ''}
                            />
                }
                <Button className={'mb-2'} variant="primary" type="submit">
                    Add Item
                </Button>
                <Button onClick={handleReset} className={'mb-2 ms-2'} variant="secondary" type="button">
                    Reset
                </Button>
            </Form>
    )
}
export default AddFirmStructItemForm