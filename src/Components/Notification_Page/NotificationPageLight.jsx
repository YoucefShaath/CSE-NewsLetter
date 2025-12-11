import Image from "next/image";


export default function NotificationPageLight()
{
  return (
    <div className="flex flex-col relative overflow-hidden bg-white min-h-screen py-8 ">
  
      <Image 
        src="/waves.svg" 
        alt="background element"
        width={1565} 
        height={50}
        className=" absolute o-59 top-[807px] right-[270px] "
      />

      <Image 
      src="/waves2.svg"
      alt="backgound element" 
      width={1565} 
      height={777}
      className="absolute o-59 top-[157px] left-[59px]" />

      <div className="flex items-center ml-[97px] mt-[177px] mb-[67px] ">
        <div className="w-2.5 h-[60px] bg-[rgba(10,29,63,0.80)] blur-[2px] mr-4"></div>
        <div className="text-light-blue text-[48px] normal-case flex-1 relative">Notifications</div>
      </div>
    

      <div className="flex items-center flex-col">
        <div className="relative"> 
          <div className="flex w-[1008px] h-[95px] rounded-[15px] border border-white bg-blue blur-[2px] items-center mb-[50px] justify-evenly ">
            <div className="w-[3px] h-[60px] bg-[rgba(255,255,255,0.50)] blur-[2px] "></div>
            <div className="w-[3px] h-[60px] bg-[rgba(255,255,255,0.50)] blur-[2px] " ></div>
          </div>
          <div className="absolute flex flex-row justify-between items-center w-[800px] top-5 left-[140px] ">
            <button className=" shrink-0 text-white  text-[36px] capitalize border-none p-0 m-0 cursor-pointer ">All</button>
            <button className=" shrink-0 text-white  text-[36px] capitalize border-none p-0 m-0 cursor-pointer ">Unread</button>
            <button className=" shrink-0 text-white  text-[36px] capitalize border-none p-0 m-0 cursor-pointer ">Mentions</button>
          </div>
        </div>
       

        <div className="relative ">
          <div className="flex flex-col items-center h-[592px] w-[1008px] rounded-[15px] border border-white bg-blue blur-[2px] "></div>
          <div className="absolute top-[47px] left-[63px] ">
            <div className="w-[1008px] flex flex-row items-center gap-x-[33px] mb-[68px] ">
              <div className="  w-[121px] h-[121px] rounded-[60px] bg-white opacity-10 "></div>
              <div className="flex-1 ">
                <p className="text-white text-[36px] capitalize">Departement</p>
                <p className="text-white text-[24px] capitalize">Some Text Some Text Some Text Some Text Some Text Some Text </p> 
              </div>
            </div> 
              
            <div className="w-[1008px] flex flex-row items-center gap-x-[33px] mb-[68px]">
              <div className="w-[121px] h-[121px] rounded-[60px] bg-white opacity-10"></div>
              <div className="flex-1">
                <p className="text-white text-[36px] capitalize">Departement</p>
                <p className="text-white text-[24px] capitalize">Some Text Some Text Some Text Some Text Some Text Some Text </p> 
              </div>
            </div>

            <div className="w-[1008px] flex flex-row items-center gap-x-[33px] mb-[68px]">
              <div className="w-[121px] h-[121px] rounded-[60px] bg-white opacity-10"></div>
              <div className="flex-1">
                <p className="text-white text-[36px] capitalize">Departement</p>
                <p className="text-white text-[24px] capitalize">Some Text Some Text Some Text Some Text Some Text Some Text </p> 
              </div>
            </div>

          </div>
        </div> 
      </div>  
       
    </div>

  );
}