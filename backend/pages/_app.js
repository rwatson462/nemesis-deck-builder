import '../scss/default.scss'

/**
 * This custom app exists just to inject the css file above
 */

export default function App({Component, pageProps}) {
    return (
        <Component {...pageProps} />
    )
}
