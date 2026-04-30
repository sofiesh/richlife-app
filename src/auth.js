// auth.js

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './firebase'

/**
 * Function to sign up a new user.
 *
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<import("firebase/auth").UserCredential>} - User credentials
 */
function signUp (email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

/**
 * Function to sign in an existing user.
 *
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<import("firebase/auth").UserCredential>} - User credentials
 */
function signIn (email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

/**
 * Function to sign out a user.
 *
 * @returns {Promise<void>} - Resolved promise
 */
function signOut () {
  return auth.signOut()
}

/**
 * Function to observe the authentication state.
 *
 * @param {Function} callback - Callback function.
 * @returns {function(): void} - State observer.
 */
function observeAuthState (callback) {
  return onAuthStateChanged(auth, callback)
}

export { signUp, signIn, signOut, observeAuthState }
