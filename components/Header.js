import {
	ChatIcon,
	HeartIcon,
	HomeIcon,
	MenuIcon,
	PlusCircleIcon,
	SearchIcon,
	UserIcon,
} from "@heroicons/react/solid";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";

export default function Header() {
	const { logout, user } = useContext(AuthContext);

	//handle Menu
	const [menuState, setMenuState] = useState(false);
	function handleMenu() {
		if (menuState) {
			setMenuState(false);
		} else {
			setMenuState(true);
		}
	}
	//navbar animation
	const navbarAnimateVariants = {
		initial: {
			y: -100,
		},
		animate: {
			y: 0,
		},
	};

	return (
		<motion.div
			variants={navbarAnimateVariants}
			initial="initial"
			animate="animate"
			transition={{ duration: 0.7, type: "spring" }}
			className="w-screen fixed z-50 top-0 h-20 flex justify-center bg-white drop-shadow-md"
		>
			<div className="max-w-5xl px-5 flex flex-grow justify-between items-center">
				<div className="text-accent text-2xl font-semibold">
					Fakegram
				</div>
				<div className="hidden bg-accent bg-opacity-10 sm:flex items-center py-2 rounded-lg px-4">
					<SearchIcon className="w-5 h-5 text-accent" />
					<input
						type="text"
						placeholder="Search"
						className="bg-transparent focus text-accent focus:outline-none ml-1"
					/>
				</div>
				<div className="flex relative md:hidden">
					<MenuIcon
						onClick={handleMenu}
						className="w-8 h-8 text-accent cursor-pointer select-none"
					/>
					<div
						className={`${
							menuState
								? "opacity-100 pointer-events-auto translate-y-0"
								: "opacity-0 pointer-events-none translate-y-10"
						} flex absolute py-5 px-6 right-0 top-16 bg-accent rounded-2xl transition-all`}
					>
						<div className="text-white">
							<button className="flex space-x-1 items-center py-2 font-semibold">
								<UserIcon className="w-7 h-7 cursor-pointer hover:drop-shadow-xl" />
								<h2>Profile</h2>
							</button>
							<button className="flex space-x-1 items-center py-2 font-semibold">
								<HomeIcon className="w-7 h-7 cursor-pointer hover:drop-shadow-xl" />
								<h2>Home</h2>
							</button>
							<button className="flex space-x-1 items-center py-2 font-semibold">
								<PlusCircleIcon className="w-7 h-7 cursor-pointer hover:drop-shadow-xl" />
								<h2>Post</h2>
							</button>
							<button className="flex space-x-1 items-center py-2 font-semibold">
								<ChatIcon className="w-7 h-7 cursor-pointer hover:drop-shadow-xl" />
								<h2>Messenger</h2>
							</button>
							<button className="flex space-x-1 items-center py-2 font-semibold">
								<HeartIcon className="w-7 h-7 cursor-pointer hover:drop-shadow-xl" />
								<h2>Follower</h2>
							</button>
						</div>
					</div>
				</div>
				{user ? (
					<div className="hidden md:flex items-center space-x-2 text-accent">
						<HomeIcon className="w-7 h-7 cursor-pointer hover:drop-shadow-xl" />
						<PlusCircleIcon className="w-7 h-7 cursor-pointer hover:drop-shadow-xl" />
						<ChatIcon className="w-7 h-7 cursor-pointer hover:drop-shadow-x" />
						<HeartIcon className="w-7 h-7 cursor-pointer hover:drop-shadow-xl" />
						<div
							onClick={logout}
							className="w-10 h-10 bg-accent rounded-full cursor-pointer hover:drop-shadow-xl overflow-hidden"
						>
							<img src={user?.photoURL} />
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</motion.div>
	);
}
