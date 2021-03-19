import React from 'react'
import {Button, Form} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'

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
    const employeesStyleSchema = Yup.object().shape({
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
    })
    const branchesStyleSchema = Yup.object().shape({
        branchName: Yup.string()
                .min(3, 'Too Short!')
                .max(30, 'Too Long!')
                .required('This field is Required!'),
    })
    const {handleSubmit, handleChange, values, handleBlur, handleReset, errors, touched} = useFormik({
        initialValues: tableStyle === 'employeesStyle' ? {
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
        validationSchema: tableStyle === 'employeesStyle' ? employeesStyleSchema : branchesStyleSchema,
    })
    return (
            <Form onSubmit={handleSubmit}>
                {
                    tableStyle === 'employeesStyle'
                            ? <>
                                <FormField groupClass={'mt-2'}
                                           type={'text'}
                                           placeholder={'Enter job'}
                                           nameAndId={'job'}
                                           handleBlur={handleBlur}
                                           handleChange={handleChange}
                                           value={values.job}
                                           label={'Job:'}
                                           errorText={errors.job && touched.job ? errors.job : ''}
                                />

                                <FormField groupClass={'mt-2'}
                                           type={'text'}
                                           placeholder={'Enter Name'}
                                           nameAndId={'name'}
                                           handleBlur={handleBlur}
                                           handleChange={handleChange}
                                           value={values.name}
                                           label={'Name:'}
                                           errorText={errors.name && touched.name ? errors.name : ''}
                                />

                                <FormField groupClass={'mt-2'}
                                           type={'text'}
                                           placeholder={'Enter Surname'}
                                           nameAndId={'surname'}
                                           handleBlur={handleBlur}
                                           handleChange={handleChange}
                                           value={values.surname}
                                           label={'Surname:'}
                                           errorText={errors.surname && touched.surname ? errors.surname : ''}
                                />

                                <FormField groupClass={'mt-2 mb-2'}
                                           type={'text'}
                                           placeholder={'Enter Salary'}
                                           nameAndId={'salary'}
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
                                         nameAndId={'branchName'}
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