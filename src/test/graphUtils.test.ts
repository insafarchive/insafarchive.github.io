/**
 * Unit Tests for Relationship Graph & Cross-Node Linking
 */

import { describe, it, expect } from 'vitest';
import { resolveConnectedRecords } from '../utils/graphUtils';
import { SEED_ARCHIVE_RECORDS } from '../data/seedRecords';

describe('Relationship Graph & Linkage Engine', () => {
  it('resolves direct and inverse links between Arshad Sharif Profile and Killing record', () => {
    const profileId = 'rec-pk-journalist-arshad-sharif-profile';
    const killingId = 'rec-pk-2022-arshad-sharif-killing';

    const connectedToProfile = resolveConnectedRecords(profileId, SEED_ARCHIVE_RECORDS);
    const connectedToKilling = resolveConnectedRecords(killingId, SEED_ARCHIVE_RECORDS);

    // Profile points to Killing (subjectOf)
    const killingLink = connectedToProfile.find(c => c.targetRecord.id === killingId);
    expect(killingLink).toBeDefined();

    // Killing connects back to Profile (involvesPerson)
    const profileLink = connectedToKilling.find(c => c.targetRecord.id === profileId);
    expect(profileLink).toBeDefined();
  });

  it('correctly maps JIT report and Supreme Court proceedings to Killing incident', () => {
    const killingId = 'rec-pk-2022-arshad-sharif-killing';
    const connected = resolveConnectedRecords(killingId, SEED_ARCHIVE_RECORDS);

    const jitReport = connected.find(c => c.targetRecord.id === 'rec-pk-2022-arshad-sharif-jit-report');
    expect(jitReport).toBeDefined();

    const scNotice = connected.find(c => c.targetRecord.id === 'rec-pk-2022-arshad-sharif-sc-suomotu');
    expect(scNotice).toBeDefined();
  });
});
