'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface AskedTopic {           // "2025-08-07"
  title: string;           // "How to integrate Stripe webhooks?"
  time: string;            // "10:32 AM"
  tags: string[];          // ["Stripe", "Backend", "Webhooks"]
}

const topicsData: { date: string; topics: AskedTopic[] }[] = [
  {
    date: '7 Aug, 2025',
    topics: [
      {
            title: 'How to integrate Stripe webhooks?',
            time: '10:32 AM',
            tags: ['Stripe', 'Backend', 'Webhooks'],
        
      },
      {
            title: 'RBAC with Laravel Sanctum?',
            time: '2:45 PM',
            tags: ['Laravel', 'Auth', 'Sanctum'],
    
      }
    ]
  },
  {
    date: '6 Aug, 2025',
    topics: [
      {
            title: 'Next.js login form best practices?',
            time: '11:12 AM',
            tags: ['Next.js', 'Auth', 'React', 'TypeScript'],
         
      }
    ]
  }
];

export default function AskedTopicsTimeline() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-[40%] p-4">
      {topicsData.map((section, i) => (
        <div key={i}>
          <div className="ps-2 my-2">
            <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
              {section.date}
            </h3>
          </div>

          {section.topics.map((topic, index) => (
            <div key={index} className="flex gap-x-3">
           
              <div className="relative after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-orange-500"></div>
                </div>
              </div>

             
              <div className="grow pb-8">
                <h3 className="text-md font-pt  font-medium text-gray-800 dark:text-white">
                  {topic.title}
                </h3>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-neutral-400">
                  {topic.time}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {topic.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-600 text-sm font-medium px-2 py-0.5 rounded dark:bg-neutral-700 dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className='flex items-center gap-1 mt-2 text-sm text-blue-600 font-medium decoration-2 hover:underline focus:outline-none focus:underline font-sans dark:text-blue-500'>Continue Sessions <ArrowRight className='w-4 h-4'/></button>

              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Show older */}
      <div className="ps-2 -ms-px flex gap-x-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-start inline-flex items-center gap-x-1 text-sm text-blue-600 font-medium decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
        >
          <svg
            className="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
          {isOpen ? 'Hide older' : 'Show older'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4">
          <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
            1 Aug, 2025
          </h3>
          <div className="flex gap-x-3 mt-2">
            <div className="relative">
              <div className="z-10 size-7 flex justify-center items-center">
                <div className="size-2 rounded-full bg-blue-600"></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                Using Prisma with PostgreSQL
              </h3>
              <p className="text-xs text-gray-500">4:15 PM</p>
              <div className="flex gap-1 mt-1">
                <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded dark:bg-neutral-700 dark:text-neutral-300">
                  Prisma
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded dark:bg-neutral-700 dark:text-neutral-300">
                  SQL
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
