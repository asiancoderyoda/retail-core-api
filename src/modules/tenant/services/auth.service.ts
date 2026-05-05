import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserLocationAccessRepository } from "../repositories/user-location-access.repository";
import { IDENTITY_PROVIDER } from "../constants/identity-provider.constants";
import { type IdentityProvider } from "../interfaces/identity-provider.interface";
import { RequestUserContext } from "../interfaces/request-user-context.interface";


@Injectable()
export class AuthService {
  constructor(
    @Inject(IDENTITY_PROVIDER)
    private readonly identityProvider: IdentityProvider,
    private readonly userRepository: UserRepository,
    private readonly userLocationAccessRepository: UserLocationAccessRepository
  ) {}

  async validateBearerToken(token: string): Promise<RequestUserContext> {
    const identity = await this.identityProvider.verifyToken(token);

    const user = await this.userRepository.findByExternalAuthId(
      identity.externalAuthId
    );

    if (!user) {
      throw new UnauthorizedException("User not registered in platform");
    }

    const locationAccess =
      await this.userLocationAccessRepository.findActiveLocationIdsByUser(user.id);

    return {
      userId: user.id,
      externalAuthId: identity.externalAuthId,
      email: user.email,
      orgId: user.organization.id,
      userType: user.userType,
      allowedLocationIds: locationAccess.map((x) => x.location.id),
    };
  }
}