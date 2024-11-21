"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useSession,signIn,signOut } from 'next-auth/react';
import { useState } from "react";

function Header(){
    const { data: session } = useSession()
    const path = usePathname();
    useEffect(() => {
      console.log(path);
    }, [])
    // console.log(session);
    // if (session) {
    //   return (
    //     <>
    //       Signed in as {session.user.email} <br />
    //       <button onClick={() => signOut()}>Sign out</button>
    //     </>
    //   )
    // }
//     return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn("github")}>Sign in Using Github</button>
//       <button onClick={() => signIn("google")}>Sign in Using google</button>
//     </>
//   )

const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};
  
  return (
    <div className="p-2 px-10 flex justify-between shadow-sm bg-fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-10 items-center">
        <Image src={"/logo.svg"} width={80} height={80} alt="logo"></Image>
        <ul className="hidden md:flex gap-10">
          <Link href={'/'}><li className={`'hover:bg-slate-100 px-4 p-2 cursor-pointer rounded-lg text-black' ${path=='/' && 'bg-slate-200 rounded-lg text-black'}`}>Sell</li></Link>
          <Link href={'/rent'}><li className={`'hover:bg-slate-100 px-4 p-2 cursor-pointer rounded-lg text-black' ${path=='/rent' && 'bg-slate-200 rounded-lg text-black'}`} >Rent</li></Link>
          {/*<Link href={'/'}><li className="hover:bg-slate-100 px-4 p-2 cursor-pointer rounded-lg text-black">Agent finder</li></Link>*/}
          
        </ul>
      </div>
      <div className="flex gap-2 ">
        {/* <Button className='flex gap-2'>Post<Plus className="h-5 w-5"/></Button> */}
        {/* <Link href={'/login'}><Button className='bg-white border text-black hover:bg-slate-200' variant="outline">Login</Button></Link> */}

        {/* <ul className="flex gap-2">
          <li>{session && <Image src={session.user.image} width={30} height={30} alt="logo" className='m-2 rounded-full'></Image>}</li>
          <li>{session && <Button className=" bg-black text-white px-4 p-2 rounded-lg"> {session.user.email}</Button>}</li>
          <li>{session && <Button className=" bg-black text-white px-4 p-2 rounded-lg" onClick={()=>{signOut()}}>SignOut</Button>}</li>
          </ul> */}

        <div className="relative">
      <ul className="flex gap-8 items-center">
        <Link href={'/add-new-listing'}>
          <li><Button className='flex gap-2'>Post<Plus className="h-5 w-5"/></Button></li>
        </Link>
        <li onClick={toggleDropdown} className="cursor-pointer">
          {session && (
            <Image
              src={session.user.image}
              width={30}
              height={30}
              alt="User profile"
              className="rounded-full"
            />
          )}
        </li>
      </ul>
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <ul className="py-2">
            <li className="px-4 py-2 border-b border-gray-100 break-all">{session.user.email}</li>
            <li className="px-4 py-2">
              <button
                onClick={signOut}
                className="w-full text-left text-black py-2 rounded-md hover:bg-slate-200 transition-colors duration-200"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>


        {!session && <Link href={'/login'}> <Button className="hover:bg-slate-200 hover:text-black  bg-black text-white px-4 p-4 rounded-lg">Login</Button> </Link>}
        {!session && <Link href={'/adminlogin'}> <Button className="hover:bg-slate-200 hover:text-black  bg-black text-white px-4 p-4 rounded-lg">Admin</Button> </Link>}
        
        {/* <button onClick={() => signIn("github")}>Sign in Using Github</button> */}

      </div>
    </div>
  );
};

export default Header;
