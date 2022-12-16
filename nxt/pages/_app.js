import '../styles/main.min.css'
import '../styles/style.css'
import '../styles/sidenav.css'
import '../styles/dashmain.css'
import Script from 'next/script'





function MyApp({ Component, pageProps }) {

    return <Component {...pageProps} />


}

export default MyApp


// var urlencoded = new URLSearchParams();
// urlencoded.append("email", "ibbu@gmail.com");
// urlencoded.append("password", "12345678");

// var requestOptions = {
//     method: 'POST',
//     body: urlencoded,
//     redirect: 'follow'
// };

// fetch("https://stockmgt.gapaautoparts.com/api/center/login", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));