import { Menu } from 'lucide-react';

export default function TopNav({ onMenuClick, title }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="btn-secondary md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div>
          <p className="text-xs text-slate-500">Unfiltered OS</p>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      </div>
    </header>
  );
}
