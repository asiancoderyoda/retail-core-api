import { Injectable, UnauthorizedException } from "@nestjs/common";
import KcAdminClient from "keycloak-admin";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { IdentityProvider, IdentityUserPayload, VerifiedIdentity } from "../interfaces/identity-provider.interface";

@Injectable()
export class KeycloakProvider implements IdentityProvider {
  private kcAdmin: KcAdminClient;
  private jwks: ReturnType<typeof createRemoteJWKSet>;

  private readonly baseUrl = process.env.KEYCLOAK_BASE_URL!;
  private readonly realm = process.env.KEYCLOAK_REALM!;
  private readonly clientId = process.env.KEYCLOAK_CLIENT_ID!;
  private readonly clientSecret = process.env.KEYCLOAK_CLIENT_SECRET!;
  private readonly adminUsername = process.env.KEYCLOAK_ADMIN_USERNAME!;
  private readonly adminPassword = process.env.KEYCLOAK_ADMIN_PASSWORD!;

  constructor() {
    this.kcAdmin = new KcAdminClient({
      baseUrl: this.baseUrl,
      realmName: this.realm,
    });

    this.jwks = createRemoteJWKSet(
      new URL(
        `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/certs`
      )
    );
  }

  private async adminLogin() {
    await this.kcAdmin.auth({
      username: this.adminUsername,
      password: this.adminPassword,
      grantType: "password",
      clientId: "admin-cli",
    });
  }

  async createUser(payload: IdentityUserPayload): Promise<{ externalAuthId: string }> {
    await this.adminLogin();

    const user = await this.kcAdmin.users.create({
      realm: this.realm,
      email: payload.email,
      username: payload.email,
      enabled: true,
      emailVerified: true,
      attributes: {
        organizationId: [payload.organizationId],
        userType: [payload.userType],
      },
      credentials: payload.tempPassword
        ? [
            {
              type: "password",
              value: payload.tempPassword,
              temporary: true,
            },
          ]
        : undefined,
    });

    return {
      externalAuthId: user.id!,
    };
  }

  async verifyToken(token: string): Promise<VerifiedIdentity> {
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: `${this.baseUrl}/realms/${this.realm}`,
      });

      return {
        externalAuthId: payload.sub as string,
        email: payload.email as string,
      };
    } catch {
      throw new UnauthorizedException("Invalid auth token");
    }
  }

  async disableUser(externalAuthId: string): Promise<void> {
    await this.adminLogin();

    await this.kcAdmin.users.update(
      {
        realm: this.realm,
        id: externalAuthId,
      },
      {
        enabled: false,
      }
    );
  }

  async updateUserMetadata(
    externalAuthId: string,
    metadata: Record<string, any>
  ): Promise<void> {
    await this.adminLogin();

    await this.kcAdmin.users.update(
      {
        realm: this.realm,
        id: externalAuthId,
      },
      {
        attributes: Object.fromEntries(
          Object.entries(metadata).map(([k, v]) => [k, [String(v)]])
        ),
      }
    );
  }
}