'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  async function onSubmit(values: ForgotPasswordFormValues) {
    setMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/auth/forgot-password', values);
      if (response.data?.success) {
        setMessage(response.data.data?.message || 'If an account exists for that email, a reset link has been sent.');
        return;
      }
      setErrorMessage(response.data?.error?.message || 'Unable to process your request.');
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error?.message || 'Request failed.'
        : 'Request failed.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-secondary-950 px-4 py-12">
      <Card className="w-full max-w-lg p-8">
        <div className="mb-6 space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Recover password</p>
          <h1 className="text-3xl font-semibold text-secondary-900 dark:text-white">Forgot your password?</h1>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Enter the email address associated with your account and we’ll send a reset instruction.
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

          {errorMessage && <p className="text-sm text-error-600">{errorMessage}</p>}
          {message && <p className="text-sm text-success-600">{message}</p>}

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Send reset instructions
          </Button>
        </form>

        <div className="mt-6 text-sm text-secondary-600 dark:text-secondary-400">
          Remembered your password?{' '}
          <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
