import { UserType } from "../../../common/enums/UserType.enum";

export interface RequestUserContext {
  userId: string;
  externalAuthId: string;
  email: string;
  orgId: string;
  userType: UserType;
  allowedLocationIds: string[];
}