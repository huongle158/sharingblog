import React from "react";
import "../public/styles/globals.css";
import "../public/styles/createBlog.css";
import "../public/styles/review.css"
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "../store/redux/reducers/index";

const store = createStore(rootReducers, applyMiddleware(thunk));

export default function App({ Component, pageProps }: AppProps) {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</React.StrictMode>
	);
}
