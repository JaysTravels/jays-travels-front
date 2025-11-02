import CryptoJS from "crypto-js";

// --------------------------------------------------------------------
//  AES Configuration — must match backend
// --------------------------------------------------------------------
const RAW_KEY = "DadanBadamAnalMuchhuDadanYayaIshiappanaanbealo";

// Ensure key matches backend .NET logic:
// aes.Key = Encoding.UTF8.GetBytes(key.PadRight(32).Substring(0, 32));
const SECRET_KEY = RAW_KEY.padEnd(32).substring(0, 32);
const KEY_WORD_ARRAY = CryptoJS.enc.Utf8.parse(SECRET_KEY);

// --------------------------------------------------------------------
//  Encrypt local data (CryptoJS format)
// --------------------------------------------------------------------
export function encryptLocalData(data) {
  try {
    if (!data) throw new Error("No data provided for encryption");

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error("[encryptLocalData] Encryption failed:", error.message);
    return null;
  }
}

// --------------------------------------------------------------------
//  Decrypt data (handles both local CryptoJS format and backend AES)
// --------------------------------------------------------------------
export function decryptLocalData(cipherText) {
  if (!cipherText || typeof cipherText !== "string") {
    console.warn("[decryptLocalData] No ciphertext provided");
    return null;
  }

  // --- 1️⃣ Try to decrypt CryptoJS localStorage format ---
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (decrypted && decrypted.trim().startsWith("{")) {
      return JSON.parse(decrypted);
    }
  } catch (err) {
    console.debug("[decryptLocalData] Not a valid CryptoJS format:", err.message);
  }

  // --- 2️⃣ Try backend-style AES (Base64(IV + ciphertext)) ---
  try {
    const raw = CryptoJS.enc.Base64.parse(cipherText);

    if (!raw || !raw.words || raw.words.length <= 4) {
      throw new Error("Invalid ciphertext length");
    }

    const ivWords = raw.words.slice(0, 4); // IV = first 16 bytes
    const cipherWords = raw.words.slice(4); // ciphertext = rest
    const iv = CryptoJS.lib.WordArray.create(ivWords, 16);
    const ciphertextWA = CryptoJS.lib.WordArray.create(cipherWords);

    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: ciphertextWA,
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, KEY_WORD_ARRAY, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);

    if (!decrypted || !decrypted.trim()) {
      throw new Error("Decryption returned empty string");
    }

    return JSON.parse(decrypted);
  } catch (error) {
    console.error(
      "[decryptLocalData] AES decryption failed:",
      error.message || error
    );
    return null;
  }
}
