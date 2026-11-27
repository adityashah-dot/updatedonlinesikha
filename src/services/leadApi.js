const DEFAULT_LEADS_API_URL = "https://enterprise-lms-api.degreefyd.com/api/leads";

const LEADS_API_URL =
  import.meta.env?.VITE_LEADS_API_URL ||
  (typeof process !== "undefined" ? process.env?.VITE_LEADS_API_URL || process.env?.LEADS_API_URL : undefined) ||
  DEFAULT_LEADS_API_URL;

const LEADS_API_KEY =
  import.meta.env?.VITE_LEADS_API_KEY ||
  (typeof process !== "undefined" ? process.env?.VITE_LEADS_API_KEY || process.env?.LEADS_API_KEY : undefined) ||
  "";

export const INDIAN_PHONE_PATTERN = "^[6-92][0-9]{9}$";
export const INDIAN_PHONE_REGEX = /^[6-92]\d{9}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function sanitizeIndianPhone(value) {
  let digits = String(value ?? "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function isValidIndianPhone(value) {
  return INDIAN_PHONE_REGEX.test(sanitizeIndianPhone(value));
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test(String(value ?? "").trim());
}

export function validateLeadFields({
  name,
  phone,
  email,
  requireName = false,
  requireEmail = true,
} = {}) {
  const errors = {};
  if (requireName && !String(name ?? "").trim()) {
    errors.name = "Please enter your full name.";
  }
  const cleanPhone = sanitizeIndianPhone(phone);
  if (!cleanPhone || cleanPhone.length !== 10) {
    errors.phone = "Enter a valid 10-digit Indian mobile number (+91).";
  } else if (!INDIAN_PHONE_REGEX.test(cleanPhone)) {
    errors.phone = "Indian mobile number (+91) must start with 6, 7, 8, 9, or 2.";
  }
  const cleanEmail = String(email ?? "").trim();
  if (requireEmail) {
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      errors.email = "Enter a valid email address (e.g. name@example.com).";
    }
  }
  const isValid = Object.keys(errors).length === 0;
  const firstError = errors.name || errors.phone || errors.email || "";
  return {
    isValid,
    valid: isValid,
    error: firstError,
    errors,
    cleanPhone,
    cleanEmail,
  };
}

let cachedIpGeo = null;
let ipGeoPromise = null;

/**
 * Resolves the visitor's IP city and state via public IP geolocation endpoints,
 * cached in memory so it is only fetched once per session.
 */
export async function resolveIpLocation(customFetch) {
  if (cachedIpGeo) return cachedIpGeo;
  if (ipGeoPromise) return ipGeoPromise;

  const fetchFn = customFetch || (typeof fetch !== "undefined" ? fetch : null);
  if (!fetchFn) return { city: "", state: "" };

  ipGeoPromise = (async () => {
    const endpoints = [
      "https://ipwho.is/",
      "https://ipapi.co/json/",
    ];

    for (const url of endpoints) {
      try {
        const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), 2500) : null;
        const res = await fetchFn(url, {
          headers: { Accept: "application/json" },
          signal: controller?.signal,
        });
        if (timer) clearTimeout(timer);
        if (!res || !res.ok) continue;
        const data = await res.json();
        const city = String(data?.city || "").trim();
        const state = String(data?.region || data?.region_name || data?.state || "").trim();
        if (city || state) {
          cachedIpGeo = { city, state };
          return cachedIpGeo;
        }
      } catch {
        // try next geo endpoint
      }
    }
    return { city: "", state: "" };
  })();

  const result = await ipGeoPromise;
  ipGeoPromise = null;
  return result;
}

// Pre-warm IP geolocation in browser environments
if (typeof window !== "undefined") {
  resolveIpLocation().catch(() => {});
}

export function detectBrowser(userAgent) {
  const ua =
    userAgent !== undefined
      ? String(userAgent || "")
      : typeof navigator !== "undefined"
        ? navigator.userAgent || ""
        : "";
  if (/edg/i.test(ua)) return "Edge";
  if (/opr|opera/i.test(ua)) return "Opera";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua)) return "Safari";
  return "Chrome";
}

export function detectDevice(userAgent) {
  const ua =
    userAgent !== undefined
      ? String(userAgent || "")
      : typeof navigator !== "undefined"
        ? navigator.userAgent || ""
        : "";
  if (/ipad|tablet|playbook|silk/i.test(ua)) return "Tablet";
  if (/mobile|iphone|ipod|android.*mobile|windows phone/i.test(ua)) return "Mobile";
  if (typeof window !== "undefined" && window.innerWidth > 0 && window.innerWidth < 768) {
    return "Mobile";
  }
  return "Desktop";
}

function readUtmParams(explicitUrl) {
  const rawUrl =
    explicitUrl ||
    (typeof window !== "undefined" && window.location ? window.location.href : "");
  let params = new URLSearchParams();
  if (rawUrl) {
    try {
      const parsed = new URL(rawUrl, "https://onlinesiksha.com");
      params = parsed.searchParams;
    } catch {
      // ignore invalid URL
    }
  }
  return {
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
    utm_keyword: params.get("utm_keyword") || params.get("utm_term") || null,
    utm_campaign_id: params.get("utm_campaign_id") || params.get("gad_campaignid") || null,
    utm_adgroup_id: params.get("utm_adgroup_id") || null,
    utm_creative_id: params.get("utm_creative_id") || null,
  };
}

function inferCollegeFromPath() {
  if (typeof window === "undefined" || !window.location?.pathname) return "";
  const match = window.location.pathname.match(/^\/(?:universities|colleges)\/([^/?#]+)/i);
  if (!match) return "";
  return decodeURIComponent(match[1])
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toStringArray(val) {
  if (Array.isArray(val)) {
    return val.map((item) => String(item ?? "").trim()).filter(Boolean);
  }
  if (val !== null && val !== undefined && String(val).trim() !== "") {
    return [String(val).trim()];
  }
  return [];
}

/**
 * Builds the exact 27-field JSON payload expected by
 * POST https://enterprise-lms-api.degreefyd.com/api/leads
 */
export function buildLeadPayload(input = {}, geo = null) {
  const sourceUrl = String(
    input.sourceUrl ||
      (typeof window !== "undefined" && window.location ? window.location.href : "")
  ).trim();

  const utms = readUtmParams(sourceUrl);

  const cleanPhone = sanitizeIndianPhone(input.phone_number || input.phone || "");

  const resolvedGeo = geo || cachedIpGeo || { city: "", state: "" };
  const ipCity = String(input.ip_city || resolvedGeo.city || "").trim();
  const ipState = String(input.ip_state || resolvedGeo.state || "").trim();

  const rawStateArr = toStringArray(input.state);
  const rawCityArr = toStringArray(input.city);

  const stateArr = rawStateArr.length > 0 ? rawStateArr : ipState ? [ipState] : [];
  const cityArr = rawCityArr.length > 0 ? rawCityArr : ipCity ? [ipCity] : [];

  const degreeArr = toStringArray(
    input.preferred_degree !== undefined
      ? input.preferred_degree
      : input.course || input.degree
  );
  const specArr = toStringArray(
    input.preferred_specialization !== undefined
      ? input.preferred_specialization
      : input.specialization
  );
  const streamArr = toStringArray(input.stream);
  const commentArr = toStringArray(input.student_comment || input.comment);

  const currentcity = String(input.currentcity || cityArr[0] || ipCity || "").trim();
  const currentstate = String(input.currentstate || stateArr[0] || ipState || "").trim();
  const preferred_college = String(
    input.preferred_college || input.college || inferCollegeFromPath() || ""
  ).trim();

  return {
    name: String(input.name || input.fullName || "").trim() || "Student",
    email: String(input.email || "").trim(),
    phone_number: cleanPhone,
    state: stateArr,
    city: cityArr,
    currentcity,
    currentstate,
    ip_city: ipCity,
    highest_qualification: String(
      input.highest_qualification || input.qualification || ""
    ).trim(),
    preferred_degree: degreeArr,
    preferred_specialization: specArr,
    preferred_college,
    stream: streamArr,
    studyMode: String(input.studyMode ?? "").trim(),
    working_professional: Boolean(input.working_professional),
    form_name: String(
      input.form_name || "Counselling Form in Priority College Page"
    ).trim(),
    source: "OS",
    sourceUrl,
    utm_source: input.utm_source !== undefined ? input.utm_source : utms.utm_source,
    utm_medium: input.utm_medium !== undefined ? input.utm_medium : utms.utm_medium,
    utm_campaign: input.utm_campaign !== undefined ? input.utm_campaign : utms.utm_campaign,
    utm_keyword: input.utm_keyword !== undefined ? input.utm_keyword : utms.utm_keyword,
    utm_campaign_id:
      input.utm_campaign_id !== undefined ? input.utm_campaign_id : utms.utm_campaign_id,
    utm_adgroup_id:
      input.utm_adgroup_id !== undefined ? input.utm_adgroup_id : utms.utm_adgroup_id,
    utm_creative_id:
      input.utm_creative_id !== undefined ? input.utm_creative_id : utms.utm_creative_id,
    browser: String(input.browser || detectBrowser()).trim(),
    device: String(input.device || detectDevice()).trim(),
    callbackDate: input.callbackDate !== undefined ? input.callbackDate : null,
    student_comment: commentArr,
  };
}

/**
 * Sends the lead payload to https://enterprise-lms-api.degreefyd.com/api/leads.
 * Automatically resolves IP city & state before sending.
 */
export async function submitLead(input = {}, options = {}) {
  const fetchImpl = options.fetchImpl || (typeof fetch !== "undefined" ? fetch : null);
  const endpoint = options.endpoint || LEADS_API_URL;
  const apiKey = options.apiKey !== undefined ? options.apiKey : LEADS_API_KEY;

  let geo = options.geo || cachedIpGeo;
  if (!geo && !options.fetchImpl) {
    geo = await resolveIpLocation();
  }

  const payload = buildLeadPayload(input, geo);

  if (!fetchImpl) {
    return { ok: false, payload, error: "fetch unavailable" };
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
    headers["Authorization"] = apiKey.startsWith("Bearer ") ? apiKey : `Bearer ${apiKey}`;
  }

  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      // response may not have JSON body
    }

    return {
      ok: response.ok,
      status: response.status,
      payload,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      payload,
      error: error?.message || "Network error",
    };
  }
}
