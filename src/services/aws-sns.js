import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({ region: 'us-east-1' });

export async function sendEmail({ email, name, message, messageTitle, phone }) {
    const params = {
        Message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        Subject: `${messageTitle} from ${name}`,
        TopicArn: process.env.TOPIC_ARN,
    };
    return snsClient.send(new PublishCommand(params));
}