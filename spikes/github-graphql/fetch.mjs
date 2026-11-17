// Deneme A: bir hesabın repolarını ve yıl yıl katkı özetini GitHub GraphQL ile çeker,
// her sorgunun puan maliyetini yazdırır. Bağımlılık yok; Node.js'in yerleşik fetch'i kullanılır.
//
// Kullanım (repo kökünden):
//   node spikes/github-graphql/fetch.mjs [kullanıcı-adı]
//
// Belirteç GITHUB_TOKEN_SERVER ortam değişkeninden ya da kökteki .env dosyasından okunur.
// Çıktı spikes/github-graphql/out/<kullanıcı-adı>.json dosyasına yazılır (depoya girmez).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const login = process.argv[2] ?? 'lazypanic999';

function readToken() {
  if (process.env.GITHUB_TOKEN_SERVER) return process.env.GITHUB_TOKEN_SERVER;
  const envPath = join(here, '..', '..', '.env');
  if (!existsSync(envPath)) return undefined;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*GITHUB_TOKEN_SERVER\s*=\s*(.*)\s*$/);
    if (match) return match[1].replace(/^["']|["']$/g, '');
  }
  return undefined;
}

const token = readToken();
if (!token) {
  console.error(
    'GITHUB_TOKEN_SERVER bulunamadı. .env.example dosyasını .env olarak kopyalayıp doldur.',
  );
  process.exit(1);
}

const costs = [];

async function gql(label, query, variables) {
  const started = performance.now();
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'hisar-spike',
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await response.json();
  const ms = Math.round(performance.now() - started);
  const rate = body.data?.rateLimit;
  costs.push({ label, status: response.status, ms, cost: rate?.cost, remaining: rate?.remaining });
  console.log(
    `${label.padEnd(28)} HTTP ${response.status}  ${String(ms).padStart(5)} ms  ` +
      `maliyet=${rate?.cost ?? '-'}  kalan=${rate?.remaining ?? '-'}`,
  );
  if (body.errors) console.log(`  hata: ${body.errors.map((e) => e.message).join(' | ')}`);
  return body;
}

const RATE = 'rateLimit { cost remaining resetAt }';

const profileQuery = `
  query ($login: String!, $after: String) {
    user(login: $login) {
      login
      databaseId
      createdAt
      contributionsCollection { contributionYears }
      repositories(
        first: 100
        after: $after
        ownerAffiliations: [OWNER]
        orderBy: { field: CREATED_AT, direction: ASC }
      ) {
        totalCount
        pageInfo { hasNextPage endCursor }
        nodes {
          name
          isFork
          isArchived
          stargazerCount
          createdAt
          pushedAt
          primaryLanguage { name }
          repositoryTopics(first: 20) { nodes { topic { name } } }
          releases { totalCount }
        }
      }
    }
    ${RATE}
  }`;

const yearQuery = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
        commitContributionsByRepository(maxRepositories: 100) {
          repository { nameWithOwner }
          contributions { totalCount }
        }
      }
    }
    ${RATE}
  }`;

// 1) Profil ve repolar (sayfalı)
const repos = [];
let after = null;
let user;
let page = 1;
do {
  const body = await gql(`profil + repolar (sayfa ${page})`, profileQuery, { login, after });
  user = body.data?.user;
  if (!user) process.exit(1);
  repos.push(...user.repositories.nodes);
  after = user.repositories.pageInfo.hasNextPage ? user.repositories.pageInfo.endCursor : null;
  page += 1;
} while (after);

// 2) Her katkı yılı için bir sorgu
const years = {};
for (const year of user.contributionsCollection.contributionYears) {
  const body = await gql(`katkı ${year}`, yearQuery, {
    login,
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  });
  years[year] = body.data?.user?.contributionsCollection ?? null;
}

// 3) Yıl sınırı denemesi: bilerek iki yıllık aralık
const lastYear = user.contributionsCollection.contributionYears[0];
await gql('sınır denemesi (2 yıl)', yearQuery, {
  login,
  from: `${lastYear - 1}-01-01T00:00:00Z`,
  to: `${lastYear}-12-31T23:59:59Z`,
});

const totalCost = costs.reduce((sum, c) => sum + (c.cost ?? 0), 0);
console.log(
  `\nToplam: ${costs.length} sorgu, ${totalCost} puan, ${repos.length} repo, ${Object.keys(years).length} yıl.`,
);
console.log('Bu iki sayıyı ve sınır denemesinin sonucunu docs/DECISIONS.md içine yaz.');

const outDir = join(here, 'out');
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, `${login}.json`),
  JSON.stringify(
    { login, fetchedAt: new Date().toISOString(), costs, user, repos, years },
    null,
    2,
  ),
);
console.log(`Ham yanıt: spikes/github-graphql/out/${login}.json`);
