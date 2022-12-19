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


                if (token == 'verified') {
                    // Any object returned will be saved in `user` property of the JWT
                    // throw new Error('something is happening')
                    // console.log(fetchedData)
                    return user;
                }
                // If you return null then an error will be displayed advising the user to check their details.
                console.log(fetchedData)
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