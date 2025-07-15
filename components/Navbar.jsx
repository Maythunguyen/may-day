"use client";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/ResizableNavbar";
import { useState } from "react";
import { navItems } from "@/data";

export function NavbarSection() {
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleSignUp = () => {
   	 	router.push("/sign-up");
  	};

	const handleLogin = () => {
		router.push("/sign-in");
	};

	return (
		<div className="relative w-full">
		<Navbar>
			{/* Desktop Navigation */}
			<NavBody>
			<NavbarLogo />
			<NavItems items={navItems} />
			<div className="flex items-center gap-4">
				<NavbarButton variant="secondary" onClick={handleLogin}>
					Login
				</NavbarButton>
				<NavbarButton variant="primary" onClick={handleSignUp}>
					Sign up
				</NavbarButton>
			</div>
			</NavBody>

			{/* Mobile Navigation */}
			<MobileNav>
			<MobileNavHeader>
				<NavbarLogo />
				<MobileNavToggle
				isOpen={isMobileMenuOpen}
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				/>
			</MobileNavHeader>

			<MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
				{navItems.map((item, idx) => (
				<a
					key={`mobile-link-${idx}`}
					href={item.link}
					onClick={() => setIsMobileMenuOpen(false)}
					className="relative text-neutral-600 dark:text-neutral-300"
				>
					<span className="block">{item.name}</span>
				</a>
				))}

				<div className="flex w-full flex-col gap-4 mt-4">
				{/* Mobile login */}
				<NavbarButton
					onClick={() => {
					setIsMobileMenuOpen(false);
					handleLogin();
					}}
					variant="secondary"
					className="w-full"
				>
					Login
				</NavbarButton>

				{/* Mobile signup */}
				<NavbarButton
					onClick={() => {
					setIsMobileMenuOpen(false);
					handleSignUp();
					}}
					variant="primary"
					className="w-full"
				>
					Sign up
				</NavbarButton>
				</div>
			</MobileNavMenu>
			</MobileNav>
		</Navbar>
		</div>
	);
}
