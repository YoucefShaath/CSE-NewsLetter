"use client";
import React, { useState } from 'react';
import Navbar from '../NavBar/Logedinnavbar.jsx';

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
        <Navbar />  
        

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