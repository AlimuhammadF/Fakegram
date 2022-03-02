import Image from "next/image";
import testImage from "../public/test.jpg";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useState, useContext, useEffect } from "react";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import AuthContext from "../context/AuthContext";
import nProgress from "nprogress";

export default function Post({ title, id, image, userImage, userName }) {
	const { user } = useContext(AuthContext);
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [topComments, setTopComments] = useState([]);
	const [commentStatus, setCommentStatus] = useState(false);

	//handle comment status
	const handleCommentStatus = () => {
		if (commentStatus) {
			setCommentStatus(false);
		} else {
			setCommentStatus(true);
		}
	};

	//handle showing data
	useEffect(() => {
		onSnapshot(
			query(
				collection(db, "posts", id, "comments"),
				orderBy("timestamp", "desc")
			),
			(snapshot) => {
				setComments(snapshot.docs);
			}
		);
	}, [db]);

	//handle adding comment
	const handleAddComment = async () => {
		nProgress.start();
		try {
			await addDoc(collection(db, "posts", id, "comments"), {
				name: user?.displayName,
				comment: comment,
				userImage: user?.photoURL,
				timestamp: serverTimestamp(),
			});
			setComment("");
			nProgress.done();
		} catch (error) {
			alert(error);
			nProgress.done();
		}
	};

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
				{/* comments */}
				<div className="px5 py-3">
					<button
						onClick={handleCommentStatus}
						className="text-sm px-3 mb-4 text-accent"
					>
						{commentStatus
							? "Hide all Comments"
							: "View all Comments"}
					</button>
					{commentStatus
						? comments.map((data) => (
								<div key={data.id}>
									<div className="flex text-sm my-1 items-center px-3 mt-2">
										<div className="w-7 h-7 rounded-full overflow-hidden">
											<img src={data.data().userImage} />
										</div>
										<div className="px-1 font-semibold">
											{data.data().name}
										</div>
										<div className="px-1">
											{data.data().comment}
										</div>
									</div>
								</div>
						  ))
						: ""}
					<div className="w-full flex mt-4 bg-gray-200">
						<input
							type="text"
							placeholder="Add Comment..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							className="bg-gray-200 w-full py-2 px-3 focus:outline-accent text-sm"
						/>
						<button
							onClick={handleAddComment}
							className="px-5 py-2 text-sm text-accent"
						>
							Comment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
