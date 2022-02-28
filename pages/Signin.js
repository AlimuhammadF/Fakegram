import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import uniqueString from "unique-string";

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
