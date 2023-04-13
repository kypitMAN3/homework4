import { Profile } from "./profile.model";

export const profilesProviders = [
  {
    provide: 'PROFILES_REPOSITORY',
    useValue: Profile,
  },
];