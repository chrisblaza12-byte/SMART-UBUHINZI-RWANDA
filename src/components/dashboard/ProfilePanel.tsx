import Parse from "../../parse";
import { Camera, Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : "");
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export function ProfilePanel() {
  const currentUser = Parse.User.current();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
    const avatar = currentUser?.get("avatar");
    return avatar ? avatar.url() : null;
  });
  const [uploading, setUploading] = useState(false);

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentUser) return;

    setUploading(true);
    try {
      const base64 = await toBase64(file);
      const parseFile = new Parse.File(`avatar-${currentUser.id}.jpg`, { base64 });
      await parseFile.save();

      currentUser.set("avatar", parseFile);
      await currentUser.save();

      setAvatarUrl(parseFile.url() || null);
      toast.success("Profile picture updated successfully.");
    } catch {
      toast.error("Could not upload profile picture.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <article className="rounded-xl border border-[#CBD5E1] bg-white p-5 dark:border-[#134E2A] dark:bg-[#0B3B20]">
      <h3 className="font-semibold text-[#0F172A] dark:text-white">My Profile</h3>

      <div className="mt-4 flex flex-wrap items-center gap-5">
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[#22C55E] bg-[#F8FAFC] dark:bg-[#052E16]">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile avatar" className="h-full w-full object-cover" />
            ) : (
              <img
                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${currentUser?.id || "farmer"}`}
                alt="Default profile avatar"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <label
            className="absolute -bottom-1 -right-1 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#22C55E] p-2 text-[#052E16] shadow-md transition-colors duration-200 hover:bg-[#4ADE80]"
            aria-label="Upload profile picture"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={uploading} />
          </label>
        </div>

        <div className="text-sm text-[#334155] dark:text-[#D1FAE5]">
          <p><span className="text-[#64748B] dark:text-[#86EFAC]">Name:</span> {String(currentUser?.get("fullName") || "-")}</p>
          <p><span className="text-[#64748B] dark:text-[#86EFAC]">Email:</span> {String(currentUser?.get("email") || currentUser?.getUsername() || "-")}</p>
          <p><span className="text-[#64748B] dark:text-[#86EFAC]">Learning Topic:</span> {String(currentUser?.get("learningTopic") || "Pest & Disease Management")}</p>
        </div>
      </div>
    </article>
  );
}
