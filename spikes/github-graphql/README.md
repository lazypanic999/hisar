# Deneme A: GitHub GraphQL maliyeti

Faz 0'ın iki sorusunu cevaplar:

1. Katkı özeti sorgusu (`contributionsCollection`) tek seferde en fazla ne kadarlık aralık kabul ediyor?
2. Orta boy bir hesabı çekmek kaç puan tutuyor?

## Çalıştırma

1. GitHub'da **Settings → Developer settings → Fine-grained tokens** altında belirteç oluştur. Repository access: **Public repositories (read-only)**. Ek izin gerekmez.
2. Kökte `.env.example` dosyasını `.env` olarak kopyala ve `GITHUB_TOKEN_SERVER=` satırına belirteci yaz. `.env` depoya girmez.
3. Repo kökünden çalıştır:

   ```sh
   node spikes/github-graphql/fetch.mjs lazypanic999
   ```

Betik her sorgunun süresini, puan maliyetini ve kalan kotayı yazdırır. Sonda bilerek iki yıllık bir aralık sorgular; API'nin verdiği hata, yıl sınırının kanıtıdır. Ham yanıt `spikes/github-graphql/out/` altına yazılır; bu klasör depoya girmez. Faz 1'deki test fixture'ları ayrıca hazırlanacak.

## Sonuç

Çalıştırınca buraya ve `docs/DECISIONS.md`'ye yaz:

- Sorgu sayısı ve toplam puan:
- İki yıllık aralık denemesinin sonucu:
