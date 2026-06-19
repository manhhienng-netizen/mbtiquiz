import type { GroupName } from "./colors";

export type UserRole = "employee" | "hr" | "manager" | "admin";

export type TeamGoal =
  | "innovation"
  | "operations"
  | "sales"
  | "analytics"
  | "customerCare";

export interface Employee {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  department: string;
  position: string;
  type: string;
  identity: "A" | "T";
  completedAt: string | null;
  avatar: string;
  managerId?: string;
  /** Enterprise: nhân viên có chia sẻ kết quả với HR */
  shareWithHr?: boolean;
}

export interface TraitPercentages {
  E: number;
  I: number;
  N: number;
  S: number;
  T: number;
  F: number;
  J: number;
  P: number;
  A: number;
  T_id: number;
}

export interface Team {
  id: string;
  name: string;
  goal: TeamGoal;
  memberIds: string[];
  createdAt: string;
  createdBy: string;
}

export interface HRGuideEntry {
  howToMotivate: string[];
  howToManage: string[];
  bestRoles: string[];
  workStyle: string;
  communicationTip: string;
  stressWarning: string;
  teamContribution: string;
}

export interface CompanySettings {
  name: string;
  logoUrl: string;
  departments: string[];
  inviteToken: string;
}

export interface AuthUser {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  employeeId?: string;
}

export const TEAM_GOAL_LABELS: Record<TeamGoal, string> = {
  innovation: "Dự án sáng tạo / Innovation",
  operations: "Vận hành / Operations",
  sales: "Bán hàng / Sales",
  analytics: "Phân tích / Analytics",
  customerCare: "Chăm sóc khách hàng / Customer Care",
};

export function getEmployeeGroup(type: string): GroupName {
  const map: Record<string, GroupName> = {
    INTJ: "Analysts",
    INTP: "Analysts",
    ENTJ: "Analysts",
    ENTP: "Analysts",
    INFJ: "Diplomats",
    INFP: "Diplomats",
    ENFJ: "Diplomats",
    ENFP: "Diplomats",
    ISTJ: "Sentinels",
    ISFJ: "Sentinels",
    ESTJ: "Sentinels",
    ESFJ: "Sentinels",
    ISTP: "Explorers",
    ISFP: "Explorers",
    ESTP: "Explorers",
    ESFP: "Explorers",
  };
  return map[type] ?? "Analysts";
}
