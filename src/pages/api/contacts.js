import {
    saveContact,
    listContact,
    removeContact,
    updateContact,
} from '@/services/aws-dynamodb';
import { sendEmail } from '@/services/aws-sns';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            await saveContact(req.body);
            await sendEmail(req.body);
            return res.status(200).json({ message: 'Success' });
        case 'DELETE':
            await removeContact(req.query);
            return res.status(200).json({ message: 'Success' });
        default:
            return res.status(200).json(await listContact());
    }
}
