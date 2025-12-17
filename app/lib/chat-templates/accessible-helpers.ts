import type { ChatTemplate } from "./types";
import { template1ViuOntem } from "./template-1-viu-ontem";
import { template3SumicoSegredo } from "./template-3-sumico-segredo";
import { template4Localizacao } from "./template-4-localizacao";
import { template5Revelacao } from "./template-5-revelacao";
import { hashString } from "./index";

export type AccessibleTemplateKey = "template1" | "template3" | "template4" | "template5";

interface BasicUser {
  id: string;
  username: string;
  profilePicUrl: string;
}

const TEMPLATE_CONFIG: Record<AccessibleTemplateKey, { template: ChatTemplate; preview: string }> = {
  template1: {
    template: template1ViuOntem,
    preview: "você tava onde ontem? 🤨",
  },
  template3: {
    template: template3SumicoSegredo,
    preview: "se eu perguntar com quem você ta...",
  },
  template4: {
    template: template4Localizacao,
    preview: "vou te mandar a localização",
  },
  template5: {
    template: template5Revelacao,
    preview: "preciso falar contigo parada séria",
  },
};

const ACCESSIBLE_TEMPLATE_ORDER: AccessibleTemplateKey[] = [
  "template1",
  "template4",
  "template5",
  "template3",
];

export interface AccessibleAssignment<User extends BasicUser> {
  user: User;
  templateKey: AccessibleTemplateKey;
}

export function getAccessibleTemplateAssignments<User extends BasicUser>(
  users: User[],
  seed: string,
  requiredCount = ACCESSIBLE_TEMPLATE_ORDER.length,
): AccessibleAssignment<User>[] {
  if (users.length === 0) {
    return [];
  }

  // Limitar ao número de perfis disponíveis para evitar repetições
  const actualCount = Math.min(requiredCount, users.length);
  const selectedUsers = users.slice(0, actualCount);

  const rotation = hashString(`${seed}-accessible-order`) % actualCount;
  const rotatedTemplates = ACCESSIBLE_TEMPLATE_ORDER.map((_, idx) => {
    return ACCESSIBLE_TEMPLATE_ORDER[(idx + rotation) % actualCount];
  });

  return selectedUsers.map((user, idx) => ({
    user,
    templateKey: rotatedTemplates[idx],
  }));
}

export function getTemplatePreview(templateKey: AccessibleTemplateKey): string {
  return TEMPLATE_CONFIG[templateKey].preview;
}

export function getTemplateByKey(templateKey: AccessibleTemplateKey): ChatTemplate {
  return TEMPLATE_CONFIG[templateKey].template;
}
