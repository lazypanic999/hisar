# Karar günlüğü

Her kayıt: tarih, karar, alternatifler, neden. En yeni kayıt en üstte. Her faz en az üç kayıt.

---

## Faz 0

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

- [ ] Katkı özeti sorgusunun tarih aralığı sınırı (belge bağlantısıyla).
- [ ] Deneme A'da ölçülen puan maliyeti.
- [ ] Cloudflare ücretsiz katman sınırları (Workers, D1, KV).
- [ ] Web tarafının barındırılması: Pages veya Workers static assets.
- [ ] Ürün adı.
