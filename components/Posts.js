import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import Post from "./Post";

export default function Posts({ postProps }) {
	const [post, setPosts] = useState(postProps || []);
	useEffect(() => {
		try {
			onSnapshot(query(collection(db, "posts")), (snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}))
				);
			});
		} catch (error) {
			alert(error);
		}
	}, [db]);

	return (
		<div className="w-screen flex  justify-center mt-8 ">
			<div className="mx-5">
				{post.map((data) => (
					<Post
						key={data.id}
						title={data.title}
						userImage={data.userImage}
						id={data.id}
						image={data.image}
						userName={data.userName}
						userUid={data.userUid}
					/>
				))}
			</div>
		</div>
	);
}
