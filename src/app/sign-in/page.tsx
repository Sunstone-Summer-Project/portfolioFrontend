"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logIn, signUp } from '@/data/authFunctions'; // Ensure this path is correct
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { IconBrandGoogle } from '@tabler/icons-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [user, loading, authError] = useAuthState(auth);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
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
    <div className="max-w-md w-full border-black border-[1px] mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h1>
      <form onSubmit={handleAuth} className="my-8">
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
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
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
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
