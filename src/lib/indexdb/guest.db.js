import { openDB } from "idb";

const DB_NAME = "AutoGuestDB";
const STORE_NAME = "guestStore";

const openGuestDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const saveGuestId = async (guestId) => {
  const db = await openGuestDB();
  await db.put(STORE_NAME, guestId, "guestId");
};

export const getGuestId = async () => {
  const db = await openGuestDB();
  return await db.get(STORE_NAME, "guestId");
};

export const clearGuestId = async () => {
  const db = await openGuestDB();
  await db.delete(STORE_NAME, "guestId");
};
