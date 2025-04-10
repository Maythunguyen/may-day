import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

export const Logo = () => {
    return (
      <Link
        href="#"
        className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
        <Image
            src="/logo.webp"         
            alt="May Day Logo"
            width={100}            
            height={100}
            className="shrink-0"  
        />
      </Link>
    );
  };
  export const LogoIcon = () => {
    return (
      <Link
        href="#"
        className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
        <Image
            src="/logo.webp"         
            alt="May Day Logo"
            width={100}            
            height={100}
            className="shrink-0"
        />
      </Link>
    );
  };