'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  async function onSubmit(values: LoginFormValues) {
    setErrorMessage(null);
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/auth/login', values);
      if (response.data?.success) {
        window.localStorage.setItem('swiftpack_access_token', response.data.data.accessToken);
        window.localStorage.setItem('swiftpack_refresh_token', response.data.data.refreshToken);
        window.localStorage.setItem('swiftpack_user', JSON.stringify(response.data.data.user));
        setStatusMessage('Login successful. Redirecting to your dashboard...');
        setTimeout(() => router.push('/dashboard/main'), 500);
        return;
      }

      setErrorMessage(response.data?.error?.message || 'Unable to sign in.');
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error?.message || 'Login request failed.'
        : 'Login request failed.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-secondary-950 px-4 py-12">
      <Card className="w-full max-w-lg p-8">
        <div className="mb-6 space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Welcome back</p>
          <h1 className="text-3xl font-semibold text-secondary-900 dark:text-white">Login to SwiftPack Pro</h1>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Access your dashboard for bookings, staff, and operations management.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
            error={errors.email?.message}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            {...register('password', {
              required: 'Password is required',
            })}
            error={errors.password?.message}
            required
          />

          {errorMessage && <p className="text-sm text-error-600">{errorMessage}</p>}
          {statusMessage && <p className="text-sm text-success-600">{statusMessage}</p>}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
              Sign in
            </Button>
            <Link href="/auth/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              Forgot password?
            </Link>
          </div>
        </form>

        <div className="mt-6 text-sm text-secondary-600 dark:text-secondary-400">
          Don’t have an account?{' '}
          <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
            Register here
          </Link>
        </div>
      </Card>
    </div>
  );
}
