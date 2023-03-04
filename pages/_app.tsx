import React, { useEffect } from "react";
import "../public/styles/globals.css";
import "../public/styles/createBlog.css";
import "../public/styles/review.css"
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookies from 'js-cookie'
import rootReducers from "../store/redux/reducers/index";
import { useRouter } from "next/router";

const store = createStore(rootReducers, applyMiddleware(thunk));

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const token = Cookies.get("token");
	useEffect(() => {
		if (!token && router.pathname !== "/login" && router.pathname !== "/register") {
			router.push("/login");
		  }
		if(token) {
			router.push("/profile");
		}
		}, [token, router.pathname]);
	return (
		<React.StrictMode>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</React.StrictMode>
	);
}
