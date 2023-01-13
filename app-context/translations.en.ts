// TODO implement i18next and update this const object to comply if necessary.

export const Translation = {
  activityLog: 'Activity Log',
  add: 'Add',
  addANewTracker: 'Add a New Tracker',
  ago: 'ago',
  anythingYouWantToKeepTrackOf:
    'Anything you want to keep track of: habits? chores? achievements?',
  avgTime: 'Avg Time',
  cancel: 'Cancel',
  confirm: 'Confirm',
  date: 'Date',
  delete: 'Delete',
  deleteThing: (thing: string) => `Delete ${thing}?`,
  edit: 'Edit',
  thisWillDeleteTracker: (trackerName: string) =>
    `This will delete ${trackerName} and all of the data associated with it, are you sure?`,
  dismiss: 'Dismiss',
  errors: {
    aLogAlreadyExistsForThisTime: 'A log already exists for this time!',
    couldNotFindLogFrom: (date: Date) =>
      `Could not find a log from ${date.toString()}`,
    dateCannotBeInTheFuture: 'Date cannot be in the future!',
    unknownErrorYikes: 'Unknown Error... Yikes :(',
    youAlreadyHaveATrackerNamed: (name: string) =>
      `You already have a tracker named ${name}`,
  },
  lastXDays: (x: number) => `Last ${x} days`,
  letsBuildSomeInsights: "Let's build some insights",
  name: 'Name',
  youHaventLoggedAnythingYet: "You haven't logged anything yet",
  pageXOfY: (x: number, y: number) => `page ${x} of ${y}`,
  perPage: 'per page',
  reps: 'Reps',
  sorryCouldntFindThat: (thing: string) =>
    `Sorry, couldn't find that ${thing}.`,
  tapIconToRecordActivity: 'Tap icon to record first activity',
  tracker: 'Tracker',
  trackerNamePlaceholder: 'ex: Slept for 7+ hours',
  update: 'Update',
  view: 'View',
  viewThing: (thing: string) => `View ${thing}`,
  xAlreadyExists: (x?: string) =>
    x === undefined ? 'Already exists' : `${x} already exists`,
  xDays: (x: number) => `${x} days`,
  whenDidIDoThat: 'When did I do that?',
  yes: 'Yes',
} as const;
