import { randomInt } from "node:crypto";

/** Unambiguous alphabet: no 0/O, 1/I, 5/S, 8/B. */
const ALPHABET = "ACDEFGHJKLMNPQRTUVWXYZ2346789";

/**
 * Customer-facing enquiry reference, e.g. TR-7K3F9Q.
 * The Prisma cuid is never shown to customers.
 */
export function generateReference(): string {
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += ALPHABET[randomInt(ALPHABET.length)];
  }
  return `TR-${out}`;
}

export const REFERENCE_PATTERN = /^TR-[ACDEFGHJKLMNPQRTUVWXYZ2346789]{6}$/;

export function isValidReference(value: string): boolean {
  return REFERENCE_PATTERN.test(value);
}
