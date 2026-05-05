export interface IdentityUserPayload {
  email: string;
  tempPassword?: string;
  organizationId: string;
  userType: string;
}

export interface VerifiedIdentity {
  externalAuthId: string;
  email: string;
}

export interface IdentityProvider {
  createUser(payload: IdentityUserPayload): Promise<{ externalAuthId: string }>;

  verifyToken(token: string): Promise<VerifiedIdentity>;

  disableUser(externalAuthId: string): Promise<void>;

  updateUserMetadata(
    externalAuthId: string,
    metadata: Record<string, any>
  ): Promise<void>;
}