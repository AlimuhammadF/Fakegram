import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import nProgress from "nprogress";
import AuthContext from "../context/AuthContext";
import uniqueString from "unique-string";
import Error from "./StatusCode/Error";
import Success from "./StatusCode/Success";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/solid";

export default function AddPost() {
	const { user } = useContext(AuthContext);

	//handling errorStatus
	const [errorCode, setErrorCode] = useState(null);
	const cancelErrorCode = () => {
		if (errorCode) {
			setErrorCode(null);
		}
	};
	useEffect(() => {
		if (errorCode) {
			setTimeout(() => {
				setErrorCode(null);
			}, 2500);
		}
	}, errorCode);

	//handle successStatus
	const [successCode, setSuccessCode] = useState(null);
	const cancelSuccessCode = () => {
		if (successCode) {
			setSuccessCode(null);
		}
	};
	useEffect(() => {
		if (successCode) {
			setTimeout(() => {
				setSuccessCode(null);
			}, 2500);
		}
	}, successCode);

	//image display
	const [imagePicker, setImagePicker] = useState(null);
	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = (readerEvent) => {
			setImagePicker(readerEvent.target.result);
		};
	};

	//adding post
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState("");

	async function handleAddingPost() {
		if (!title) {
			setErrorCode("Please set a title");
		} else if (!imagePicker) {
			setErrorCode("please set an image");
		} else {
			setLoading(true);
			nProgress.start();
			const id = uniqueString();
			try {
				const imageRef = ref(storage, "posts/" + id + "/image");
				await setDoc(doc(db, "posts", id), {
					title: title,
					image: "https://firebasestorage.googleapis.com/v0/b/fakegram-e6635.appspot.com/o/Frame%206.png?alt=media&token=be7e738c-a5de-43a3-b405-042b27cab406",
					userUid: user?.uid,
					userImage: user?.photoURL,
					postId: id,
					userName: user?.displayName,
				});
				await uploadString(imageRef, imagePicker, "data_url").then(
					async (snapshot) => {
						const downloadULR = await getDownloadURL(imageRef);
						await updateDoc(doc(db, "posts", id), {
							image: downloadULR,
						});
					}
				);
				setTitle("");
				setImagePicker(null);
				setLoading(false);
				nProgress.done();
				setSuccessCode("Post has been uploaded");
			} catch (error) {
				alert(error);
				setLoading(false);
				nProgress.done();
			}
		}
	}

	return (
		<div>
			<Success
				successCode={successCode}
				cancelSuccessCode={cancelSuccessCode}
			/>
			<Error errorCode={errorCode} cancelErrorCode={cancelErrorCode} />
			<div className="w-screen flex justify-center mt-8">
				<div className="max-w-2xl mx-5 flex flex-col flex-grow bg-white border border-accent border-opacity-40 py-6 px-8 rounded-2xl">
					<div className="flex">
						{imagePicker ? (
							<div className="w-72 mr-4 rounded-2xl overflow-hidden">
								<img src={imagePicker} alt="" />
							</div>
						) : (
							""
						)}
						<textarea
							className="resize-none bg-accent w-full bg-opacity-10 p-5 rounded-2xl focus:outline-accent"
							placeholder="Post what's in your mind"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></textarea>
					</div>
					<div className="flex justify-between mt-3">
						<div className="space-x-4 flex">
							<label
								htmlFor="imagepicker"
								className="hidden md:flex bg-accent bg-opacity-20 py-2 px-5 rounded-xl text-accent hover:bg-opacity-40 transition-all cursor-pointer"
							>
								Upload an Image
							</label>
							<label
								htmlFor="imagepicker"
								className="md:hidden flex -translate-x-4 justify-center bg-accent bg-opacity-20 py-2 px-5 rounded-xl text-accent hover:bg-opacity-40 transition-all cursor-pointer"
							>
								<PhotographIcon className="w-6 h-6" />
							</label>
							<input
								type="file"
								className="hidden"
								id="imagepicker"
								hidden
								onChange={addImageToPost}
							/>
							<button className="hidden md:flex bg-accent bg-opacity-20 py-2 px-5 rounded-xl text-accent hover:bg-opacity-40 transition-all">
								Emojies
							</button>
							<label className="md:hidden flex -translate-x-4 justify-center bg-accent bg-opacity-20 py-2 px-5 rounded-xl text-accent hover:bg-opacity-40 transition-all cursor-pointer">
								<EmojiHappyIcon className="w-6 h-6" />
							</label>
						</div>
						<div>
							<button
								onClick={handleAddingPost}
								disabled={loading}
								className="bg-accent py-2 px-5 rounded-xl text-white font-semibold border border-accent hover:bg-transparent hover:text-accent transition-all"
							>
								{loading ? "Posting..." : "Post"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
