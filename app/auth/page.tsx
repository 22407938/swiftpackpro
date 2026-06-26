import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AuthIndexPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid gap-6 lg:grid-cols-2">
        <Card className="space-y-6 p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Secure access</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-secondary-900 dark:text-white">
              Access your SwiftPack Pro workspace
            </h1>
            <p className="mt-3 text-sm leading-6 text-secondary-600 dark:text-secondary-300">
              Login, register, or recover your account to manage bookings, staff, and operations across Abuja.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/auth/login" className="w-full">
              <Button variant="primary" size="lg" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/auth/register" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                Register
              </Button>
            </Link>
          </div>

          <div className="text-sm text-secondary-600 dark:text-secondary-300">
            <p>
              Forgot your password?{' '}
              <Link href="/auth/forgot-password" className="font-semibold text-primary-600 hover:text-primary-500">
                Recover account
              </Link>
            </p>
          </div>
        </Card>

        <Card className="space-y-6 p-8 bg-gradient-to-br from-sky-100/80 to-cyan-100/80 border border-sky-200 dark:from-slate-900/80 dark:to-slate-800/80 dark:border-slate-700">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary-500">SwiftPack Pro</p>
            <h2 className="mt-4 text-2xl font-semibold text-secondary-900 dark:text-white">
              The fastest way to manage staff, bookings, and customer requests.
            </h2>
            <p className="mt-3 text-sm leading-6 text-secondary-600 dark:text-secondary-300">
              Use the platform to coordinate services, verify compliance, generate AI-led work plans, and scale operations across all 18 Abuja locations.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-700">
              <p className="text-sm font-semibold text-secondary-900 dark:text-white">Complete Operations</p>
              <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">Bookings, compliance, payments, staff scheduling and analytics from one dashboard.</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-700">
              <p className="text-sm font-semibold text-secondary-900 dark:text-white">AI-Driven Support</p>
              <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">Smart assistance for service quotes, application screening, and customer messaging.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
