import NextAuth, { NextAuthOptions } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const authoptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {

                const { email, password } = credentials
                // Add logic here to look up the user from the credentials supplied
                const fetchedData = [];
                async () => {
                    var urlencoded = new URLSearchParams();
                    urlencoded.append("email", email);
                    urlencoded.append("password", password);

                    var requestOptions = {
                        method: 'POST',
                        body: urlencoded,
                        redirect: 'follow'
                    };
                    const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/login", requestOptions)
                    const data = await response.json();
                    fetchedData.push(data);
                }

                const user = {
                    id: 1,
                    center_name: 'Ibrahim Badamasi Babangida University Lapai',
                    center_code: 'IBBUL',
                    email: 'ibbu@gmail.com',
                    phone_number: '09000000000',
                    logo: ' ',
                    state_id: '0',
                    lga_id: ' 0',
                    center_otp: '12345',
                    status: ' 1'
                }


                if (email == "ibbu@gmail.com" && password == 12345678) {
                    // Any object returned will be saved in `user` property of the JWT
                    // throw new Error('something is happening')
                    // console.log(fetchedData)
                    return user;
                }
                // If you return null then an error will be displayed advising the user to check their details.
                throw new Error('Invalid credentials')

            }

        })
    ],

    pages: {
        signIn: '/',
        // si 
    }
}


export default NextAuth(authoptions)