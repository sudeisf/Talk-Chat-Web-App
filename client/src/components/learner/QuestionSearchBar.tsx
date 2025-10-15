'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function QuestionSearchBar() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3">
          <Search className="h-4 w-4 text-gray-400 dark:text-white/60" />
        </div>
        <input
          type="text"
          placeholder="Search or type a command"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-gray-300  rounded-sm shadow-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>
    </div>
  );
}
