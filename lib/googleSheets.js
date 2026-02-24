import { google } from "googleapis";

const RETRYABLE_ERROR_CODES = new Set([
  "ECONNRESET",
  "ETIMEDOUT",
  "EAI_AGAIN",
  "ENOTFOUND",
  "ECONNABORTED",
]);

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function normalizePrivateKey(value) {
  const trimmed = value.trim();
  const unquoted =
    trimmed.startsWith('"') && trimmed.endsWith('"')
      ? trimmed.slice(1, -1)
      : trimmed;

  return unquoted.replace(/\\n/g, "\n");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableGoogleError(error) {
  const code = error?.code;
  const status = error?.response?.status;
  const message = typeof error?.message === "string" ? error.message : "";

  if (typeof status === "number" && (status === 429 || status >= 500)) {
    return true;
  }

  if (typeof code === "string" && RETRYABLE_ERROR_CODES.has(code)) {
    return true;
  }

  return /ECONNRESET|socket hang up|timeout/i.test(message);
}

/**
 * @param {"loan" | "career"} type
 * @param {Array} rowData
 */
export async function appendToSheet(type, rowData) {
  const clientEmail = getRequiredEnv("GOOGLE_CLIENT_EMAIL");
  const privateKey = normalizePrivateKey(
    getRequiredEnv("GOOGLE_PRIVATE_KEY")
  );

  // 🔥 Select correct sheet
  let spreadsheetId;

  if (type === "loan") {
    spreadsheetId = getRequiredEnv("LOAN_SHEET_ID");
  } else if (type === "career") {
    spreadsheetId = getRequiredEnv("CAREER_SHEET_ID");
  } else {
    throw new Error("Invalid sheet type");
  }

  const sheetRange = process.env.GOOGLE_SHEET_RANGE || "Sheet1!A1";

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: "v4" });

  const maxAttempts = 4;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await sheets.spreadsheets.values.append(
        {
          auth: authClient,
          spreadsheetId,
          range: sheetRange,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [rowData],
          },
        },
        { timeout: 15000 }
      );

      return;
    } catch (error) {
      const shouldRetry =
        attempt < maxAttempts && isRetryableGoogleError(error);

      if (!shouldRetry) {
        throw error;
      }

      const backoffMs = 300 * 2 ** (attempt - 1);
      await sleep(backoffMs);
    }
  }
}