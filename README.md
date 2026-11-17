# Hisar

GitHub kullanıcı adını alıp o kişinin geçmişini zamanda ilerleyen bir strateji oyunu üssüne çevirir. (Çalışma adı; kalıcı ad Faz 0'da seçilecek.)

**Durum:** Faz 0, kurulum. Plan: [docs/PLAN.md](docs/PLAN.md) · Kararlar: [docs/DECISIONS.md](docs/DECISIONS.md)

## Yerelde çalıştırma

Gerekenler: Node.js (güncel LTS) ve pnpm (`npm install -g pnpm@latest`).

```sh
pnpm install
pnpm test
```

Depo yeni klonlandıysa ve `package.json` içinde henüz `devDependencies` yoksa önce bir kez `node scripts/bootstrap.mjs` çalıştır.
