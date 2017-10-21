import * as Firebase from 'firebase';
import {
  FIREBASE_CONFIG
} from '../../config/api/firebase'

let FirebaseApp = Firebase.apps.length ? Firebase.apps[0] : Firebase.initializeApp(FIREBASE_CONFIG)

export default FirebaseApp
