import '../styles/globals.css'
import '../styles/login.css'
import '../styles/createBlog.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
