import '../styles/main.min.css'
import '../styles/style.css'
import '../styles/sidenav.css'
import '../styles/dashmain.css'
import Script from 'next/script'
import '../styles/otp.css'
import '../styles/register.css'
import '../styles/secondNav.css'
import '../styles/otpcomp.css'


import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient({
    defaultOptions: {

        queries: {

            refetchOnWindowFocus: 'always',
            // refetchOnMount: true,

        },

    },

});



function MyApp({ Component, pageProps }) {

    return (<SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    </SessionProvider>
    )








}

export default MyApp






