import { Provider } from "@nestjs/common";
import { IDENTITY_PROVIDER } from "../constants/identity-provider.constants";
import { KeycloakProvider } from "./keycloak.provider";

export const IdentityProviderFactory: Provider = {
  provide: IDENTITY_PROVIDER,
  useClass: KeycloakProvider,
};