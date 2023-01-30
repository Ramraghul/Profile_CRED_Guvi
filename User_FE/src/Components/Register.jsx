import React from 'react'
import Swal from 'sweetalert2';
import axios from "axios";
import { useFormik } from "formik";
import { API } from './API'
import { useNavigate } from 'react-router-dom';

function Register() {
    const Navigation = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    //Registration method;
    let formik = useFormik({
        initialValues: {
            Username: "",
            Password: "",
            Email: "",
            Age: "",
            DOB: "",
            Gender: "",
            Mobile:""
        },
        validate: () => {
            let errors = {}
            return errors
        },
        onSubmit: async (User) => {
            try {
                await axios.post(`${API.Call}/Register`, User);
                Toast.fire({ icon: 'success', title: 'Registration successfully' })
                Navigation('/')
            } catch (error) {
                Toast.fire({ icon: 'error', title: `${error.response.data.Message}` })
            }
        }
    });
    return (
        <>
            <div className="wrapper">
                <div className="text-center name">
                    Register
                </div>
                <form className="p-3 mt-3" onSubmit={formik.handleSubmit}>
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input type="text" name="Username" id="userName" placeholder="Username" value={formik.values.Username} onChange={formik.handleChange} required />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input type="password" name="Password" id="pwd" placeholder="Password" value={formik.values.Password} onChange={formik.handleChange} required />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-envelope"></span>
                        <input type="email" name="Email" placeholder="Email" value={formik.values.Email} onChange={formik.handleChange} required/>
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-child"></span>
                        <input type="number" name="Age" placeholder="Age" value={formik.values.Age} onChange={formik.handleChange} required  />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-calendar"></span>
                        <input type="month" name="DOB" placeholder="DOB" value={formik.values.DOB} onChange={formik.handleChange} required />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-transgender"></span>
                        <input type="text" name="Gender" placeholder="Gender" value={formik.values.Gender} onChange={formik.handleChange} required/>
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-phone"></span>
                        <input type="tel" name="Mobile" placeholder="Mobile" value={formik.values.Mobile} onChange={formik.handleChange} required />
                    </div>
                    <button type='submit' className="btn mt-3">Register</button>
                </form>
                <div className="text-center fs-6">
                    Already have Account <a href="/"><strong><h6>Sign up</h6></strong></a>
                </div>
            </div>
        </>
    )
}

export default Register