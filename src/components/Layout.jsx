import { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function Layout({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen md:grid md:grid-cols-[18rem_1fr]">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-h-screen flex-col">
        <TopNav title={title} onMenuClick={() => setOpen(true)} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6">{children}</main>
      </div>
    </div>
  );
}
