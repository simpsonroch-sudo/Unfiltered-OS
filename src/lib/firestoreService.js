import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const userDocRef = (uid) => doc(db, 'users', uid);
const userSubCollection = (uid, name) => collection(db, 'users', uid, name);

export async function ensureUserProfile(uid, profile) {
  await setDoc(userDocRef(uid), profile, { merge: true });
}

export function subscribeToBookings(uid, callback) {
  const bookingsQuery = query(userSubCollection(uid, 'bookings'), orderBy('date', 'asc'));
  return onSnapshot(bookingsQuery, (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
  });
}

export async function addBooking(uid, payload) {
  return addDoc(userSubCollection(uid, 'bookings'), payload);
}

export async function updateBooking(uid, id, payload) {
  return updateDoc(doc(db, 'users', uid, 'bookings', id), payload);
}

export async function deleteBooking(uid, id) {
  return deleteDoc(doc(db, 'users', uid, 'bookings', id));
}

export async function getBooking(uid, id) {
  const snap = await getDoc(doc(db, 'users', uid, 'bookings', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export function subscribeToClients(uid, callback) {
  const clientsQuery = query(userSubCollection(uid, 'clients'), orderBy('updatedAt', 'desc'));
  return onSnapshot(clientsQuery, (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
  });
}

export async function upsertClient(uid, id, payload) {
  return setDoc(doc(db, 'users', uid, 'clients', id), payload, { merge: true });
}

export async function getClient(uid, id) {
  const snap = await getDoc(doc(db, 'users', uid, 'clients', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
