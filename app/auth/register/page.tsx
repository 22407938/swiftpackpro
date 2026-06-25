'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const passwordValue = watch('password');

  async function onSubmit(values: RegisterFormValues) {
    setErrorMessage(null);
    setStatusMessage(null);
    setIsSubmitting(true);

    if (values.password !== values.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.phone,
        role: 'APPLICANT',
      });

      if (response.data?.success) {
        window.localStorage.setItem('swiftpack_access_token', response.data.data.accessToken);
        window.localStorage.setItem('swiftpack_refresh_token', response.data.data.refreshToken);
        window.localStorage.setItem('swiftpack_user', JSON.stringify(response.data.data.user));
        setStatusMessage('Registration successful. Redirecting to your dashboard...');
        setTimeout(() => router.push('/dashboard/main'), 500);
        return;
      }

      setErrorMessage(response.data?.error?.message || 'Unable to create account.');
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error?.message || 'Registration request failed.'
        : 'Registration request failed.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-secondary-950 px-4 py-12">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-6 space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Create account</p>
          <h1 className="text-3xl font-semibold text-secondary-900 dark:text-white">Register for SwiftPack Pro</h1>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Create your account to access booking, operations, and staff management tools.
          </p>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="First name"
              type="text"
              placeholder="First name"
              {...register('firstName', { required: 'First name is required' })}
              error={errors.firstName?.message}
              required
            />
            <Input
              label="Last name"
              type="text"
              placeholder="Last name"
              {...register('lastName', { required: 'Last name is required' })}
              error={errors.lastName?.message}
              required
            />
          </div>

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
            label="Phone number"
            type="tel"
            placeholder="+2348012345678"
            {...register('phone')}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              error={errors.password?.message}
              required
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Repeat your password"
              {...register('confirmPassword', {
                required: 'Password confirmation is required',
                validate: (value) => value === passwordValue || 'Passwords do not match',
              })}
              error={errors.confirmPassword?.message}
              required
            />
          </div>

          {errorMessage && <p className="text-sm text-error-600">{errorMessage}</p>}
          {statusMessage && <p className="text-sm text-success-600">{statusMessage}</p>}

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Create account
          </Button>
        </form>

        <div className="mt-6 text-sm text-secondary-600 dark:text-secondary-400">
          Already registered?{' '}
          <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
