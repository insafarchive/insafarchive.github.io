/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Constitutional Articles Dataset — Comprehensive Consolidated Library
 * Aggregates all Batches (A through I) covering Preamble, Fundamental Rights,
 * Principles of Policy, Federation, Provinces, Finance, Judicature, Elections,
 * Islamic, Emergency, and Transitional Provisions.
 * Verbatim text from Official Gazette of Pakistan & Pakistan Code
 */

import type { ConstitutionalArticle } from '../../types/constitution';
import { CONSTITUTION_BATCH_A } from './batches/batchA';
import { CONSTITUTION_BATCH_B } from './batches/batchB';
import { CONSTITUTION_BATCH_C } from './batches/batchC';
import { CONSTITUTION_BATCH_D } from './batches/batchD';
import { CONSTITUTION_BATCH_E } from './batches/batchE';
import { CONSTITUTION_BATCH_F } from './batches/batchF';
import { CONSTITUTION_BATCH_G } from './batches/batchG';
import { CONSTITUTION_BATCH_H } from './batches/batchH';
import { CONSTITUTION_BATCH_I } from './batches/batchI';

export const CONSTITUTION_ARTICLES: ConstitutionalArticle[] = [
  ...CONSTITUTION_BATCH_A,
  ...CONSTITUTION_BATCH_B,
  ...CONSTITUTION_BATCH_C,
  ...CONSTITUTION_BATCH_D,
  ...CONSTITUTION_BATCH_E,
  ...CONSTITUTION_BATCH_F,
  ...CONSTITUTION_BATCH_G,
  ...CONSTITUTION_BATCH_H,
  ...CONSTITUTION_BATCH_I,
];
