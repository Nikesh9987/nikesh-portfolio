// lib/videoService.ts
// Firestore CRUD operations for video metadata
// Videos are stored in Firestore, files hosted on Cloudinary

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ── Firestore collection name ──────────────────────────────────────────────
const VIDEOS_COLLECTION = "videos";

// ── VideoDocument — shape stored in Firestore ──────────────────────────────
export interface VideoDocument {
  id:           string;    // Firestore document ID
  title:        string;
  description:  string;
  tag:          string;
  publicId:     string;    // Cloudinary public_id (used to build URLs + delete)
  secureUrl:    string;    // Full Cloudinary video URL
  thumbnailUrl: string;    // Auto-generated Cloudinary thumbnail
  duration:     string;    // Formatted: "2:34"
  size:         string;    // Formatted: "12.4 MB"
  uploadedAt:   string;    // Formatted date string for display
  createdAt:    Timestamp | null;
}

// ── VideoInput — what we pass when creating a new video ───────────────────
export interface VideoInput {
  title:        string;
  description:  string;
  tag:          string;
  publicId:     string;
  secureUrl:    string;
  thumbnailUrl: string;
  duration:     string;
  size:         string;
}

// ── Add a new video ────────────────────────────────────────────────────────
export async function addVideo(
  input: VideoInput
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const docRef = await addDoc(collection(db, VIDEOS_COLLECTION), {
      ...input,
      uploadedAt: new Date().toLocaleDateString("en-IN", {
        day:   "numeric",
        month: "short",
        year:  "numeric",
      }),
      createdAt: serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (err) {
    console.error("addVideo error:", err);
    return { success: false, error: "Failed to save video metadata" };
  }
}

// ── Get all videos (ordered by newest first) ──────────────────────────────
export async function getVideos(): Promise<VideoDocument[]> {
  try {
    const q      = query(
      collection(db, VIDEOS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const snap   = await getDocs(q);

    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<VideoDocument, "id">),
    }));
  } catch (err) {
    console.error("getVideos error:", err);
    return [];
  }
}

// ── Delete a video (Firestore only — Cloudinary handled separately) ────────
export async function deleteVideoFromFirestore(
  firestoreId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteDoc(doc(db, VIDEOS_COLLECTION, firestoreId));
    return { success: true };
  } catch (err) {
    console.error("deleteVideo error:", err);
    return { success: false, error: "Failed to delete from database" };
  }
}

// ── Update video metadata ─────────────────────────────────────────────────
export async function updateVideo(
  firestoreId: string,
  updates: Partial<Pick<VideoDocument, "title" | "description" | "tag">>
): Promise<{ success: boolean; error?: string }> {
  try {
    await updateDoc(doc(db, VIDEOS_COLLECTION, firestoreId), updates);
    return { success: true };
  } catch (err) {
    console.error("updateVideo error:", err);
    return { success: false, error: "Failed to update video" };
  }
}