import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-paper text-ink">
      <AdminSidebar />
      <main className="flex-1 px-6 md:px-10 py-10 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
}
