import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/functions'
// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyCXHTj6hHl5SBOg2q4FoLFqcqUGWzksgzc',
  authDomain: 'lucky-zone-b975e.firebaseapp.com',
  databaseURL: 'https://lucky-zone-b975e.firebaseio.com',
  projectId: 'lucky-zone-b975e',
  storageBucket: 'lucky-zone-b975e.appspot.com',
  messagingSenderId: '1016945252746',
  appId: '1:1016945252746:web:b05f960098e9800a'
}
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const FBAuth = firebase.auth()
export const FBStorage = firebase.storage()
export const FBDB = firebase.database()
export const FBStore = firebase.firestore()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp()
// export const FBMessaging = firebase.messaging()
// export const FBFuntions = firebase.functions()
// Functions
export function docChanges({ collections, items, resolve, reject }) {
  var item = {}
  collections.onSnapshot(
    snapshot => {
      snapshot.docChanges().forEach(
        change => {
          const source = change.doc.metadata.hasPendingWrites
            ? 'Local'
            : 'Server'
          if (items.findIndex(x => x.id === change.doc.id) > -1) return
          item = Object.assign({ id: change.doc.id }, change.doc.data())
          if (change.type === 'added') {
            if (source === 'Server') {
              items.push(item)
              // context.commit('PUSH_ITEMS', item)
              // data.push(item)
            }
            // console.log("Added: ", change.doc.data())
          }
          if (change.type === 'modified') {
            if (source === 'Server') {
              const index = items.findIndex(x => x.id === item.id)
              items.splice(index, 1, item)
              // context.commit('UPDATE_ITEMS', item)
            }
            // if (change.oldIndex !== change.newIndex) {
            //   data.splice(change.oldIndex, 1)
            //   data.splice(change.newIndex, 0, item)
            // } else data.splice(change.oldIndex, 1, item)
            // console.log("old ", change.oldIndex)
            // console.log("new ", change.newIndex)
            // console.log("Modified: ", change.doc.data())
          }
          if (change.type === 'removed') {
            const index = items.findIndex(x => x.id === item.id)
            if (index >= 0) items.splice(index, 1)
            // context.commit('REMOVE_ITEMS', item)
            // console.log("Removed: ", change.doc.data())
          }
          // console.log(source)
        },
        error => {
          if (typeof reject === 'function') reject(error)
        }
      )
      if (typeof resolve === 'function') resolve(item)
    },
    error => {
      if (typeof reject === 'function') reject(error)
    }
  )
}

export default firebase
