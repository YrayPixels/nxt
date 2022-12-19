import NextAuth, { NextAuthOptions } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


const resstatus = [];
const userData = []

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
                const loginfunc = async () => {
                    var urlencoded = new URLSearchParams();
                    urlencoded.append("email", email);
                    urlencoded.append("password", password);

                    var requestOptions = {
                        method: 'POST',
                        body: urlencoded,
                        // redirect: 'follow'
                    };
                    const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/login", requestOptions)
                    const data = await response.json()

                    const status = response.status;
                    if (status == 200) {
                        resstatus.pop()
                        userData.pop()
                        resstatus.push(200)
                        userData.push(data)
                    } else if (status == 201) {
                        resstatus.pop()
                        userData.pop()
                        resstatus.push(201)
                        userData.push(data.message)
                    } else {
                        resstatus.pop()
                        userData.pop()
                        resstatus.push(404)
                    }
                    return data;
                }

                loginfunc();

                const user = {
                    id: userData[0].message.id,
                    center_name: userData[0].message.center_name,
                    center_code: userData[0].message.center_code,
                    email: userData[0].message.email,
                    phone_number: userData[0].message.phone_number,
                    logo: userData[0].message.logo,
                    state_id: userData[0].message.state_id,
                    lga_id: userData[0].message.lga_id,
                    center_otp: userData[0].message.center_otp,
                    status: userData[0].message.status,
                    bearer_token: userData[0].message.barear_token
                }


                if (resstatus !== []) {
                    if (resstatus[0] == 200) {
                        return user;
                    } else if (resstatus[0] == 201) {
                        return null;
                    }
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    // console.log(resstatus)
                    // console.log('worng  credentials')
                    throw new Error('Invalid credentials')
                }

            }
        })
    ],

    pages: {
        signIn: '/',
        // si 
    },
    secret: 'ifiafdfip98108037413',
}


export default NextAuth(authoptions)