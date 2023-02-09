// TODO implement i18next and update this const object to comply if necessary.

export const Translation = {
  add: 'Add',
  cancel: 'Cancel',
  confirm: 'Confirm',
  confidenceMeter: (confidence: number) =>
    '$'.repeat(Math.max(0, Math.min(confidence, 5))),
  dismiss: 'Dismiss',
  errors: {
    unknownErrorYikes: 'Unknown Error... Yikes :(',
  },
  name: 'Name',
  pageXOfY: (x: number, y: number) => `page ${x} of ${y}`,
  perPage: 'per page',
  sorryCouldntFindThat: (thing: string) =>
    `Sorry, couldn't find that ${thing}.`,
  shorthandMethodOfVictory: (method: string) => {
    if (method === 'decision') return 'DEC';
    if (method === 'knockout') return 'KO';
    if (method === 'submission') return 'SUB';
    if (method === 'no_contest') return 'NC';
    if (method === 'draw') return 'DRAW';
    if (method === 'disqualification') return 'DQ';
    return 'ERR';
  },
  vs: 'vs',
  xRoundsAtYWeight: (rounds: number | string, weight: number | string) =>
    `${rounds} rounds at ${weight}lbs`,
  yes: 'Yes',
  roundMethod: (round: number | string | undefined | null, method: string) => {
    if (!round) return method;
    return `R${round} ${method}`;
  },
} as const;
