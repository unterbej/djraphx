import { isAdminAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminLogin from '@/components/admin/AdminLogin';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const authed = await isAdminAuthenticated();
  if (authed) redirect('/admin');
  return <AdminLogin />;
}
