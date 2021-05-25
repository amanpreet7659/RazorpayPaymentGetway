import React, { useState } from "react"
import { Button, FormControl, FormHelperText, FormLabel, Input, InputLabel, Typography } from '@material-ui/core';
import logo from '../logo.svg'
import { Formik, useFormik } from "formik";

const loadScript=(src)=> {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}
const obj = {
    name: "", amount: "", email: "", number: ""
}

const Display = () => {
    const [values, setValues] = useState(obj)
    const [price, setPrice] = useState(0)

    const validate = values => {
        const errors = {}
        // else if (values.email.length < 10) {
        //     errors.email = 'Must be 10 Characters or more '
        // }
        if (!values.name) {
            errors.name = "Required"
        } else if (values.name.length < 3) {
            errors.name = "Must have 3 charcters"
        }
        if (!values.email) {
            errors.email = "Required"
        }
        // if (!values.number) {
        //     errors.number = "Required"
        // } else if (values.number.length < 10 || values.number.length > 10) {
        //     errors.number = "Only 10 Digits"
        // }
        if (!values.amount) {
            errors.amount = "Required"
        }
        return errors
    }
    const formik = useFormik({
        initialValues: values,
        validate,
        onSubmit: values => {
            displayRazorpay()
            // alert(JSON.stringify(values, null, 2))
        }
    })
    // const handleInput = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     // setValues({ [e.target.name]: e.target.value})
    //     // {name==="name" ?setValues({[name]:value}):""}
    //     if (name === "name") {
    //         values.name = value
    //     }
    //     if (name === "amount") {
    //         values.amount = value
    //         setPrice(value)
    //     }
    //     if (name === "email") {
    //         values.email = value
    //     }
    //     if (name === "number") {
    //         values.number = values
    //     }
    //     console.log(values, 'values');
    //     // console.log(typeof(values.amount),"TypeOf");
    // }

    async function displayRazorpay() {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        const options = {
            key: 'rzp_test_TX74ra0jdm8bWW',
            currency: "INR",
            amount: formik.values.amount * 100,//data.amount.toString()
            order_id: '',//data.id
            name: formik.values.name,
            description: `Thank you for paying amount ${values.amount}`,
            image: logo,
            handler: (response) => {
                alert(response.razorpay_payment_id)
                // alert(response.razorpay_order_id)
                // alert(response.razorpay_signature)
            },
            prefill: {
                name: formik.values.name,
                email: formik.values.email,
                phone_number: formik.values.number,
                amount: formik.values.name.amount
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    return (
        <div>
            {/* <h1>Hello Aman</h1> */}
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="my-input">Enter Name</InputLabel>
                    <Input type="text" name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id="my-input" aria-describedby="my-helper-text" />
                    {formik.touched.name && formik.errors.name ? <FormHelperText>{formik.errors.name}</FormHelperText> : null}
                </FormControl><br></br>
                <FormControl>
                    <InputLabel htmlFor="my-input">Enter Email</InputLabel>
                    <Input name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="my-input" aria-describedby="my-helper-text" />
                    {formik.touched.email && formik.errors.email ? <FormHelperText>{formik.errors.email}</FormHelperText> : null}
                </FormControl><br></br>
                {/* <FormControl>
                    <InputLabel htmlFor="my-input">Enter Mobile Number</InputLabel>
                    <Input name="number" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.number} id="my-input" aria-describedby="my-helper-text" />
                    {formik.touched.number && formik.errors.number ? <FormHelperText>{formik.errors.number}</FormHelperText> : null}
                </FormControl><br></br> */}
                <FormControl>
                    <InputLabel htmlFor="my-input">Enter Amount</InputLabel>
                    <Input name="amount" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.amount} id="my-input" aria-describedby="my-helper-text" />
                    {formik.touched.amount && formik.errors.amount ? <FormHelperText>{formik.errors.amount}</FormHelperText> : null}
                    <br></br>
                    <Button type="submit" variant="contained" color="primary"  >Proceed to Pay ₹{formik.values.amount}</Button>
                </FormControl>
            </form>
        </div>
    )
}

export default Display
