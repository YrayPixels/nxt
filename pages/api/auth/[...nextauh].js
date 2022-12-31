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
                    email: 'moses@gmail.com',
                    id: '082050jt94',
                    center_name: 'Moses Center',
                    center_code: " ",
                    phone_number: "",
                    logo: ' ',
                    state_id: ' ',
                    lga_id: ' ',
                    center_otp: " ",
                    type: " ",
                    added_at: " ",
                    address: "",
                    status: " ",
                    bearer_toke: ""
                }


                if (token == 'verified') {
                    // Any object returned will be saved in `user` property of the JWT
                    // throw new Error('something is happening')
                    // console.log(fetchedData)
                    return {
                        user: {
                            email: 'moses@gmail.com',
                            id: '082050jt94',
                            center_name: 'Moses Center',
                            center_code: " ",
                            phone_number: "",
                            logo: ' ',
                            state_id: ' ',
                            lga_id: ' ',
                            center_otp: " ",
                            type: " ",
                            added_at: " ",
                            address: "",
                            status: " ",
                            bearer_toke: ""
                        }
                    }
                }
                // If you return null then an error will be displayed advising the user to check their details.
                throw new Error('Invalid credentials')
            },
            callbacks: {
                jwt: async ({ token, user }) => {
                    user && (token.user = user)
                    return token
                },
                session: async ({ session, token }) => {
                    session.user = token.user
                    return session
                }
            }

        })
    ],


    pages: {
        signIn: '/',
    },
    secret: 'ifiafdfip98108037413',
}


export default NextAuth(authoptions)