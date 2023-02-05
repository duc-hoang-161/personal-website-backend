import {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
    DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';
const dbClient = new DynamoDBClient({ region: 'us-east-1' });
const TABLE_NAME = 'my-website-contact';
const mapItemToContact = (i) => ({
    email: i.email.S,
    name: i.name.S,
    message: i.message.S,
    messageTitle: i.messageTitle.S,
    phone: i.phone.S,
});

export async function saveContact({
    email,
    name,
    message,
    messageTitle,
    phone,
}) {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            email: { S: email },
            name: { S: name },
            message: { S: message },
            messageTitle: { S: messageTitle },
            phone: { S: phone },
        },
    };
    return dbClient.send(new PutItemCommand(params));
}
export async function listContact() {
    const params = {
        TableName: TABLE_NAME,
    };
    const res = await dbClient.send(new ScanCommand(params));
    const { Items } = res;
    return Items.map(mapItemToContact);
}

export function removeContact({ email, name }) {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            email: { S: email },
            name: { S: name },
        },
    };
    return dbClient.send(new DeleteItemCommand(params));
}

export function updateContact({ email, name, message, messageTitle, phone }) {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            email: { S: email },
            name: { S: name },
            message: { S: message },
            messageTitle: { S: messageTitle },
            phone: { S: phone },
        },
    };
    return dbClient.send(new PutItemCommand(params));
}
