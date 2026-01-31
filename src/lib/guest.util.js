import { getGuestId, saveGuestId } from "./indexdb/guest.db";

const generateGuestId = () => {
  return `guest_${crypto.randomUUID()}`;
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
