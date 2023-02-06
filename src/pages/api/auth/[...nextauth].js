import NextAuth from 'next-auth/next';
import CognitoProvider from 'next-auth/providers/cognito';

export const authOptions = {
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: process.env.COGNITO_ISSUER,
            domain: process.env.COGNITO_DOMAIN,
        }),
    ],
    secret: 'IamVeryHandsome',
};

export default NextAuth(authOptions);
