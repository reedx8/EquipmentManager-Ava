'use client';
import React from 'react';
// import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../config/supabaseClient';
import styles from './login.module.css';

export default function LogIn() {
    const router = useRouter();

    async function handleLogin(event) {
        // console.log('handleLogin');
        event.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: event.target.email.value,
            password: event.target.password.value,
        });

        if (error) {
            alert('Error logging in: ' + error.message);
        } else {
            console.log('Logged in as user: ', data.user);
            router.push('/'); // Redirect to the home page after successful login
        }
    }

    /*
    // TODO?
    const handleLoginWithGoogle = async (event) => {
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
    */

    return (
        <div className={styles.pageContent}>
            <div className={styles.loginContainer}>
                <h1>Login to Ava</h1>
                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <label htmlFor='username'>Email</label>
                    <input
                        id='email'
                        type='email'
                        name='email'
                        placeholder='Email'
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        placeholder='Password'
                    />
                    <button type='submit'>Submit</button>
                </form>

                {/* <button onClick={handleLogin}>Sign in with Google</button> */}
            </div>
        </div>
    );
}
