import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email:yup.string().email('Email is invalid').required('Email is required'),
    password:yup.string().required('A password is required'),
    agree:yup.boolean().oneOf([true],'You must agree to the Terms of Service')
})

const Form = props => {
    const {users, setUsers} = props;
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        agree: false,
      })
    const [disabled, setDisabled] = useState(true)
    const [errors, setErrors] = useState({
        name:'',
        email:'',
        password:'',
        agree: ''
    })
    

    const handleChange = event => {
        const {checked, value, name, type} = event.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormErrors(name, valueToUse)
        setForm({...form, [name]: valueToUse})
    }

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => setErrors({...errors, [name]:''}))
            .catch(err => setErrors({...errors, [name]:err.errors[0]}))
    }

    useEffect(() => {
        schema.isValid(form).then(valid => setDisabled(!valid))
    }, [form])

    const handleSubmit = event => {
        event.preventDefault()
        const newUser = { name: form.name.trim(), email: form.email.trim(), password: form.password, agree: form.agree}
        axios.post('https://reqres.in/api/users', newUser)
            .then(res => {
                const {name, email, createdAt, id} = res.data
                setUsers([...users, {
                    userId:[id],
                    name: [name],
                    email:[email],
                    createdAt: [createdAt]
                }])
                debugger
            })
            .catch(err => {
                debugger
            })
    }

    return(
        <div>
            <div style={{color: 'red'}}>
                <div>{errors.name}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.agree}</div>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input onChange={handleChange} value={form.name} name="name" type="text" data-cy='name'/>
                </label>
                <label>
                    Email:
                    <input onChange={handleChange} value={form.email} name="email" type="text" data-cy='email'/>
                </label>
                <label>
                    Password:
                    <input onChange={handleChange} value={form.password} name="password" type="text" data-cy='password'/>
                </label>
                <label>
                    Do you agree to the Terms of Service?
                    <input onChange={handleChange} checked={form.agree} name="agree" type="checkbox" data-cy='agree'/>
                </label>
                <button disabled={disabled}>Submit</button>
            </form>
        </div>
    )
}

export default Form