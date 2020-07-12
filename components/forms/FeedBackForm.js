import React from 'react';
import { Formik, Form, Field } from 'formik';
import PortInput from './shared/PortInput'
import PortTextArea from './shared/PortTextArea'
import {submitfeedback} from '../../actions/index'
import {toast} from 'react-toastify';
const initialValues = {
    name: '',
    comment: ''
};
const FeedBackForm = (props) => (
    <Formik
        initialValues={initialValues}
        validate={values => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (!values.comment) {
                errors.comment = 'Required';
            }
            
            return errors;
        }}

        onSubmit={(values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                setTimeout(() => {
                    alert(values);
                    props.onSubmit(values)//.then( val =>{
                        setSubmitting(false); 
                    //     alert(val);
                    // }).catch(err =>{
                    //     console.log(err);
                    //     setSubmitting(false);
                    // })
                }, 10);

            }
            catch (err) {
                console.log(err);
                props.close()
            }
        }}
    >
        {({ isSubmitting }) => (
            <Form>
                <div className="col-md-12 form-row align-items-center">
                    <div className="col-12">
                        <Field className="form-control" type="text" name="name" label="Name" component={PortInput} />
                    </div>
                    <div className="col-12">
                        <Field 
                           
                        type="email" 
                        name="email" 
                        label="Email" 
                        note='Email is optional'
                        component={PortInput}>
                        </Field>
                        
                    </div>
                    <div className="col-12">
                        <Field
                            className="form-control"
                            name="comment"
                            maxLength="100"
                            label="Feedback"
                            style={{ height: "100px" }}
                            component={PortTextArea}
                        />
                    </div>
                    <div className="col-md-12 flex-row-center">
                    {isSubmitting ?
                <button className="btn btn-primary verfyingbtn" type="button" disabled>
                  <span className="spinner-border spinner-border-sm verfyingbtn" role="status" aria-hidden="true"></span>
                  {' '}Fetching
                </button>
                :
                <button type="submit" className="btn btn-primary verfybtn" disabled={isSubmitting}>
                  Get Url
              </button>
              }
                    </div>
                </div>
            </Form>
        )}
    </Formik>

);

export default FeedBackForm;