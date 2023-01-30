import React from 'react'
import Swal from 'sweetalert2';
import axios from "axios";
import { useFormik } from "formik";
import {API} from './API'
import { useNavigate } from 'react-router-dom';

function Login() {
    const Navigation = useNavigate();

    //Alert function;
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

    let login = useFormik({
        initialValues: {
            Email: "",
            Password: ""
        },
        validate: (value) => {
            let errors = {};
            return errors
        },
        onSubmit: async (Login) => {
            try {
                let Out = await axios.post(`${API.Call}/Login`, Login);
                let watchman = Out.data;
                if (watchman.Token) {
                    Toast.fire({ icon: 'success', title: 'Signed in successfully' })
                    localStorage.setItem("Token",watchman.Token)
                    localStorage.setItem("ID",watchman.ID)
                    Navigation('/Profile')
                } else {
                    Toast.fire({ icon: 'warning', title: `${watchman.Message}` })
                }
            } catch (error) {
                Toast.fire({ icon: 'error', title: `${error.response.data.Message}` })
            }
        }
    })

    return (
        <>
            <div className="wrapper Login">
                <div className="logo">
                    <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="Twitter" />
                </div>
                <div className="text-center mt-4 name">
                    Login
                </div>
                <form className="p-3 mt-3" onSubmit={login.handleSubmit}>
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-envelope"></span>
                        <input type="text" name="Email" id="userName" placeholder="Email"  value={login.values.Email} onChange={login.handleChange} required  />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input type="password" name="Password" id="pwd" placeholder="Password" value={login.values.Password} onChange={login.handleChange} required  />
                    </div>
                    <button type='submit' className="btn mt-3">Login</button>
                </form>
                <div className="text-center fs-6">
                    Don't have Account<a href="/Register"><strong><h6>Register</h6></strong></a>
                </div>
            </div>
        </>
    )
}

export default Login