"use client";
import React, { useState } from 'react';
import { signUp, logIn, logOut } from '../data/authFunctions'; // Adjust the path as necessary
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebaseConfig"; // Import your Firebase auth instance
import { IconBrandGoogle } from '@tabler/icons-react';
import axios from 'axios';

const SignupFormDemo = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // New message state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formType, setFormType] = useState<'signUp' | 'logIn'>('signUp');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password); // Firebase signup
      await axios.post('http://localhost:4000/register', { firstName, lastName, phoneNumber, email, password, message }); // Send message to backend
      setIsLoggedIn(true);
      alert('Sign Up Successful!');
    } catch (error: any) {
      console.error('Sign Up Error:', error);
      setError(error.response?.data?.msg || 'Sign Up Failed!');
    }
  };

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      setIsLoggedIn(true);
      alert('Log In Successful!');
    } catch (error: any) {
      console.error('Log In Error:', error);
      setError('Log In Failed!');
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setIsLoggedIn(false);
      alert('Logged Out Successfully!');
    } catch (error: any) {
      console.error('Log Out Error:', error);
      setError('Log Out Failed!');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      alert('Google Sign-In Successful!');
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      setError('Google Sign-In Failed!');
    }
  };

  return (
    <div className="max-w-md w-full border-black border-[1px] mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {isLoggedIn ? 'Welcome Back' : formType === 'signUp' ? 'Sign Up' : 'Log In'}
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {isLoggedIn
          ? "You are logged in. You can log out using the button below."
          : formType === 'signUp'
            ? "Create a new account."
            : "Log in to your account."
        }
      </p>

      {error && <p className="text-red-500">{error}</p>}

      {!isLoggedIn ? (
        <form
          onSubmit={formType === 'signUp' ? handleSignUp : handleLogIn}
          className="my-8"
        >
          {/* Conditionally render additional fields for sign-up */}
          {formType === 'signUp' && (
            <>
              <div className="flex flex-col space-y-2 mb-4">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border rounded-md p-2"
                />
              </div>
            </>
          )}
          {/* Email and Password - common to both sign-up and log-in */}
          <div className="flex flex-col space-y-2 mb-4">
            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col space-y-2 mb-4">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md p-2"
            />
          </div>
          
          <button
            type="submit"
            className="bg-gradient-to-br from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium"
          >
            {formType === 'signUp' ? 'Sign Up' : 'Log In'}
          </button>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setFormType(formType === 'signUp' ? 'logIn' : 'signUp')}
              className="text-blue-500"
            >
              {formType === 'signUp' ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      ) : (
        <button onClick={handleLogOut} className="bg-red-500 text-white p-2 rounded-md">
          Log Out
        </button>
      )}

      {/* Google Sign-In Button */}
      <div className="my-4">
        <button onClick={handleGoogleSignIn} className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-md">
          <IconBrandGoogle />
          <span>{isLoggedIn ? 'Continue with Google' : 'Sign In with Google'}</span>
        </button>
      </div>
    </div>
  );
};

export default SignupFormDemo;
