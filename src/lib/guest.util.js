import { getGuestId, saveGuestId } from "./indexdb/guest.db";

const generateGuestId = () => {
  try {
    return `guest_${crypto.randomUUID()}`;
  } catch {
    return `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
};

export const setupGuestUser = async () => {
  let guestId = await getGuestId();

  if (guestId) {
    return guestId;
  }

  guestId = generateGuestId();
  await saveGuestId(guestId);

  return guestId;
};
