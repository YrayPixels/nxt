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
            authorize(credentials, req) {
                // var fetchedData = new fdata();
                const { token } = credentials
                // Add logic here to look up the user from the credentials supplied

                const user = {
                    id: 1,
                    center_name: ' ',
                    center_code: ' ',
                    email: ' ',
                    phone_number: ' ',
                    logo: ' ',
                    state_id: ' ',
                    lga_id: ' ',
                    center_otp: ' ',
                    status: ' '
                }


                if (token == 'verified') {
                    // Any object returned will be saved in `user` property of the JWT
                    // throw new Error('something is happening')
                    // console.log(fetchedData)
                    return { id: 1, name: 'Micheal David', email: ' bigg Timez' };
                }
                // If you return null then an error will be displayed advising the user to check their details.
                throw new Error('Invalid credentials')
            }

        })
    ],

    pages: {
        signIn: '/',
    },
    secret: 'ifiafdfip98108037413',
}


export default NextAuth(authoptions)