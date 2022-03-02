import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import nookies from "nookies";
import { firebaseAdmin } from "../firebase/firebase-admin";

export default function Signin() {
	const { googleSignin } = useContext(AuthContext);

	return (
		<button
			onClick={googleSignin}
			className="w-screen h-screen flex justify-center items-center"
		>
			Signin
		</button>
	);
}

export async function getServerSideProps(context) {
	try {
		const cookies = nookies.get(context);
		const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
		const { uid } = token;
		if (uid) {
			return {
				redirect: {
					permanent: false,
					destination: "/",
				},
			};
		}
	} catch (error) {}

	return {
		props: {
			postProps: [],
		},
	};
}
