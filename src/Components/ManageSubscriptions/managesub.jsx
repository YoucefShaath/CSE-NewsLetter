"use client";
import React, { useState } from 'react';
import Image from "next/image";

export default function SubscriptionPage() {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Design',
      description: 'Fresh stories on creative workflows, visual design trends, and the evolving craft of shaping clean, modern digital aesthetics.',
      following: false
    },
    {
      id: 2,
      name: 'Communication',
      description: 'Updates on emerging communication technologies, messaging ecosystems, and how information moves across today’s connected world.',
      following: true
    },
    {
      id: 3,
      name: 'Relations and Events',
      description: 'Highlights from key tech events, community updates, and insights into partnerships, collaborations, and industry happenings.',
      following: false
    },
    {
      id: 4,
      name: 'UI/UX',
      description: 'New ideas in interaction design, user psychology, and practical techniques for building intuitive, frictionless user experiences.',
      following: true
    },
    {
      id: 5,
      name: 'Developement',
      description: 'Latest developer-focused news, from new tools and frameworks to coding techniques and performance-driven engineering practices.',
      following: false
    }
    
  ]);

  const toggleFollow = (id) => {
    setDepartments(departments.map(dept => 
      dept.id === id ? { ...dept, following: !dept.following } : dept
    ));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-cover bg-[url('/bg-persInfsm.png')]  md:bg-[url('/bg-persInf.png')] bg-dark-blue tracking-[2px] " style={{ fontFamily: 'Times New Roman' }} >
      <div className="flex h-full grow flex-col">
        {/* Header */}
        <nav className="flex items-center justify-between whitespace-nowrap border-b-2 border-solid border-gray-900 px-10 py-3 bg-dark-blue/10 backdrop-blur-lg  sticky top-0 z-10 backdrop-blur-sm">
           

          <div className="flex items-center gap-4">
            <Image src="/darklogo.svg" alt="CSE Logo" width={35} height={35} />
            <h1 className="text-xl font-black tracking-tight text-white pl-[600px]">CSE NEWSLETTER</h1>
          </div>
          <div className="flex flex-1 justify-end gap-8 items-center">
            <div className="flex items-center gap-8">
              <a className="text-white dark:text-stone-400 hover:text-light-blue dark:hover:text-stone-200 text-sm font-medium" href="#">Home</a>
              <a className="text-white dark:text-stone-400 hover:text-light-blue dark:hover:text-stone-200 text-sm font-medium" href="#">My Feed</a>
              <a className="text-white dark:text-stone-200 text-sm font-bold border-b-2 border-gray-900 dark:border-stone-200 pb-1" href="#">Subscriptions</a>
            </div>
            <div className="flex gap-2 items-center">
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 w-9 border border-stone-300 dark:border-stone-700 text-gray-600 dark:text-stone-400 hover:bg-black/5 dark:hover:bg-white/5">
                <span className="text-xl">🔍</span>
              </button>
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 w-9 border border-stone-300 dark:border-stone-700 text-gray-600 dark:text-stone-400 hover:bg-black/5 dark:hover:bg-white/5">
                <span className="text-xl">🔔</span>
              </button>
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-9 h-9 border border-stone-300 dark:border-stone-700 bg-gradient-to-br from-blue to-light-blue"></div>

              
            </div>
          </div>
        </nav>
        <div>
        </div>

        {/* Main Content */}
        <main className="px-10 flex flex-1 justify-center py-10">
          <div className="flex flex-col w-full max-w-6xl">
            <div className="flex flex-col gap-2 p-4 mb-8 border-b-2 border-white">
              <h2 className="text-white text-5xl font-black leading-tight tracking-tight">Manage Subscriptions</h2>
              <p className="text-white text-lg">Choose the departmental columns you wish to follow for the latest dispatches.</p>
            </div>

            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {departments.map((dept, index) => (
                <div 
                  key={dept.id}
                  className={`flex flex-col gap-1 pr-8 ${
                    index % 3 !== 2 ? 'lg:border-r border-white' : ''
                  } ${
                    index % 2 !== 1 ? 'md:border-r border-w lg:border-r-0' : 'md:border-r-0'
                  } ${
                    index === 2 ? 'lg:border-r-0' : ''
                  }`}
                >
                  <div className="flex flex-col gap-3 py-4 
                     border-b border-dashed border-stone-300 dark:border-stone-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col">
                        <h3 className="font-bold text-lg text-white">{dept.name}</h3>
                        <p className="text-sm text-gray-400">{dept.description}</p>
                      </div>
                      <button 
                        onClick={() => toggleFollow(dept.id)}
                        className={`flex min-w-[96px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors ${
                          dept.following
                            ? 'bg-light-blue text-white border border-blue hover:bg-blue'
                            : 'border border-light-blue text-white  hover:bg-gray-900 hover:text-amber-50 '
                        }`}
                      >
                        <span className="truncate">{dept.following ? 'Following' : 'Follow'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}