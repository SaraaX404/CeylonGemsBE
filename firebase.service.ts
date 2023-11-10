
import * as admin from 'firebase-admin';
import * as serviceAccount from './ceylongems-7f695-firebase-adminsdk-occsm-29e22bcc1f.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: 'gs://ceylongems-7f695.appspot.com',
});

export const firebaseApp = admin.app();