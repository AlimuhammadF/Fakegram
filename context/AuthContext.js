import { createContext, useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import nookies from "nookies";
import nProgress from "nprogress";
import Router from "next/router";
const AuthContext = createContext({
	user: null,
	initialLoading: true,
	googleSignin: () => {},
	logout: () => {},
});

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [initialLoading, setInitialLoading] = useState(true);

	useEffect(() => {
		return auth.onIdTokenChanged(async (user) => {
			if (!user) {
				nookies.set(undefined, "token", "", { path: "/" });
				setUser(null);
				setInitialLoading(false);
				return;
			}
			const token = await user.getIdToken();
			nookies.set(undefined, "token", token, { path: "/" });
			setUser(user);
			setInitialLoading(false);
		});
	}, [onAuthStateChanged]);

	async function googleSignin() {
		nProgress.start();
		const Provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, Provider);
			Router.push("/");
			nProgress.done();
		} catch (error) {
			nProgress.done();
			alert(error);
		}
	}

	async function logout() {
		nProgress.start();
		try {
			await signOut(auth);
			Router.push("/Signin");
			nProgress.done();
		} catch (error) {
			nProgress.done();
			alert(error);
		}
	}
	const context = { user, googleSignin, logout, initialLoading };

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
}

export default AuthContext;
