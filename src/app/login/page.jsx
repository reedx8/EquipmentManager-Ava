'use client';
import React from 'react';
import supabase from '../config/supabaseClient';
import styles from './login.module.css';

export default function LogIn() {
    const handleLogin = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            alert('Error logging in: ' + error.message);
        } else {
            alert('Logged in as ' + user.email);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h1>Login</h1>
            <button onClick={handleLogin}>Sign in with Google</button>
            {/* <form className={styles.loginForm} onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' name='email' />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form> */}
        </div>
    );
}
