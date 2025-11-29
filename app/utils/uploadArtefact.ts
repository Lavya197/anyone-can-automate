import { supabase } from "@/lib/supabaseClient";

export async function uploadArtefact(file: File) {
  if (!file) return "";

  const filePath = `artifacts/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("bug-artefacts")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload Error:", uploadError);
    return "";
  }

  const { data: urlData } = supabase.storage
    .from("bug-artefacts")
    .getPublicUrl(filePath);

  return urlData.publicUrl || "";
}
