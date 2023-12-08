import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../../../src/app/firebase";

export const authOptions = {
  pages: {
    signIn: '/signIn'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
          .then(userCredential => {
            if (userCredential.user) {
              console.log(userCredential.user.email + ' logged in');
              return userCredential.user;
            }
            return null;
          })
          .catch(error => (console.log(error)))
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
        });
      }
    }),
  ],
}
export default NextAuth(authOptions)