"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logIn, signUp } from '@/data/authFunctions'; // Ensure this path is correct
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { IconBrandGoogle } from '@tabler/icons-react';
import axios from 'axios'; // For sending data to your backend

export default function SignInPage() {
  // Add new states for additional fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  
  // Existing states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [user, loading, authError] = useAuthState(auth);

  // Handle sign up and log in logic
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation
    if (isSignUp) {
      if (!firstName || !lastName || !phoneNumber || !email || !password) {
        setError('All fields are required!');
        return;
      }
  
      // Validate phone number
      const phoneRegex = /^\d{10}$/; // Regex for 10-digit phone number
      if (!phoneRegex.test(phoneNumber)) {
        setError('Phone number must be 10 digits!');
        return;
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address!');
        return;
      }
    }
  
    try {
      setError(null); // Reset error before submitting
      if (isSignUp) {
        // Sign up with Firebase
        await signUp(email, password);
        
        // Send additional data to your backend
        await axios.post('https://portfoliodatabase-e4ip.onrender.com/register', {
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          message
        });
      } else {
        // Log in with Firebase
        await logIn(email, password);
      }
      router.push('/blog'); // Redirect to blog after successful authentication
    } catch (err) {
      console.error('Authentication Error:', err);
      setError('Authentication Failed!');
    }
  };
  

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/blog'); // Redirect to blog after successful authentication
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setError('Google Sign-In Failed!');
    }
  };

  if (user) {
    router.push('/blog'); // Redirect authenticated users to the blog
    return null;
  }

  return (
    <div className="max-w-md w-full md:mb-5 border-black border-[1px] mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h1>
      <form onSubmit={handleAuth} className="my-8">
        
        {isSignUp && (
          <>
            {/* First Name */}
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

            {/* Last Name */}
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

            {/* Phone Number */}
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

            {/* Message */}
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

        {/* Email */}
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

        {/* Password */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-br from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        {/* Toggle between Sign Up and Sign In */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>

      {/* Google Sign-In Button */}
      <div className="flex flex-col space-y-4 relative top-[16px]">
        <button
          className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="button"
          onClick={handleGoogleSignIn}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Sign in with Google
          </span>
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
