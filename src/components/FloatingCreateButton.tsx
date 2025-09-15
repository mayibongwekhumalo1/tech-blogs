'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

export default function FloatingCreateButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session?.user?.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  if (status === 'loading' || !session) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200 z-50"
      aria-label="Create Post"
    >
      <Plus size={24} />
    </button>
  );
}