'use client';

import { Pause } from 'lucide-react';

export const FocusButton = () => {
  return (
    <button className="w-full text-[1.3125rem] flex flex-row gap-2 items-center justify-center py-3 bg-green-50 rounded shadow-focusBtn active:scale-95 transition-transform">
      <Pause className="text-transparent fill-green-700" />
      <span>
        오늘 <strong className="text-green-700">56분 집중</strong>했어요.
      </span>
    </button>
  );
};
