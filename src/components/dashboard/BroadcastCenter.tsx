import Parse from "../../parse";
import { Bell, Megaphone, Send } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type Broadcast = { id: string; title: string; body: string; createdAt: string };

type BroadcastCenterProps = { isAdmin: boolean };

export function BroadcastCenter({ isAdmin }: BroadcastCenterProps) {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const loadBroadcasts = async () => {
    const query = new Parse.Query("BroadcastMessage");
    query.equalTo("audience", "farmers");
    query.descending("createdAt");
    query.limit(50);
    const rows = await query.find();
    setBroadcasts(rows.map((item) => ({ id: item.id || crypto.randomUUID(), title: String(item.get("title") || "Farmer update"), body: String(item.get("body") || ""), createdAt: new Date(item.createdAt || Date.now()).toLocaleDateString() })));
    setLoading(false);
  };

  useEffect(() => {
    loadBroadcasts().catch(() => setLoading(false));
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
      const acl = new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(currentUser, true);
      message.setACL(acl);
      await message.save();
      setTitle("");
      setBody("");
      setStatus("Message sent to all farmers.");
      await loadBroadcasts();
    } catch {
      setStatus("The message could not be sent. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return <div className="space-y-4">
    {isAdmin && <article className="rounded-[18px] border border-[#b9dfcf] bg-[#eaf8f2] p-5 shadow-[0_8px_18px_rgba(17,34,27,0.05)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-7">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#18794e] text-white"><Megaphone className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">Broadcast to all farmers</h2><p className="text-sm text-[#467267] dark:text-[#b9d7cb]">Send crop, weather, treatment, or platform updates to every farmer.</p></div></div>
      <form onSubmit={sendBroadcast} className="mt-5 space-y-3"><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Message title" className="w-full rounded-xl border border-[#cfe2db] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2a7d70] dark:border-[#28664f] dark:bg-[#0b261d]" /><textarea value={body} onChange={(event) => setBody(event.target.value)} rows={4} placeholder="Write the message for all farmers..." className="w-full rounded-xl border border-[#cfe2db] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2a7d70] dark:border-[#28664f] dark:bg-[#0b261d]" /><button type="submit" disabled={sending} className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl bg-[#18794e] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#12643f] disabled:cursor-not-allowed disabled:opacity-60"><Send className="h-4 w-4" />{sending ? "Sending..." : "Broadcast message"}</button>{status && <p role="status" className="text-sm font-semibold text-[#18794e] dark:text-[#86efac]">{status}</p>}</form>
    </article>}
    <article className="rounded-[18px] border border-[#d7e8e2] bg-white p-5 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-7">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff4d6] text-[#9a6b0b]"><Bell className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">Farmer announcements</h2><p className="text-sm text-[#6f817d]">Updates shared by the platform administrators.</p></div></div>
      <div className="mt-5 space-y-3">{loading ? <p className="text-sm text-[#6f817d]">Loading announcements...</p> : broadcasts.length ? broadcasts.map((item) => <div key={item.id} className="rounded-xl border border-[#e4eeea] bg-[#f8fbfa] p-4 dark:border-[#1d5743] dark:bg-[#0b261d]"><div className="flex flex-wrap items-start justify-between gap-2"><h3 className="font-bold">{item.title}</h3><time className="text-xs text-[#6f817d]">{item.createdAt}</time></div><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#647a78] dark:text-[#b9d7cb]">{item.body}</p></div>) : <p className="text-sm text-[#6f817d]">No announcements yet.</p>}</div>
    </article>
  </div>;
}
