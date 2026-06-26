'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

type ResetPasswordFormValues = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  const newPassword = watch('newPassword');

  async function onSubmit(values: ResetPasswordFormValues) {
    setStatusMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);

    if (values.newPassword !== values.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password', {
        token: values.token,
        newPassword: values.newPassword,
      });

      if (response.data?.success) {
        setStatusMessage(response.data.data?.message || 'Password reset successful.');
        return;
      }

      setErrorMessage(response.data?.error?.message || 'Unable to reset password.');
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
      <Card className="w-full max-w-xl p-8">
        <div className="mb-6 space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Reset password</p>
          <h1 className="text-3xl font-semibold text-secondary-900 dark:text-white">Set a new password</h1>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Enter your reset token and choose a secure new password to regain access.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Reset token"
            type="text"
            placeholder="Paste your token here"
            {...register('token', { required: 'Reset token is required' })}
            error={errors.token?.message}
            required
          />

          <Input
            label="New password"
            type="password"
            placeholder="Enter new password"
            {...register('newPassword', {
              required: 'New password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
            error={errors.newPassword?.message}
            required
          />

          <Input
            label="Confirm password"
            type="password"
            placeholder="Repeat new password"
            {...register('confirmPassword', {
              required: 'Password confirmation is required',
              validate: (value) => value === newPassword || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
            required
          />

          {errorMessage && <p className="text-sm text-error-600">{errorMessage}</p>}
          {statusMessage && <p className="text-sm text-success-600">{statusMessage}</p>}

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Reset password
          </Button>
        </form>

        <div className="mt-6 flex flex-col gap-2 text-sm text-secondary-600 dark:text-secondary-400 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
            Back to login
          </Link>
          <Link href="/auth/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
            Request token again
          </Link>
        </div>
      </Card>
    </div>
  );
}
