# Karar günlüğü

Her kayıt: tarih, karar, alternatifler, neden. En yeni kayıt en üstte. Her faz en az üç kayıt.

---

## Faz 0

### 2026-11-17: Web arayüzü Workers static assets ile yayınlanır

- **Karar:** `apps/web` derleme çıktısı Cloudflare Pages yerine Workers static assets ile yayınlanır. `apps/api` ayrı bir Worker olarak kalır.
- **Alternatifler:** Cloudflare Pages; web ile API'yi tek bir Worker'da birleştirmek.
- **Neden:** Cloudflare yeni projeler için Workers static assets'i öneriyor ve yeni özellikler oraya geliyor. Pages çalışmaya devam ediyor ama gelişimin merkezi Workers. Plan web ve API'yi ayrı paketler olarak tanımladığı için iki Worker ile başlanır; tek Worker'a birleştirme Faz 6'da yeniden değerlendirilir.

### 2026-11-17: Cloudflare ücretsiz katman sınırları

- **Karar:** Mimari aşağıdaki sınırlara göre tasarlanır (Workers Free planı, Kasım 2026; sınırlar her gün 00:00 UTC'de sıfırlanır):

  | Hizmet                    | Sınır                                             |
  | ------------------------- | ------------------------------------------------- |
  | Workers istek             | Günde 100.000                                     |
  | Workers CPU               | İstek başına 10 ms                                |
  | Workers alt istek         | İstek başına 50 (`fetch`, KV, D1 çağrıları dahil) |
  | KV okuma / yazma          | Günde 100.000 / günde 1.000                       |
  | KV depolama               | 1 GB                                              |
  | D1 okunan / yazılan satır | Günde 5 milyon / günde 100.000                    |
  | D1 depolama               | 5 GB                                              |

- **Alternatifler:** Workers Paid planı (aylık 5 dolar).
- **Neden:** Plan aylık 0 TL hedefliyor. Bu sınırların üçü plana doğrudan dokunuyor ve Faz 1 ile Faz 5'te karar gerektiriyor:
  1. **KV günde 1.000 yazma.** Plan her yeni üssü ve her README kartını KV'ye yazıyor. Bölüm 10'daki "saatte 300 yeni üs" alarm eşiğinde KV yazma kotası birkaç saatte biter. Öneri: olay listeleri D1'de (günde 100.000 satır yazma), sıcak yanıtlar Cache API'de (kota yok, veri merkezi başına) tutulsun; KV yalnızca ana sayfadaki üç örnek üs gibi az değişen kayıtlar için kullanılsın.
  2. **İstek başına 10 ms CPU.** README kartını Worker içinde motorla üretmek bu sınırı aşabilir. Faz 5'te ölçülmeli; aşarsa kart, olay listesi yazılırken bir kez üretilip saklanır.
  3. **İstek başına 50 alt istek.** 8 yıllık hesap yılda bir katkı sorgusu (8), sayfalı repo listesi (500 repo için 5) ve D1/KV çağrıları demek. Sınırın altında ama Faz 1'de çekim başına alt istek sayısı ölçülüp `fetch_log`'a yazılmalı.

### 2026-11-17: Katkı özeti sorgusu en fazla bir yıl kapsar

- **Karar:** `contributionsCollection(from, to)` her çağrıda en fazla bir yıllık aralıkla sorgulanır. Hesap yaşı kadar sorgu atılır; yıllar `contributionYears` alanından okunur.
- **Alternatifler:** Yok. API tek seferde daha uzun aralık kabul etmiyor.
- **Neden:** GitHub GraphQL belgesine göre `from` ile `to` arasında en fazla bir yıl olabilir. Belge sayfası bu oturumdan açılamadı; bilgi belgeyi alıntılayan topluluk yanıtlarından ve SDK açıklamalarından doğrulandı. Deneme A (`spikes/github-graphql`) bilerek iki yıllık bir aralık da sorgular ve API'nin verdiği hatayı yazdırır; kesin doğrulama o betiğin çıktısıdır.
- **Ölçülen puan maliyeti:** Deneme A çalıştırılınca buraya yazılacak.

### 2026-11-17: TypeScript 6.x'e sabitlendi

- **Karar:** `typescript` bağımlılığı `^6` aralığında tutulur.
- **Alternatifler:** TypeScript 7 ile devam edip ESLint'te tip bilgili kuralları kapatmak; lint için ayrı bir TS 6 kopyası kurmak.
- **Neden:** Bootstrap en güncel sürüm olarak TypeScript 7.0'ı kurdu. İlk CI çalışmasında typescript-eslint "TS 7.0 desteklenmiyor" hatasıyla durdu. typescript-eslint, TS 7'yi desteklediğinde yükseltme ayrı bir PR ile yapılır.

### 2026-11-17: İlk commit doğrudan main'e

- **Karar:** Boş depoda tek bir başlangıç commit'i (iskelet ve belgeler) doğrudan `main`'e atılır. Sonraki her değişiklik `faz<N>/<ad>` dalından PR ile gelir.
- **Alternatifler:** Boş bir `main` açıp iskeleti PR ile getirmek.
- **Neden:** PR açmak için hedef dalın var olması gerekir. Boş bir commit ile açmak da aynı istisnayı yapmak demek, üstelik bir adım fazla.

### 2026-11-17: Sürümler kurulum anında çözülür

- **Karar:** `package.json` dosyalarına elle sürüm yazılmaz. `scripts/bootstrap.mjs`, paketleri `pnpm add` ile güncel kararlı sürümlerinden kurar; sonuç `pnpm-lock.yaml` içinde sabitlenir ve commit edilir.
- **Alternatifler:** Ezberden sürüm yazmak.
- **Neden:** CLAUDE.md ezberden sürüm yazmayı yasaklıyor. Ayrıca iskeleti yazan oturum npm kayıt deposuna erişemiyordu.

### 2026-11-17: Tip kontrolü tek kök tsconfig ile

- **Karar:** `pnpm typecheck`, kökteki tek `tsconfig.json` ile tüm paketleri birlikte denetler. Paketler derlenmez; `exports` doğrudan `src/index.ts` dosyasını gösterir.
- **Alternatifler:** Project references (`tsc -b`) kullanmak; her pakette ayrı `tsc` çalıştırmak.
- **Neden:** Tüm paketler henüz aynı ortamı hedefliyor ve iç paketlerin derlenmiş çıktıya ihtiyacı yok, çünkü Vite ve Wrangler TS kaynağını doğrudan paketler. Faz 3'te web (DOM) ile api'nin (Workers) tip ortamları ayrışınca paket başına tsconfig'e geçilir.

### 2026-11-17: Motor saflığı lint ile zorlanır

- **Karar:** ESLint, `packages/engine` içinde `Math.random`, `Date.now`, argümansız `new Date()`, `fetch` ve Node modüllerini hata olarak işaretler.
- **Alternatifler:** Kuralı yalnızca CLAUDE.md'de yazılı bırakmak.
- **Neden:** Determinizm ürünün temeli. Bu kurala uyulup uyulmadığını incelemede gözle yakalamak yerine CI kontrol etsin.

### 2026-11-17: Satır sonları LF

- **Karar:** `.gitattributes` tüm metin dosyalarını LF olarak tutar; Prettier da `endOfLine: lf` kullanır.
- **Alternatifler:** Git'in `autocrlf` ayarına bırakmak.
- **Neden:** Geliştirme Windows'ta, CI Linux'ta yapılıyor. CRLF farkları `format:check` adımını gereksiz yere kırar.

### Faz 0'da yazılacak açık kayıtlar

- [x] Katkı özeti sorgusunun tarih aralığı sınırı.
- [ ] Deneme A'da ölçülen puan maliyeti (betik hazır, belirteçle çalıştırılmayı bekliyor).
- [x] Cloudflare ücretsiz katman sınırları.
- [x] Web tarafının barındırılması: Workers static assets.
- [ ] Ürün adı (adaylar `docs/NAMING.md` içinde).
