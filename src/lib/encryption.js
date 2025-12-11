import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = "12345678901234567890123456789012"; // 32 bytes
const INIT_VECTOR = "1234567890123456"; // 16 bytes

// 🔐 AES Encrypt (same as Java encrypt method)
export function encrypt(data) {
  const jsonStr = typeof data === "string" ? data : JSON.stringify(data);

  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(SECRET_KEY),
    Buffer.from(INIT_VECTOR)
  );
  let encrypted = cipher.update(jsonStr, "utf8", "base64");
  encrypted += cipher.final("base64");

  // Make Base64 URL-safe (same as Base64.getUrlEncoder().withoutPadding())
  return encrypted.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// 🔓 AES Decrypt (same as Java decrypt method)
export function decrypt(encryptedData) {
  // Convert Base64 URL-safe → normal Base64
  const base64 = encryptedData.replace(/-/g, "+").replace(/_/g, "/");

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(SECRET_KEY),
    Buffer.from(INIT_VECTOR)
  );
  let decrypted = decipher.update(base64, "base64", "utf8");
  decrypted += decipher.final("utf8");

  // Parse JSON data if possible
  try {
    return JSON.parse(decrypted);
  } catch (e) {
    // If parsing fails, return the raw decrypted string
    return decrypted;
  }
}
