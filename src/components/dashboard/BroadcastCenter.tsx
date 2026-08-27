import Parse from "../../parse";
import { Bell, Mail, Megaphone, Phone, Send, Smartphone } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useState } from "react";

type Broadcast = { id: string; title: string; body: string; createdAt: string; channels: string[] };
type ContactThread = { id: string; crop: string; district: string; message: string; response: string; status: string; sender: string; createdAt: string };

type BroadcastCenterProps = { isAdmin: boolean };

export function BroadcastCenter({ isAdmin }: BroadcastCenterProps) {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [channels, setChannels] = useState<string[]>(["inbox"]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [contacts, setContacts] = useState<ContactThread[]>([]);
  const [responseDrafts, setResponseDrafts] = useState<Record<string, string>>({});
  const [respondingId, setRespondingId] = useState<string | null>(null);

  const loadBroadcasts = async () => {
    const query = new Parse.Query("BroadcastMessage");
    query.equalTo("audience", "farmers");
    query.descending("createdAt");
    query.limit(50);
    const rows = await query.find();
    setBroadcasts(rows.map((item) => ({ id: item.id || crypto.randomUUID(), title: String(item.get("title") || "Farmer update"), body: String(item.get("body") || ""), createdAt: new Date(item.createdAt || Date.now()).toLocaleDateString(), channels: (item.get("channels") as string[]) || ["inbox"] })));
    setLoading(false);
  };

  const loadContacts = async () => {
    const currentUser = Parse.User.current();
    if (!currentUser) return;
    const query = new Parse.Query("MarketplaceContact");
    query.include("sender");
    if (!isAdmin) query.equalTo("sender", currentUser);
    query.descending("createdAt");
    query.limit(100);
    const rows = await query.find();
    setContacts(rows.map((item) => ({ id: item.id || crypto.randomUUID(), crop: String(item.get("crop") || "Crop"), district: String(item.get("district") || "Rwanda"), message: String(item.get("message") || ""), response: String(item.get("response") || ""), status: String(item.get("status") || "new"), sender: String(item.get("sender")?.get("fullName") || item.get("sender")?.get("email") || "Farmer"), createdAt: new Date(item.createdAt || Date.now()).toLocaleDateString() })));
  };

  useEffect(() => {
    loadBroadcasts().catch(() => setLoading(false));
    loadContacts().catch(() => undefined);
  }, []);

  const sendBroadcast = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return setStatus("Add a title and message before sending.");
    const currentUser = Parse.User.current();
    if (!currentUser) return;
    setSending(true);
    setStatus("");
    try {
      const message = new Parse.Object("BroadcastMessage");
      message.set("title", title.trim());
      message.set("body", body.trim());
      message.set("audience", "farmers");
      message.set("createdBy", currentUser);
      message.set("channels", channels);
      const acl = new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(currentUser, true);
      message.setACL(acl);
      await message.save();
      setTitle("");
      setBody("");
      setChannels(["inbox"]);
      setStatus("Message sent to all farmers.");
      await loadBroadcasts();
    } catch {
      setStatus("The message could not be sent. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const respondToContact = async (thread: ContactThread) => {
    const response = String(responseDrafts[thread.id] || "").trim();
    if (!response) return setStatus("Write a response before sending.");
    setRespondingId(thread.id);
    try {
      const contact = await new Parse.Query("MarketplaceContact").get(thread.id);
      contact.set("response", response);
      contact.set("status", "answered");
      await contact.save();
      setResponseDrafts((current) => ({ ...current, [thread.id]: "" }));
      setStatus("Response sent to the farmer's inbox.");
      await loadContacts();
    } catch {
      setStatus("The response could not be sent.");
    } finally {
      setRespondingId(null);
    }
  };

  const toggleChannel = (channel: string) => {
    setChannels((current) => current.includes(channel) ? current.filter((item) => item !== channel) : [...current, channel]);
  };

  return <div className="space-y-4">
    {isAdmin && <article className="rounded-[18px] border border-[#b9dfcf] bg-[#eaf8f2] p-5 shadow-[0_8px_18px_rgba(17,34,27,0.05)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-7">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#18794e] text-white"><Megaphone className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">Broadcast to all farmers</h2><p className="text-sm text-[#467267] dark:text-[#b9d7cb]">Send crop, weather, treatment, or platform updates to every farmer.</p></div></div>
      <form onSubmit={sendBroadcast} className="mt-5 space-y-3"><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Message title" className="w-full rounded-xl border border-[#cfe2db] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2a7d70] dark:border-[#28664f] dark:bg-[#0b261d]" /><textarea value={body} onChange={(event) => setBody(event.target.value)} rows={4} placeholder="Write the message for all farmers..." className="w-full rounded-xl border border-[#cfe2db] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2a7d70] dark:border-[#28664f] dark:bg-[#0b261d]" /><fieldset><legend className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#467267] dark:text-[#b9d7cb]">Delivery channels</legend><div className="flex flex-wrap gap-2"><ChannelToggle icon={<Bell className="h-3.5 w-3.5" />} label="Inbox" active={channels.includes("inbox")} onClick={() => toggleChannel("inbox")} /><ChannelToggle icon={<Mail className="h-3.5 w-3.5" />} label="Email" active={channels.includes("email")} onClick={() => toggleChannel("email")} /><ChannelToggle icon={<Smartphone className="h-3.5 w-3.5" />} label="SMS" active={channels.includes("sms")} onClick={() => toggleChannel("sms")} /><ChannelToggle icon={<Phone className="h-3.5 w-3.5" />} label="Phone call" active={channels.includes("phone")} onClick={() => toggleChannel("phone")} /></div><p className="mt-2 text-xs text-[#6f817d]">Inbox is available now. Email, SMS, and phone delivery require configured provider credentials.</p></fieldset><button type="submit" disabled={sending || !channels.includes("inbox")} className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl bg-[#18794e] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#12643f] disabled:cursor-not-allowed disabled:opacity-60"><Send className="h-4 w-4" />{sending ? "Sending..." : "Broadcast message"}</button>{status && <p role="status" className="text-sm font-semibold text-[#18794e] dark:text-[#86efac]">{status}</p>}</form>
    </article>}
    {isAdmin && <article className="rounded-[18px] border border-[#d7e8e2] bg-white p-5 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-7">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e8e1fb] text-[#7057bf]"><Mail className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">Farmer contact inbox</h2><p className="text-sm text-[#6f817d]">Read marketplace contact messages and respond to farmers.</p></div></div>
      <div className="mt-5 space-y-3">{contacts.length ? contacts.map((thread) => <div key={thread.id} className="rounded-xl border border-[#e4eeea] bg-[#f8fbfa] p-4 dark:border-[#1d5743] dark:bg-[#0b261d]"><div className="flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-bold">{thread.crop} in {thread.district}</h3><p className="text-xs text-[#6f817d]">From {thread.sender} · {thread.createdAt}</p></div><span className="rounded-full bg-[#fff4d6] px-2 py-1 text-[10px] font-bold uppercase text-[#9a6b0b]">{thread.status}</span></div><p className="mt-3 text-sm leading-6 text-[#647a78] dark:text-[#b9d7cb]">{thread.message}</p>{thread.response && <p className="mt-2 rounded-lg bg-[#eaf8f2] p-3 text-sm text-[#18794e] dark:bg-[#1d5743] dark:text-[#d5f0ea]"><strong>Admin response:</strong> {thread.response}</p>}<div className="mt-3 flex gap-2"><textarea value={responseDrafts[thread.id] || ""} onChange={(event) => setResponseDrafts((current) => ({ ...current, [thread.id]: event.target.value }))} rows={2} placeholder="Write a response to this farmer..." className="min-w-0 flex-1 rounded-lg border border-[#cfe2db] bg-white px-3 py-2 text-sm outline-none focus:border-[#2a7d70] dark:border-[#28664f] dark:bg-[#123b2f]" /><button type="button" onClick={() => respondToContact(thread)} disabled={respondingId === thread.id} className="self-end rounded-lg bg-[#18794e] px-3 py-2 text-xs font-bold text-white disabled:opacity-60">{respondingId === thread.id ? "Sending..." : "Respond"}</button></div></div>) : <p className="text-sm text-[#6f817d]">No farmer contact messages yet.</p>}</div>
    </article>}
    {!isAdmin && <article className="rounded-[18px] border border-[#d7e8e2] bg-white p-5 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-7">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e8e1fb] text-[#7057bf]"><Mail className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">Your contact messages</h2><p className="text-sm text-[#6f817d]">See responses from platform administrators about your marketplace requests.</p></div></div>
      <div className="mt-5 space-y-3">{contacts.length ? contacts.map((thread) => <div key={thread.id} className="rounded-xl border border-[#e4eeea] bg-[#f8fbfa] p-4 dark:border-[#1d5743] dark:bg-[#0b261d]"><div className="flex items-start justify-between gap-2"><h3 className="font-bold">{thread.crop} in {thread.district}</h3><span className="text-xs text-[#6f817d]">{thread.createdAt}</span></div><p className="mt-2 text-sm text-[#647a78] dark:text-[#b9d7cb]"><strong>Your message:</strong> {thread.message}</p><p className="mt-2 rounded-lg bg-[#eaf8f2] p-3 text-sm text-[#18794e] dark:bg-[#1d5743] dark:text-[#d5f0ea]"><strong>Admin response:</strong> {thread.response || "Waiting for an administrator response."}</p></div>) : <p className="text-sm text-[#6f817d]">Your contact messages will appear here.</p>}</div>
    </article>}
    <article className="rounded-[18px] border border-[#d7e8e2] bg-white p-5 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-7">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff4d6] text-[#9a6b0b]"><Bell className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">Farmer announcements</h2><p className="text-sm text-[#6f817d]">Updates shared by the platform administrators.</p></div></div>
      <div className="mt-5 space-y-3">{loading ? <p className="text-sm text-[#6f817d]">Loading announcements...</p> : broadcasts.length ? broadcasts.map((item) => <div key={item.id} className="rounded-xl border border-[#e4eeea] bg-[#f8fbfa] p-4 dark:border-[#1d5743] dark:bg-[#0b261d]"><div className="flex flex-wrap items-start justify-between gap-2"><h3 className="font-bold">{item.title}</h3><time className="text-xs text-[#6f817d]">{item.createdAt}</time></div><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#647a78] dark:text-[#b9d7cb]">{item.body}</p><div className="mt-3 flex flex-wrap gap-1.5">{item.channels.map((channel) => <span key={channel} className="rounded-full bg-[#eaf8f2] px-2 py-1 text-[10px] font-bold uppercase text-[#18794e] dark:bg-[#1d5743] dark:text-[#b9d7cb]">{channel === "phone" ? "Phone call" : channel}</span>)}</div></div>) : <p className="text-sm text-[#6f817d]">No announcements yet.</p>}</div>
    </article>
  </div>;
}

function ChannelToggle({ icon, label, active, onClick }: { icon: ReactNode; label: string; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-pressed={active} className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition ${active ? "border-[#18794e] bg-[#dff4eb] text-[#18794e]" : "border-[#cfe2db] bg-white text-[#6f817d] dark:border-[#28664f] dark:bg-[#0b261d]"}`}>{icon}{label}</button>;
}
