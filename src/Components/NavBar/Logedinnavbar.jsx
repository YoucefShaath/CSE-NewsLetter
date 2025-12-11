import Image from "next/image";

export default function Logedinnavbar() {
    return (
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
              <div className="bg-center cursor-pointer bg-no-repeat aspect-square bg-cover rounded-full w-9 h-9 border border-stone-300 dark:border-stone-700 bg-gradient-to-br from-blue to-light-blue">
                <Image src="/hackitpic.png" alt="Profile Picture" width={36} height={36} className="rounded-full"/>
              </div>

              
            </div>
          </div>
        </nav>
    )
}