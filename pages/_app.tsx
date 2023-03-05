import React, { useEffect } from "react";
import "../public/styles/globals.css";
import "../public/styles/createBlog.css";
import "../public/styles/review.css"
import "../public/styles/contentBlog.css"
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookies from 'js-cookie'
import rootReducers from "../store/redux/reducers/index";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

const store = createStore(rootReducers, applyMiddleware(thunk));

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const token = Cookies.get("token");
	useEffect(() => {
		if (!token && router.pathname !== "/login" && router.pathname !== "/register") {
			router.push("/login");
		}
	}, [token, router.pathname]);
	useEffect(() => {
		const { showToast, message, error } = router.query;
		if (showToast && router.query) {
			if (message) {
				toast.success(message)
			}
			if (error) {
				toast.error(error)
			}
		}
	}, [router.query]);
	
	return (
		<React.StrictMode>
			<Provider store={store}>
				<ToastContainer
					position="top-right"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
				<Component {...pageProps} />
			</Provider>
		</React.StrictMode>
	);
}
