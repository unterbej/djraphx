import { isAdminAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect('/admin/login');
  return <AdminDashboard />;
}
