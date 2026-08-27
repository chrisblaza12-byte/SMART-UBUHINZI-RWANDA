// Authentication, farmer profiles and data ownership safeguards.
// Sensitive roles are assigned only on the server.

const ADMIN_EMAILS = ["ndayisabapatrick75@gmail.com", "mucyoolivier4@gmail.com"];
const ADMIN_ROLE = "PlatformAdmin";
const VALID_TOPICS = ["Crop production", "Livestock", "Market prices", "Weather planning", "AI crop diagnosis"];

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

async function ensureAdminRole(user, email) {
  if (!ADMIN_EMAILS.includes(email)) return;
  const roleQuery = new Parse.Query(Parse.Role);
  roleQuery.equalTo("name", ADMIN_ROLE);
  let role = await roleQuery.first({ useMasterKey: true });
  if (!role) {
    role = new Parse.Role(ADMIN_ROLE, new Parse.ACL());
    await role.save(null, { useMasterKey: true });
  }
  const members = role.relation("users");
  members.add(user);
  await role.save(null, { useMasterKey: true });
}

function ownerAcl(user) {
  const acl = new Parse.ACL();
  acl.setReadAccess(user, true);
  acl.setWriteAccess(user, true);
  acl.setRoleReadAccess(ADMIN_ROLE, true);
  return acl;
}

Parse.Cloud.beforeSave(Parse.User, async (request) => {
  const user = request.object;
  const email = cleanEmail(user.get("email") || user.getUsername());
  const name = String(user.get("fullName") || "").trim();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "Enter a valid email address.");
  }
  if (request.original && user.getUsername() !== request.original.getUsername()) {
    throw new Parse.Error(Parse.Error.OPERATION_FORBIDDEN, "Email address cannot be changed here.");
  }
  if (!request.original && (!name || name.length < 2 || name.length > 80)) {
    throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "Enter your full name.");
  }
  user.set("email", email);
  user.set("username", email);
  if (!VALID_TOPICS.includes(user.get("learningTopic"))) user.set("learningTopic", "Crop production");
});

Parse.Cloud.afterSave(Parse.User, async (request) => {
  if (request.original) return;
  // Provisioning must never turn a successfully created account into an
  // incomplete HTTP response. It is idempotent and can safely be retried.
  try {
    const user = request.object;
    const email = cleanEmail(user.get("email"));
    await ensureAdminRole(user, email);
    const profileQuery = new Parse.Query("FarmerProfile");
    profileQuery.equalTo("createdBy", user);
    if (await profileQuery.first({ useMasterKey: true })) return;
    const profile = new Parse.Object("FarmerProfile");
    profile.set("fullName", user.get("fullName"));
    profile.set("email", email);
    profile.set("phoneNumber", user.get("phoneNumber") || "");
    profile.set("learningTopic", user.get("learningTopic"));
    profile.set("role", ADMIN_EMAILS.includes(email) ? "admin" : "farmer");
    profile.set("status", "active");
    profile.set("createdBy", user);
    profile.setACL(ownerAcl(user));
    await profile.save(null, { useMasterKey: true });
  } catch (error) {
    console.error("Account provisioning failed:", error.message || error);
  }
});

Parse.Cloud.beforeSave("FarmerProfile", async (request) => {
  if (request.master) return;
  const user = request.user;
  const owner = request.object.get("createdBy");
  if (!user || !owner || owner.id !== user.id) {
    throw new Parse.Error(Parse.Error.OPERATION_FORBIDDEN, "You can only access your own profile.");
  }
  if (!request.original) {
    throw new Parse.Error(Parse.Error.OPERATION_FORBIDDEN, "Profiles are created securely with new accounts.");
  }
  ["role", "status", "email", "createdBy"].forEach((key) => request.object.set(key, request.original.get(key)));
});

Parse.Cloud.beforeSave("CropDiagnosis", async (request) => {
  const user = request.user;
  const owner = request.object.get("createdBy");
  if (!user || !owner || owner.id !== user.id) {
    throw new Parse.Error(Parse.Error.OPERATION_FORBIDDEN, "A crop diagnosis must belong to the signed-in farmer.");
  }
  if (!String(request.object.get("cropName") || "").trim() || !String(request.object.get("symptoms") || "").trim()) {
    throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "Crop name and symptoms are required.");
  }
  if (!request.original) request.object.setACL(ownerAcl(user));
  if (request.original) request.object.set("createdBy", request.original.get("createdBy"));
});

Parse.Cloud.beforeSave("BroadcastMessage", async (request) => {
  const user = request.user;
  if (!user || !ADMIN_EMAILS.includes(cleanEmail(user.get("email") || user.getUsername()))) {
    throw new Parse.Error(Parse.Error.OPERATION_FORBIDDEN, "Only the two platform administrators can broadcast messages.");
  }
  if (!String(request.object.get("title") || "").trim() || !String(request.object.get("body") || "").trim()) {
    throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "A broadcast title and message are required.");
  }
  request.object.set("audience", "farmers");
  request.object.set("createdBy", user);
  if (!request.original) {
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setWriteAccess(user, true);
    request.object.setACL(acl);
  }
});

Parse.Cloud.beforeSave("MarketplaceContact", async (request) => {
  const user = request.user;
  const admin = user && ADMIN_EMAILS.includes(cleanEmail(user.get("email") || user.getUsername()));
  if (!user) throw new Parse.Error(Parse.Error.SESSION_MISSING, "Sign in to send or answer a contact message.");
  if (!request.original) {
    if (admin || request.object.get("sender")?.id !== user.id || !String(request.object.get("message") || "").trim()) {
      throw new Parse.Error(Parse.Error.OPERATION_FORBIDDEN, "Only a farmer can start a contact message.");
    }
    const acl = new Parse.ACL();
    acl.setReadAccess(user, true);
    acl.setRoleReadAccess(ADMIN_ROLE, true);
    acl.setWriteAccess(user, true);
    acl.setRoleWriteAccess(ADMIN_ROLE, true);
    request.object.setACL(acl);
  } else if (!admin) {
    request.object.set("sender", request.original.get("sender"));
    request.object.set("response", request.original.get("response"));
    request.object.set("respondedBy", request.original.get("respondedBy"));
    request.object.set("status", request.original.get("status"));
  } else {
    request.object.set("sender", request.original.get("sender"));
    request.object.set("message", request.original.get("message"));
    request.object.set("respondedBy", user);
    request.object.set("status", String(request.object.get("response") || "").trim() ? "answered" : "new");
  }
});

async function sendExternalNotification({ recipients, title, body, channels }) {
  const requested = channels.filter((channel) => channel !== "inbox");
  const missing = [];
  if (requested.includes("email") && (!process.env.RESEND_API_KEY || !process.env.NOTIFICATION_FROM_EMAIL)) missing.push("email");
  if ((requested.includes("sms") || requested.includes("phone")) && (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_FROM_NUMBER)) missing.push("sms/phone");
  if (missing.length) throw new Parse.Error(Parse.Error.SCRIPT_FAILED, `Configure notification provider credentials for ${missing.join(" and ")}.`);

  const results = [];
  if (requested.includes("email")) {
    for (const recipient of recipients.filter((item) => item.email)) {
      const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.NOTIFICATION_FROM_EMAIL, to: [recipient.email], subject: title, text: body }) });
      if (!response.ok) throw new Parse.Error(Parse.Error.SCRIPT_FAILED, "Email provider rejected the notification.");
      results.push("email");
    }
  }
  if (requested.includes("sms") || requested.includes("phone")) {
    const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64");
    for (const recipient of recipients.filter((item) => item.phone)) {
      const sendTwilio = async (path, values) => {
        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/${path}`, { method: "POST", headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(values) });
        if (!response.ok) throw new Parse.Error(Parse.Error.SCRIPT_FAILED, "Twilio rejected the notification.");
      };
      if (requested.includes("sms")) { await sendTwilio("Messages.json", { To: recipient.phone, From: process.env.TWILIO_FROM_NUMBER, Body: `${title}\n\n${body}` }); results.push("sms"); }
      if (requested.includes("phone")) { await sendTwilio("Calls.json", { To: recipient.phone, From: process.env.TWILIO_FROM_NUMBER, Twiml: `<Response><Say>${title}. ${body}</Say></Response>` }); results.push("phone"); }
    }
  }
  return results;
}

Parse.Cloud.define("deliverFarmerNotification", async (request) => {
  const user = request.user;
  if (!user || !ADMIN_EMAILS.includes(cleanEmail(user.get("email") || user.getUsername()))) throw new Parse.Error(Parse.Error.OPERATION_FORBIDDEN, "Only administrators can send farmer notifications.");
  const channels = Array.isArray(request.params.channels) ? request.params.channels : [];
  const query = new Parse.Query(Parse.User);
  query.limit(1000);
  const farmers = await query.find({ useMasterKey: true });
  const recipients = farmers.filter((farmer) => !ADMIN_EMAILS.includes(cleanEmail(farmer.get("email") || farmer.getUsername()))).map((farmer) => ({ email: String(farmer.get("email") || ""), phone: String(farmer.get("phoneNumber") || "") }));
  const delivered = await sendExternalNotification({ recipients, title: String(request.params.title || "Farmer update"), body: String(request.params.body || ""), channels });
  return { delivered, recipients: recipients.length };
});

Parse.Cloud.define("hello", async () => ({ message: "Smart Ubuhinzi backend is ready." }));
