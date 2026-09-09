#!/usr/bin/env node
/**
 * Submits the site's URLs to IndexNow, which pushes them to Bing, Yandex,
 * Naver and Seznam at once. Google does not participate.
 *
 * IndexNow verifies ownership by fetching the key file at the site root, so
 * `public/<key>.txt` has to be deployed before a submission will be accepted.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs              # dry run — prints what it would send
 *   node scripts/submit-indexnow.mjs --submit     # actually submits
 *   node scripts/submit-indexnow.mjs --submit --host https://staging.example.com
 *
 * Run it AFTER a deploy. Submitting URLs that 404 wastes the quota and teaches
 * the engines to trust the feed less.
 */

const KEY = "a1be801e6fcd4a77ad9025697864b21d";
const DEFAULT_HOST = "https://tricityrides.in";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const args = process.argv.slice(2);
const submit = args.includes("--submit");
const hostArg = args[args.indexOf("--host") + 1];
const host = args.includes("--host") && hostArg ? hostArg.replace(/\/+$/, "") : DEFAULT_HOST;

function fail(message) {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}

const sitemapUrl = `${host}/sitemap.xml`;
console.log(`\n  Reading ${sitemapUrl}`);

const response = await fetch(sitemapUrl).catch((error) => fail(`Could not fetch the sitemap: ${error.message}`));
if (!response.ok) fail(`Sitemap returned ${response.status}.`);

const xml = await response.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) fail("No <loc> entries found in the sitemap.");

// The key file must be reachable, or every submission is rejected.
const keyUrl = `${host}/${KEY}.txt`;
const keyCheck = await fetch(keyUrl).catch(() => null);
const keyBody = keyCheck?.ok ? (await keyCheck.text()).trim() : null;

console.log(`  Key file: ${keyUrl}`);
if (keyBody === KEY) {
  console.log("            reachable and matches\n");
} else if (keyBody === null) {
  console.log(`            NOT REACHABLE (${keyCheck ? keyCheck.status : "network error"}) — deploy it first\n`);
} else {
  console.log("            reachable but the contents do not match the key\n");
}

console.log(`  ${urls.length} URLs:`);
for (const url of urls) console.log(`    ${url}`);

if (!submit) {
  console.log("\n  Dry run. Re-run with --submit to send these.\n");
  process.exit(0);
}

if (keyBody !== KEY) {
  fail("Refusing to submit: the key file is not live yet, so the request would be rejected.");
}

const hostname = new URL(host).hostname;
const result = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: hostname, key: KEY, keyLocation: keyUrl, urlList: urls }),
});

// 200 accepted, 202 accepted but key still being validated.
if (result.status === 200 || result.status === 202) {
  console.log(`\n  Submitted ${urls.length} URLs — HTTP ${result.status}.\n`);
} else {
  fail(`IndexNow returned ${result.status}: ${await result.text()}`);
}
