// Non-extractable device pass keys persist in IndexedDB (CryptoKey objects are structured-cloneable).
export type StoredPass = { keyPair: CryptoKeyPair; rawPublicKey: Uint8Array; passKey: Uint8Array };

const idb = () =>
  new Promise<IDBDatabase>((res, rej) => {
    const r = indexedDB.open('facevalue', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('passes');
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });

export const putPass = async (key: string, v: StoredPass) => {
  const db = await idb();
  db.transaction('passes', 'readwrite').objectStore('passes').put(v, key);
};

export const getPass = async (key: string) => {
  const db = await idb();
  return new Promise<StoredPass | undefined>((res) => {
    const q = db.transaction('passes').objectStore('passes').get(key);
    q.onsuccess = () => res(q.result);
    q.onerror = () => res(undefined);
  });
};

/** Phones and tablets without a Midnight wallet extension. */
export const noWalletDevice = () =>
  !(window as unknown as { midnight?: unknown }).midnight && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
