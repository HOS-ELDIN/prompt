"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import tick from "@public/icons/tick.svg";
import copy from "@public/icons/copy.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { promptopiaContext } from "@utils/ContextProvider";

const PromptCard = ({
	card,
	handleTagClick,
	handleEdit,
	handleDelete,
	handleOpenProfile,
}) => {
	const [copied, setCopied] = useState("");
	const pathName = usePathname();
	// console.log(card)

	const {
		session,
		status,
	} = useContext(promptopiaContext);

	const handleCopy = () => {
		setCopied(card.prompt);
		navigator.clipboard.writeText(card.prompt);
		setTimeout(() => {
			setCopied("");
		}, 3000);
	};
	return (
		<div className="prompt_card">
			{status !== "authenticated" ? (
				<Skeleton />
			) : (
				<>
					<div className="flex justify-between items-start gap-5 ">
						<div
							className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
							onClick={() =>
								handleOpenProfile && handleOpenProfile(card.creator)
							}
						>
							<Image
								src={card.creator.image}
								alt="user_image"
								width={40}
								height={40}
								className="rounded-full object-contain"
							/>

							<div className="flex flex-col">
								<h3 className="font-satoshi font-semibold text-gray-900">
									{card.creator.username}
								</h3>
								<p className="font-inter text-sm text-gray-500">
									{card.creator.email}
								</p>
							</div>
						</div>
						<div className="copy_btn" onClick={handleCopy}>
							<Image
								src={copied === card.prompt ? tick : copy}
								alt=""
								width={12}
								height={12}
							/>
						</div>
					</div>
					<p className="my-4 font-satoshi text-sm text-gray-700">
						{card.prompt}
					</p>
					<p
						className="font-inter text-sm blue_gradient cursor-pointer"
						onClick={() => handleTagClick && handleTagClick(card.tag)}
					>
						{card.tag}
					</p>
				</>
			)}
			{session?.user.id === card.creator._id && pathName === "/profile" && (
				<div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3 ">
					<p
						className="font-inter text-sm green_gradient cursor-pointer"
						onClick={handleEdit}
					>
						Edit
					</p>
					<p
						className="font-inter text-sm orange_gradient cursor-pointer"
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};
export default PromptCard;
