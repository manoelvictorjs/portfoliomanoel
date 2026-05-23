import { professionalSummary } from "@/content/profile";
import type { ProfileSummary } from "@/types/content";

export type ProfileApiResponse = {
  ok: true;
  timestamp: string;
  data: ProfileSummary;
};

export function createProfileResponse(): ProfileApiResponse {
  return {
    ok: true,
    timestamp: new Date().toISOString(),
    data: professionalSummary,
  };
}
