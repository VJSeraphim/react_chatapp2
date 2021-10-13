import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import signinImage from '../assets/signup.jpg'

const initState = {
    fullName:'',
    userName:'',
    password:'',
    confirmPassword:'',
    phoneNumber:'',
    avatarURL:''
}

const cookies = new Cookies()

const Auth = () => {
    const [form, setForm] = useState(initState)
    const [isSignedUp, setIsSignedUp] = useState(false)

    const handleChange = (e) => {
        setForm({... form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { fullName, username, password, phoneNumber, avatarURL } = form
        const URL = 'http://localhost:5000/auth'

        const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignedUp ? 'signup' : ' signin'}`, {
            username, password, fullName, phoneNumber, avatarURL, 
        })

        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('fullName', fullName)
        cookies.set('userId', userId)

        if ( isSignedUp ) {
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarURL', avatarURL)
            cookies.set('hashedPassword', hashedPassword)
        }

        window.location.reload()
    }

    const switchMode = () => {
        setIsSignedUp((prev) => !prev)
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>
                        {isSignedUp ? 'Sign up' : 'Sign in'}
                    </p>
                    <form onSubmit={handleSubmit}>
                        {isSignedUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlfor="fullName">
                                    Full Name
                                </label>
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
                            <label htmlfor="userName">
                                User Name
                            </label>
                            <input 
                                name="userName" 
                                type="text" 
                                placeholder="User Name" 
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignedUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlfor="phoneNumber">
                                    Phone Number
                                </label>
                                <input 
                                    name="phoneNumber" 
                                    type="text" 
                                    placeholder="Phone Number" 
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignedUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlfor="avatarURL">
                                    Avatar URL
                                </label>
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
                            <label htmlfor="password">
                                Password
                            </label>
                            <input 
                                name="password" 
                                type="password" 
                                placeholder="Password" 
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignedUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlfor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input 
                                    name="confirmPassword" 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content-button">
                            <button>{isSignedUp ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                            <p>
                                { isSignedUp ? "Do you already have your account? " 
                                : "Don't you have your account yet? "
                                }
                                <span onClick={switchMode}>
                                    {isSignedUp ? 'Sign In' : 'Sign Up'}
                                </span>
                            </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in"/>
            </div>
        </div>
    )
}

export default Auth
