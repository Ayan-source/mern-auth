import { useEffect } from 'react';

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`flex items-center gap-3 px-5 py-4 rounded-xl backdrop-blur-xl border shadow-2xl transition-all ${
          isError
            ? 'bg-red-500/10 border-red-500/20 text-red-200'
            : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-200'
        }`}
      >
        <div className={`w-2 h-2 rounded-full shrink-0 ${isError ? 'bg-red-500' : 'bg-indigo-500'}`} />
        <p className="text-xs font-medium tracking-wide">{toast.message}</p>
        <button
          onClick={onDismiss}
          className="ml-2 text-xs opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
