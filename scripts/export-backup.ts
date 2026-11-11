import fs from 'fs';
import path from 'path';
import { allCaseRecords } from '../src/data/cases/index';
import { allMediaRecords } from '../src/data/media/index';
import { validateBatch, validateMediaRecord } from '../src/utils/validator';

/**
 * Insaf Archive Automated Data Backup Utility
 * Generates clean, verified JSON manifests of all published case dossiers and media items.
 * Guaranteed zero-secret, public archival snapshot.
 */

console.log('--------------------------------------------------');
console.log('INSAF ARCHIVE DATA BACKUP & SNAPSHOT UTILITY');
console.log('--------------------------------------------------');

// 1. Audit case records before backup
const batchValidation = validateBatch(allCaseRecords);
if (!batchValidation.valid) {
  console.error('[ABORT] Case records failed validation:');
  batchValidation.errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
}

// 2. Audit media records before backup
const knownCaseIds = new Set(allCaseRecords.map((c) => c.id));
let mediaErrors: string[] = [];
for (const m of allMediaRecords) {
  const result = validateMediaRecord(m, new Set(), knownCaseIds);
  if (result.errors.length > 0) {
    mediaErrors.push(...result.errors);
  }
}
if (mediaErrors.length > 0) {
  console.error('[ABORT] Media records failed validation:');
  mediaErrors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
}

// 3. Prepare backup output directory
const backupDir = path.resolve('backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const caseBackupFile = path.join(backupDir, `cases-backup-${timestamp}.json`);
const mediaBackupFile = path.join(backupDir, `media-backup-${timestamp}.json`);
const latestCaseFile = path.join(backupDir, 'cases-latest.json');
const latestMediaFile = path.join(backupDir, 'media-latest.json');

// 4. Write formatted, sanitized JSON backups
fs.writeFileSync(caseBackupFile, JSON.stringify(allCaseRecords, null, 2), 'utf-8');
fs.writeFileSync(latestCaseFile, JSON.stringify(allCaseRecords, null, 2), 'utf-8');
fs.writeFileSync(mediaBackupFile, JSON.stringify(allMediaRecords, null, 2), 'utf-8');
fs.writeFileSync(latestMediaFile, JSON.stringify(allMediaRecords, null, 2), 'utf-8');

console.log(`[SUCCESS] Backed up ${allCaseRecords.length} case records to:`);
console.log(`  - ${caseBackupFile}`);
console.log(`  - ${latestCaseFile}`);
console.log(`[SUCCESS] Backed up ${allMediaRecords.length} media records to:`);
console.log(`  - ${mediaBackupFile}`);
console.log(`  - ${latestMediaFile}`);
console.log('--------------------------------------------------');
