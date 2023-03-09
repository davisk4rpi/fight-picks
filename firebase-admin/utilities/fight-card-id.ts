import { OrgSlug } from '@fight-picks/models';

export const generateFightCardId = (org: OrgSlug, mainCardDate: Date) =>
  `${org}-${mainCardDate.toISOString()}`;
