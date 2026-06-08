export const journalAccess = $state({
  granted: false
});

export function grantJournalAccess() {
  journalAccess.granted = true;
}

export function revokeJournalAccess() {
  journalAccess.granted = false;
}
