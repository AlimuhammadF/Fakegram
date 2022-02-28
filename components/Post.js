import Image from "next/image";
import testImage from "../public/test.jpg";
import { DotsVerticalIcon } from "@heroicons/react/solid";

export default function Post({ title, id, image, userImage, userName }) {
	return (
		<div className="max-w-2xl flex flex-col flex-grow border border-accent border-opacity-40 bg-white mx-5 mb-10">
			<div className="w-full ">
				{/* top portion */}
				<div className="py-3 px-5 flex justify-between items-center">
					<div className="flex items-center space-x-3 font-semibold">
						<div className="w-12 h-12 border-4 border-accent rounded-full overflow-hidden flex justify-center items-center">
							<Image
								alt=""
								src={userImage}
								width="36px"
								height="36px"
								objectFit="cover"
								className="rounded-full"
							/>
						</div>
						<h4>{userName}</h4>
					</div>
					<div>
						<DotsVerticalIcon className="w-5 h-5 text-accent cursor-pointer" />
					</div>
				</div>
				<div className="py-3 px-8 font-semibold text-gray-600">
					{title}
				</div>
				{/* Image portion */}
				<div className="w-full">
					<Image
						alt=""
						height="800px"
						width="672px"
						objectFit="cover"
						src={image}
					/>
				</div>
			</div>
		</div>
	);
}
