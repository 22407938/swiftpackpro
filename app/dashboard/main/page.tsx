'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const metricCards = [
  { label: 'Monthly Revenue', value: '₦2.4M', detail: '+18% from last month' },
  { label: 'Active Bookings', value: '34', detail: '12 new today' },
  { label: 'Team On Duty', value: '12', detail: '3 en route now' },
];

const recentBookings = [
  { ref: 'SWP-74821', client: 'Emeka Okafor', service: 'Deep Clean+', status: 'Confirmed', amount: '₦35,000' },
  { ref: 'SWP-74822', client: 'Fatima Hassan', service: 'Post-Construction+', status: 'Pending', amount: '₦65,000' },
  { ref: 'SWP-74823', client: 'Chidi Nwosu', service: 'Office Cleaning+', status: 'In Progress', amount: '₦28,000' },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'text-[#3b82f6]';
    case 'Pending':
      return 'text-[#f59e0b]';
    case 'In Progress':
      return 'text-[#8b5cf6]';
    default:
      return 'text-[#9ca3af]';
  }
};

export default function DashboardMainPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Dashboard</p>
          <h1 className="text-4xl font-semibold">SwiftPack Pro Admin</h1>
          <p className="text-sm text-secondary-600">Your connected admin dashboard for bookings, operations, and AI-powered business insights.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {metricCards.map((card) => (
            <Card key={card.label} className="p-6">
              <div className="text-sm font-semibold text-slate-600">{card.label}</div>
              <div className="mt-4 text-3xl font-bold text-[#0a1628]">{card.value}</div>
              <div className="mt-2 text-sm text-secondary-600">{card.detail}</div>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="col-span-2 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-600">Recent bookings</div>
                <p className="text-sm text-secondary-600">Latest booking activity in your operations.</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-5 py-4">Ref</th>
                    <th className="px-5 py-4">Client</th>
                    <th className="px-5 py-4">Service</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.ref} className="border-t border-slate-200 bg-white">
                      <td className="px-5 py-4 font-mono text-sm text-[#c9a84c]">{booking.ref}</td>
                      <td className="px-5 py-4 font-medium text-slate-900">{booking.client}</td>
                      <td className="px-5 py-4 text-secondary-600">{booking.service}</td>
                      <td className={`px-5 py-4 font-semibold ${statusColor(booking.status)}`}>{booking.status}</td>
                      <td className="px-5 py-4 font-semibold text-[#c9a84c]">{booking.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 text-sm font-semibold text-slate-600">Quick actions</div>
            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-secondary-600">Create new booking</div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-secondary-600">Review staff schedules</div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-secondary-600">View analytics summary</div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/">
                <Button variant="outline" className="w-full">View public site</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="secondary" className="w-full">Sign out</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
