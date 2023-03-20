// TODO implement i18next and update this const object to comply if necessary.

import { MethodMap } from '@fight-picks/models';

export const Translation = {
  adminDashboard: 'Admin Dashboard',
  add: 'Add',
  cancel: 'Cancel',
  canceled: 'Canceled',
  confidence: 'confidence',
  confirm: 'Confirm',
  confidenceMeter: (confidence: number) =>
    '$'.repeat(Math.max(0, Math.min(confidence, 5))),
  dismiss: 'Dismiss',
  editResult: 'Edit Results',
  editPicks: 'Edit Picks',
  errors: {
    unknownErrorYikes: 'Unknown Error... Yikes :(',
  },
  fight: 'Fight',
  fights: 'Fights',
  logOut: 'Log Out',
  name: 'Name',
  noFightsLoaded: 'No Fights Loaded',
  method: 'Method',
  pageXOfY: (x: number, y: number) => `page ${x} of ${y}`,
  perPage: 'per page',
  picks: 'Picks',
  player: 'Player',
  rank: 'Rank',
  results: 'Results',
  round: 'Round',
  roundMethod: (round: number | string | undefined | null, method: string) => {
    if (!round) return method;
    return `R${round} ${method}`;
  },
  score: 'Score',
  scores: 'Scores',
  sorryCouldntFindThat: (thing: string) =>
    `Sorry, couldn't find that ${thing}.`,
  shorthandMethodOfVictory: (method: string) => {
    if (method === MethodMap.decision) return 'DEC';
    if (method === MethodMap.knockout) return 'KO';
    if (method === MethodMap.submission) return 'SUB';
    if (method === MethodMap.no_contest) return 'NC';
    if (method === MethodMap.draw) return 'DRAW';
    if (method === MethodMap.disqualification) return 'DQ';
    return 'ERR';
  },
  thereAreNoScoresYet: 'There are no scores yet',
  users: 'Users',
  vs: 'vs',
  winner: 'Winner',
  xRoundsAtYWeight: (rounds: number | string, weight: number | string) =>
    `${rounds} rounds at ${weight}lbs`,
  yes: 'Yes',
} as const;
