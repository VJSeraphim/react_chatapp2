import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import signinImage from '../assets/signup.jpg'

const cookies = new Cookies()

const initState={
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}

const Auth = () => {
    const [form, setForm] = useState(initState)
    const [isSignUp, setisSignUp] = useState(false)

    const handleChange = (e) => {
        setForm({ ... form, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setisSignUp((prev) => !prev)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const { fullName, userName, password, phoneNumber, avatarURL } = form
        const URL = 'http://localhost:5000/auth'

        const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'signin'}`, {
            userName, password, fullName, phoneNumber, avatarURL
        })

        cookies.set('token', token)
        cookies.set('userName', userName)
        cookies.set('fullName', fullName)
        cookies.set('userId', userId)

        if (isSignUp) {
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarURL', avatarURL)
            cookies.set('hashedPassword', hashedPassword)
        }

        window.location.reload()
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </p>
                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="userName">User Name</label>
                            <input
                                name="userName"
                                type="text"
                                placeholder="User Name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="text"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="text"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>
                                {isSignUp ? "Sign Up" : "Sign In"}
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignUp ? 
                                "Do you already have your account? " :
                                "Account not exists yet? "
                            }
                            <span onClick={switchMode}>
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth
