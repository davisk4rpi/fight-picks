import { Fight } from '@fight-picks/models';

export type AsyncStatus = 'pending' | 'complete';

export type NormalizedFights = Map<string, Fight>;
