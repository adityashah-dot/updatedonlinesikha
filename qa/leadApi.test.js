import test from "node:test";
import assert from "node:assert/strict";
import {
  buildLeadPayload,
  submitLead,
  detectBrowser,
  detectDevice,
  sanitizeIndianPhone,
  isValidIndianPhone,
  isValidEmail,
  validateLeadFields,
} from "../src/services/leadApi.js";

const EXPECTED_KEYS = [
  "name",
  "email",
  "phone_number",
  "state",
  "city",
  "currentcity",
  "currentstate",
  "ip_city",
  "highest_qualification",
  "preferred_degree",
  "preferred_specialization",
  "preferred_college",
  "stream",
  "studyMode",
  "working_professional",
  "form_name",
  "source",
  "sourceUrl",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_keyword",
  "utm_campaign_id",
  "utm_adgroup_id",
  "utm_creative_id",
  "browser",
  "device",
  "callbackDate",
  "student_comment",
];

test("buildLeadPayload produces the exact 27-field schema with source always OS and IP geo fallback", () => {
  const payload = buildLeadPayload(
    {
      name: "Priyanka kaur",
      email: "priyanakkaur2000ryg@gmail.com",
      phone_number: "+91 7888500931",
      form_name: "Counselling Form in Priority College Page",
      source: "Organic",
      sourceUrl:
        "https://degreefyd.com/colleges/rayat-bahra-university?gad_source=1&gad_campaignid=23292287218&gclid=Cj0KCQjw5P7UBhDaARIsAOSlS1NHw42n8qB7vQncIN-u7MszLCnnDwN6iBfkc76uH1qqiBUIhrv9fP4aApt3EALw_wcB",
      browser: "Chrome",
      device: "Mobile",
    },
    { city: "New Delhi", state: "Delhi" }
  );

  assert.deepEqual(Object.keys(payload), EXPECTED_KEYS);
  assert.equal(payload.name, "Priyanka kaur");
  assert.equal(payload.email, "priyanakkaur2000ryg@gmail.com");
  assert.equal(payload.phone_number, "7888500931");
  assert.equal(payload.source, "OS", "source must always be OS");
  assert.equal(payload.ip_city, "New Delhi");
  assert.deepEqual(payload.state, ["Delhi"]);
  assert.deepEqual(payload.city, ["New Delhi"]);
  assert.equal(payload.currentcity, "New Delhi");
  assert.equal(payload.currentstate, "Delhi");
  assert.equal(payload.highest_qualification, "");
  assert.deepEqual(payload.preferred_degree, []);
  assert.deepEqual(payload.preferred_specialization, []);
  assert.equal(payload.preferred_college, "");
  assert.deepEqual(payload.stream, []);
  assert.equal(payload.studyMode, "");
  assert.equal(payload.working_professional, false);
  assert.equal(payload.form_name, "Counselling Form in Priority College Page");
  assert.equal(payload.utm_campaign_id, "23292287218");
  assert.equal(payload.utm_source, null);
  assert.equal(payload.utm_medium, null);
  assert.equal(payload.browser, "Chrome");
  assert.equal(payload.device, "Mobile");
  assert.equal(payload.callbackDate, null);
  assert.deepEqual(payload.student_comment, []);
});

test("submitLead posts JSON payload with source OS and IP city/state to https://enterprise-lms-api.degreefyd.com/api/leads", async () => {
  let capturedUrl = "";
  let capturedOptions = null;

  const mockFetch = async (url, options) => {
    capturedUrl = url;
    capturedOptions = options;
    return {
      ok: true,
      status: 201,
      json: async () => ({ success: true }),
    };
  };

  const result = await submitLead(
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      state: "Maharashtra",
      city: "Mumbai",
      course: "Online MBA",
      college: "IIM Ahmedabad",
      form_name: "Apply Online Modal Form",
    },
    {
      fetchImpl: mockFetch,
      apiKey: "test-secret-key",
      geo: { city: "Pune", state: "Maharashtra" },
    }
  );

  assert.equal(result.ok, true);
  assert.equal(result.status, 201);
  assert.equal(capturedUrl, "https://enterprise-lms-api.degreefyd.com/api/leads");
  assert.equal(capturedOptions.method, "POST");
  assert.equal(capturedOptions.headers["x-api-key"], "test-secret-key");

  const body = JSON.parse(capturedOptions.body);
  assert.equal(body.source, "OS");
  assert.equal(body.ip_city, "Pune");
  assert.equal(body.phone_number, "9876543210");
  assert.deepEqual(body.state, ["Maharashtra"]);
  assert.deepEqual(body.city, ["Mumbai"]);
  assert.equal(body.currentstate, "Maharashtra");
  assert.equal(body.currentcity, "Mumbai");
  assert.deepEqual(body.preferred_degree, ["Online MBA"]);
  assert.equal(body.preferred_college, "IIM Ahmedabad");
});

test("detectBrowser and detectDevice classify user agents accurately", () => {
  assert.equal(detectBrowser("Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/124.0 Mobile Safari/537.36"), "Chrome");
  assert.equal(detectBrowser("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edg/124.0"), "Edge");
  assert.equal(detectDevice("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)"), "Mobile");
  assert.equal(detectDevice("Mozilla/5.0 (Windows NT 10.0; Win64; x64)"), "Desktop");
});

test("Indian phone and email validation enforces 10 digits starting with 6, 7, 8, 9, or 2 and valid email", () => {
  assert.equal(sanitizeIndianPhone("98765-4321099"), "9876543210");
  assert.equal(isValidIndianPhone("9876543210"), true);
  assert.equal(isValidIndianPhone("6123456789"), true);
  assert.equal(isValidIndianPhone("7123456789"), true);
  assert.equal(isValidIndianPhone("8123456789"), true);
  assert.equal(isValidIndianPhone("2123456789"), true);
  assert.equal(isValidIndianPhone("1234567890"), false);
  assert.equal(isValidIndianPhone("5123456789"), false);
  assert.equal(isValidIndianPhone("0123456789"), false);
  assert.equal(isValidIndianPhone("987654321"), false);

  assert.equal(isValidEmail("student@onlinesiksha.com"), true);
  assert.equal(isValidEmail("invalid-email"), false);

  const ok = validateLeadFields({
    name: "User Adi",
    phone: "9876543210",
    email: "useradi1234@gmail.com",
    requireName: true,
    requireEmail: true,
  });
  assert.equal(ok.valid, true);

  const badPhone = validateLeadFields({
    name: "User Adi",
    phone: "5876543210",
    email: "useradi1234@gmail.com",
    requireName: true,
    requireEmail: true,
  });
  assert.equal(badPhone.valid, false);

  const badEmail = validateLeadFields({
    name: "User Adi",
    phone: "9876543210",
    email: "notanemail",
    requireName: true,
    requireEmail: true,
  });
  assert.equal(badEmail.valid, false);
});
