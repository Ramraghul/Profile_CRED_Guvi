import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { API } from './API'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useFormik } from 'formik'

function ProfileEdit() {

    const params = useParams()
    const Navigation = useNavigate()
    let userID = params.id

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

    let formik = useFormik({
        initialValues: {
            Username: "",
            Email: "",
            Age: "",
            DOB: "",
            Gender: "",
            Mobile: ""
        },
        validate: () => {
            let errors = {}
            return errors
        },
        onSubmit: async (User) => {
            try {
                await axios.put(`${API.Call}/Update/${userID}`, User);
                Toast.fire({ icon: 'success', title: 'User Data Updated' })
                Navigation('/Profile')
            } catch (error) {
                Toast.fire({ icon: 'error', title: `${error.response.data.Message}` })
            }
        }
    });


    useEffect(() => {
        datas()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    let datas = async () => {
        try {
            let check = await axios.get(`${API.Call}/Detail/${userID}`)
            formik.setValues({
                Username: check.data.Data.Username,
                Email: check.data.Data.Email,
                Age: check.data.Data.Age,
                DOB: check.data.Data.DOB,
                Gender: check.data.Data.Gender,
                Mobile: check.data.Data.Mobile
            })
        } catch (error) {
            Toast.fire({ icon: 'error', title: `${error.response.data.Message}` })
        }
    }


    return (
        <>
            <Navbar />
            <div className="container form">
                <form className="row g-3 form1 " onSubmit={formik.handleSubmit}>
                    <h5 className="text-center">User Detail Edit</h5>
                    <div className="col-6">
                        <label htmlFor="Username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Username" value={formik.values.Username} onChange={formik.handleChange} name="Username" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder='Email' value={formik.values.Email} onChange={formik.handleChange} name="Email" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="Age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="Age" placeholder="Age" value={formik.values.Age} onChange={formik.handleChange} name="Age" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="DOB" className="form-label">DOB</label>
                        <input type="text" className="form-control" id="DOB" placeholder="DOB" value={formik.values.DOB} onChange={formik.handleChange} name="DOB" disabled />
                    </div>
                    <div className="col-6">
                        <label htmlFor="Gender" className="form-label">Gender</label>
                        <input type="text" className="form-control" id="Gender" placeholder="Gender" value={formik.values.Gender} onChange={formik.handleChange} name="Gender" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Mobile" className="form-label">Mobile</label>
                        <input type="tel" className="form-control" id="Mobile" placeholder='Mobile Number' value={formik.values.Mobile} onChange={formik.handleChange} name="Mobile" />
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProfileEdit