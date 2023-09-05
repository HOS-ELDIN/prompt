"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logo from "@public/images/logo.svg";

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropDown, setToggleDropDown] = useState(false);

	useEffect(() => {
		const settingProviders = async () => {
			const response = await getProviders();

			setProviders(response);
			// console.log(providers);
		};
		settingProviders();
		//eslint-disable-next-line
	}, []);
	return (
		<nav className="flex-between w-full mb-11 pt-3">
			<Link href={"/"} className="flex gap-2 flex-center ">
				<Image
					src={logo}
					alt="Promptopia logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>

			{/* desktop nav */}
			<div className="sm:flex hidden ">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href={"create-prompt"} className="black_btn">
							Create Post
						</Link>

						<button type="button" onClick={signOut} className="outline_btn">
							Sign Out
						</button>

						<Link href={"profile"}>
							<Image
								src={session?.user.image}
								alt="profile"
								width={37}
								height={37}
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => {
										e.preventDefault();
										signIn(provider.id);
									}}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* mobile nav */}
			<div className="sm:hidden flex relative ">
				{session?.user ? (
					<div className="flex ">
						<Image
							src={session?.user.image}
							alt="profile"
							width={37}
							height={37}
							className="rounded-full"
							onClick={() => setToggleDropDown((prev) => !prev)}
						/>

						{toggleDropDown && (
							<div className="dropdown">
								<Link
									href={"profile"}
									className="dropdown_link"
									onClick={() => setToggleDropDown(false)}
								>
									My Profile
								</Link>
								<Link
									href={"create-prompt"}
									className="dropdown_link"
									onClick={() => setToggleDropDown(false)}
								>
									Create Prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropDown(false);
										signOut();
									}}
									className="black_btn mt-5 w-full "
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => {
										e.preventDefault();
										signIn(provider.id);
									}}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};
export default Nav;
