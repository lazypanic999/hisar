# GitHub İmparatorluğu: geliştirme planı

Nov 16, 2026 · @Doğukan Sağlık

## 1. Özet ve farklılaşma

Ürün, bir GitHub kullanıcı adını alıp o kişinin tüm geçmişini zamanda ilerleyen bir strateji oyunu üssüne çevirir: repolar bina olur, katkılar kaynak olur, kilometre taşları çağ atlatır. Çalışma adı **Hisar**; kalıcı ad Faz 0'da seçilecek.

**Kullanıcı:** GitHub hesabı olan geliştiriciler. İlk kullanıcı sensin.

**Rakipler (16 Kasım 2026 itibarıyla baktıklarım):**

| Ürün | Ne yapıyor | Bizde olup onda olmayan |
| --- | --- | --- |
| [GitKingdom](https://dev.to/rgourley/i-built-gitkingdom-where-github-becomes-a-fantasy-kingdom-27lb) | Tüm GitHub tek dünya haritası; her dil bir krallık, repo büyüklüğü yıldız sayısına bağlı | Kişisel üs, zaman içinde ilerleme, çağ sistemi |
| [Git City](https://github.com/srizzon/git-city) | Her kullanıcı ortak şehirde tek bir bina; yükseklik katkı sayısı | Repo başına bina, geçmişin tekrar oynatılması |
| [Repolis](https://www.producthunt.com/p/repolis/repolis) | Repolar yürünebilir 3B şehirde bina | Kaynak ekonomisi, çağlar, zaman tüneli |

Bu alan dolu. Tutunmak için tek bir şeyi herkesten iyi yapacağız: **zaman**. Rakiplerin hepsi bugünün anlık görüntüsünü gösteriyor. Hisar, hesabın açıldığı günden bugüne üssün nasıl büyüdüğünü oynatır ve sonunda strateji oyunlarındaki maç sonu grafiğine benzeyen bir zaman çizelgesi verir.

**Üç ayırt edici özellik (MVP'nin omurgası):**

1. Zaman tüneli: kaydırıcıyla herhangi bir tarihe git, ya da baştan sona hızlandırılmış oynat.
2. Çağ atlama: ölçülebilir kilometre taşlarına bağlı dört çağ ve her atlamada tarihli bir kayıt.
3. README kartı: üssün güncel halini GitHub profiline gömülebilen SVG olarak verir. Yayılma kanalı budur.

**Fikri mülkiyet kuralı:** Age of Empires yalnızca ilham kaynağı. Oyunun adı, çağ adları, logosu, görselleri ve sesleri hiçbir yerde kullanılmayacak.

## 2. Kapsam

MVP, giriş yapmadan çalışan ve yalnızca herkese açık veriyi kullanan tek sayfalık bir deneyimdir. Varsayım: haftada 10–15 saat, 10 hafta, toplam yaklaşık 120 saat.

**MVP'de var:**

- Kullanıcı adı gir, üssünü gör: `/u/<kullanıcı-adı>` adresinde izometrik harita.
- Repo başına bina, dört kaynak, dört çağ, nüfus, skor (kurallar Bölüm 3).
- Zaman tüneli: kaydırıcı, oynat/duraklat, 1x/4x/16x hız.
- Maç sonu ekranı: yıllara göre kaynak grafiği ve çağ atlama işaretleri.
- Binaya tıklayınca repo kartı: ad, dil, yıldız, commit sayısı, GitHub bağlantısı.
- README kartı: `/u/<ad>/card.svg`.
- PNG olarak indir ve bağlantı paylaş (Open Graph önizlemesiyle).
- Türkçe ve İngilizce arayüz, açık ve koyu tema.

**MVP'de yok:**

- GitHub ile giriş ve özel repo katkıları.
- Kullanıcılar arası karşılaştırma, savaş, sıralama tablosu.
- Organizasyon haritaları.
- Ödeme, hesap, ayarlar sayfası.
- Ses, müzik, 3B.
- Kullanıcının binaları elle yerleştirmesi.

**Sonraki sürümler (sırayla):**

1. v1.1: GitHub ile giriş; özel katkı sayıları ve kullanıcının kendi API kotası.
2. v1.2: İki üssü yan yana karşılaştırma.
3. v1.3: Ücretli görünüm paketleri ve animasyonlu GIF/MP4 dışa aktarma. İlk gelir denemesi burada.
4. v2: Organizasyon haritaları (takımlara satılabilecek tek özellik).

## 3. Oyun kuralları

Motor, GitHub olaylarının tarihli listesini alır ve verilen bir tarih için üssün durumunu döndürür; aynı girdi her zaman aynı çıktıyı verir. Aşağıdaki tüm eşikler başlangıç değeridir ve tek bir `rules.ts` dosyasında durur.

**Kaynaklar**

| Kaynak | GitHub karşılığı |
| --- | --- |
| Yiyecek | Commit sayısı |
| Odun | Birleşen pull request sayısı |
| Altın | Kendi repolarına gelen yıldız sayısı |
| Taş | Kapanan issue ve yapılan kod incelemesi sayısı |

**Binalar**

- Her repo bir binadır. Fork'lar yalnızca kullanıcı içlerinde commit attıysa sayılır.
- Bina türü repo konusuna göre seçilir: web arayüzü pazar, CLI veya kütüphane atölye, altyapı kale, dokümantasyon kütüphane, diğerleri ev. Eşleme dil ve `topics` alanından yapılır.
- Bina seviyesi o repodaki commit sayısına göredir: 1, 10, 50, 200, 1000 eşiklerinde seviye 1–5.
- Yıldızlar süs ekler: 1, 10, 100 yıldızda bayrak, kule, altın çatı.
- Arşivlenmiş repo harabeye döner. Son 12 ayda commit almayan repo solgun çizilir.
- En fazla 60 bina çizilir; fazlası commit sayısına göre elenir ve "şehir dışı köyler" sayacında gösterilir.

**Çağlar**

| Çağ | Koşul (hepsi birlikte) |
| --- | --- |
| I. Yerleşim | Hesap açıldı |
| II. Zanaat | 100 commit ve 3 repo |
| III. Kale | 500 commit, 1 yayınlanmış sürüm, başkasının reposunda 1 birleşen PR |
| IV. İmparatorluk | 2000 commit, 5 sürüm, toplam 10 yıldız |

Çağ atlama tarihi kaydedilir ve hem haritada hem zaman çizelgesinde gösterilir. Çağ, binaların görsel setini değiştirir.

**Diğer öğeler**

- Nüfus: son 90 gündeki aktif gün sayısı kadar köylü haritada yürür (en fazla 40).
- Ticaret yolları: başkalarının repolarına birleşen her PR, harita kenarına giden bir kervan yolu açar.
- Teknoloji ağacı: kullanılan her dil "araştırılmış teknoloji" olarak listelenir; ilk kullanım tarihiyle.
- Anıt: 100 yıldızı geçen repo anıt olarak çizilir.
- Skor: `yiyecek + 5×odun + 10×altın + 3×taş`.

**Yerleşim algoritması**

- Harita 32×32 karodur. Merkezde şehir meydanı durur.
- Binalar oluşturulma tarihine göre merkezden dışa doğru spiral şeklinde yerleşir. Böylece zaman tünelinde şehir içten dışa büyür.
- Rastgelelik gereken her yerde tohum olarak kullanıcı adının hash'i kullanılır. `Math.random()` yasaktır.

## 4. Mimari

Sistem dört parçadan oluşur: veri çekici, kural motoru, çizim katmanı ve paylaşım uçları. Hepsi tek bir Cloudflare hesabının ücretsiz katmanında çalışacak şekilde seçildi.

**Veri akışı**

1. Tarayıcı `/api/empire/<ad>` isteği atar.
2. Worker önbelleğe bakar. 24 saatten yeni kayıt varsa onu döner.
3. Yoksa GitHub GraphQL API'den profili, repoları ve yıl yıl katkı özetini çeker.
4. Ham yanıt ortak bir olay listesine çevrilir: `{tarih, tür, repo, miktar}`.
5. Olay listesi veritabanına yazılır ve tarayıcıya döner.
6. Tarayıcıdaki motor, olay listesinden seçilen tarihin üs durumunu hesaplar.
7. Çizim katmanı durumu izometrik haritaya çizer.
8. README kartı isteğinde aynı motor Worker içinde çalışır ve SVG metni üretir.

**Bileşenler ve gerekçeler**

| Bileşen | Seçim | Neden |
| --- | --- | --- |
| Dil | TypeScript (her yerde) | Motor hem tarayıcıda hem Worker'da çalışmalı; tek dil tek kod demek |
| Motor | Saf TypeScript paketi, bağımlılıksız | Test edilebilirlik ve deterministik çıktı |
| Arayüz | React + Vite | Zaten biliyorsun; öğrenme bütçesi çizime gitsin |
| Çizim | PixiJS (2B, WebGL) | 60 bina ve 40 hareketli birim için hafif; tam oyun motoru gerekmiyor |
| Grafik | Elle çizilmiş SVG (zaman çizelgesi) | Tek grafik için kütüphane yükü gereksiz |
| API | Cloudflare Workers + Hono | Ücretsiz katman, zaten biliyorsun |
| Veritabanı | Cloudflare D1 (SQLite) | Olay listeleri ve çağ kayıtları |
| Önbellek | Cloudflare KV | Hazır yanıt ve SVG kartları |
| Altyapı tanımı | OpenTofu (Cloudflare provider) | CV'ndeki IaC boşluğunu bu proje kapatır |
| Görseller | Kenney izometrik paketleri | Ücretsiz; lisans Faz 0'da doğrulanıp `ASSETS.md`'ye yazılacak |

Sürüm numaralarını bilerek yazmadım: ajan her paketi kurarken güncel kararlı sürümü ve belgesini kontrol etsin.

**GitHub API kısıtları**

- GraphQL kotası kullanıcı başına saatte 5.000 puandır ([GitHub belgesi](https://docs.github.com/en/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api)). MVP tek bir sunucu belirteci kullandığı için bu kota tüm ziyaretçilerle paylaşılır.
- Bu yüzden: 24 saatlik önbellek, aynı kullanıcı adı için eşzamanlı isteklerin tekleştirilmesi, kalan puan 500'ün altına inince yeni çekimlerin kuyruğa alınması.
- Katkı özeti sorgusunun tek seferde en fazla bir yıllık aralık kabul ettiğini hatırlıyorum; ajan bunu belgeden doğrulasın. Doğruysa 8 yıllık hesap 8 sorgu demektir.
- Belirteç yalnızca Worker gizli değişkeninde durur; tarayıcıya ve depoya asla girmez.

**Veri modeli (D1)**

- `users(login, github_id, created_at, fetched_at)`
- `events(login, date, kind, repo, amount)`; `kind`: commit, pr\_merged, star, issue\_closed, review, release, repo\_created
- `repos(login, name, language, topics, stars, archived, created_at, pushed_at)`
- `fetch_log(login, started_at, duration_ms, points_used, status)`

## 5. Repo yapısı ve çalışma düzeni

Tek depo, pnpm workspace ile dört paket. Motorun ayrı paket olması zorunlu: hem tarayıcı hem Worker onu içe aktarır.

```text
hisar/
├── apps/
│   ├── web/            # React + Vite + PixiJS arayüzü
│   └── api/            # Cloudflare Worker (Hono)
├── packages/
│   ├── engine/         # kural motoru, saf TypeScript
│   │   ├── src/rules.ts        # tüm eşikler
│   │   ├── src/simulate.ts     # olaylar + tarih -> üs durumu
│   │   ├── src/layout.ts       # spiral yerleşim
│   │   └── fixtures/           # örnek olay listeleri
│   └── shared/         # ortak tipler (Event, Repo, EmpireState)
├── infra/              # OpenTofu: Worker, D1, KV, DNS
├── e2e/                # Playwright testleri
├── docs/
│   ├── ARCHITECTURE.md
│   ├── RULES.md        # Bölüm 3'ün güncel hali
│   ├── DECISIONS.md    # tarihli karar günlüğü
│   └── PLAN.md         # bu dokümanın kopyası
├── ASSETS.md           # her görselin kaynağı ve lisansı
├── CLAUDE.md           # ajan için kalıcı kurallar (Bölüm 14)
└── .github/workflows/  # ci.yml, deploy.yml
```

**Branch:** `main` her zaman yayınlanabilir durumda. Her görev `faz<N>/<kısa-ad>` dalında yapılır ve pull request ile birleşir; doğrudan `main`'e push yok.

**Commit:** Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `chore:`, `infra:`). Bir commit tek bir iş yapar.

**Sürümleme:** Semantic Versioning. Her fazın sonu bir etiket: Faz 1 `v0.1.0`, Faz 2 `v0.2.0`, yayın `v1.0.0`. Her etiket için GitHub Release notu yazılır; bu notlar aynı zamanda kendi üssünde "sürüm" sayılır.

**Pull request kuralı:** CI yeşil olmadan birleşmez. PR açıklamasında üç başlık bulunur: ne değişti, nasıl test edildi, ekran görüntüsü (arayüz değiştiyse).

## 6. Fazlar

Dokuz faz var; her biri ajana tek başına verilebilir ve sonunda çalışan bir şey bırakır. Bir fazın "bitti" kriteri sağlanmadan sonrakine geçilmez.

### Faz 0: Kurulum ve keşif (Hafta 1, 12 saat)

**Hedef:** Boş ama canlı bir iskelet ve iki teknik riskin erken denenmesi.

1. pnpm workspace'i Bölüm 5'teki yapıyla kur; TypeScript strict, ESLint, Prettier, Vitest.
2. `CLAUDE.md`, `docs/PLAN.md`, `docs/DECISIONS.md`, `ASSETS.md` dosyalarını oluştur.
3. `ci.yml`: her PR'da lint, tip kontrolü, test, build.
4. Deneme A: GitHub GraphQL ile `<kendi kullanıcı adın>` hesabının repolarını ve bir yıllık katkı özetini çeken tek dosyalık betik. Harcanan puanı yazdır.
5. Deneme B: PixiJS ile 32×32 izometrik zemin, üzerinde 5 bina, fareyle kaydırma ve yakınlaştırma.
6. Kenney izometrik paketlerinin lisansını kaynak sayfasından doğrula, `ASSETS.md`'ye yaz.
7. Ürün adı için 5 aday çıkar; alan adı, GitHub ve npm'de boş mu kontrol et. Kararı Doğu verir.
8. Boş Worker'ı ve boş web sayfasını Cloudflare'e yayınla.

**Bitti kriteri:** CI yeşil; yayındaki adres "merhaba" dönüyor; iki deneme `spikes/` klasöründe çalışıyor; `DECISIONS.md`'de katkı sorgusunun yıl sınırı ve ölçülen puan maliyeti yazılı.

**Öğreneceğin:** GraphQL sorgu maliyeti, izometrik koordinat dönüşümü, monorepo düzeni. Kaynak: GitHub GraphQL belgeleri, PixiJS belgeleri, Red Blob Games'in ızgara yazıları.

### Faz 1: Veri katmanı (Hafta 2, 12 saat)

**Hedef:** Kullanıcı adından temiz bir olay listesi üreten ve önbellekleyen API.

1. `packages/shared` içinde `Event`, `Repo`, `UserTimeline` tiplerini tanımla.
2. `apps/api/src/github/` altında sorguları yaz: profil, repolar (sayfalamalı), yıl yıl katkı özeti, sürümler, başkalarının repolarına birleşen PR'lar.
3. Ham yanıtı olay listesine çeviren `normalize.ts`. Çözünürlük: ay. Repo başına aylık commit sayısı alınamıyorsa yıllık toplamı aylara günlük takvimle orantılı dağıt ve bunu `DECISIONS.md`'ye yaz.
4. D1 şemasını (Bölüm 4) migration olarak yaz.
5. `GET /api/empire/:login`: önbellek kontrolü, çekim, yazma, dönüş. 404 (kullanıcı yok), 429 (kota), 502 (GitHub hatası) durumlarını ayrı ayrı döndür.
6. Aynı kullanıcı adı için eşzamanlı istekleri tekleştir.
7. Her çekimi `fetch_log`'a yaz.
8. Gerçek GraphQL yanıtlarını `fixtures/` altına kaydet (3 hesap: küçük, orta, 500+ repolu). Testler bunları kullanır; testler ağa çıkmaz.

**Bitti kriteri:** Üç örnek hesap için uç nokta 200 dönüyor; ikinci istek 100 ms altında önbellekten geliyor; orta boy hesap 50 puanın altında çekiliyor; `normalize` testleri geçiyor. Etiket `v0.1.0`.

**Öğreneceğin:** Sayfalama, kota yönetimi, önbellek geçersizleştirme, D1 migration.

### Faz 2: Kural motoru (Hafta 3, 12 saat)

**Hedef:** Olay listesi ve tarih alıp üs durumunu döndüren saf fonksiyon.

1. `rules.ts`: Bölüm 3'teki tüm eşikler tek nesnede.
2. `simulate(timeline, date): EmpireState`. Durum: kaynaklar, çağ, çağ atlama tarihleri, binalar (tür, seviye, süs, harabe), nüfus, yollar, teknolojiler, skor.
3. `layout.ts`: spiral yerleşim; tohum kullanıcı adı hash'i.
4. `history(timeline): EmpireState[]`: her ay için durum; zaman tüneli ve grafik bunu kullanır.
5. Bina türü eşlemesi için dil ve `topics` tablosu.
6. Testler: Bölüm 8'deki motor testlerinin tamamı.

**Bitti kriteri:** Motorun satır kapsamı %90 üstü; aynı girdiyle 100 çalıştırma aynı çıktıyı veriyor; 8 yıllık hesap için `history` 50 ms altında. Etiket `v0.2.0`.

**Öğreneceğin:** Saf fonksiyonlarla durum modelleme, özellik tabanlı test, deterministik rastgelelik.

### Faz 3: Harita (Hafta 4–5, 26 saat)

**Hedef:** `/u/:login` adresinde gezilebilir, canlı görünen üs.

1. Yönlendirme: ana sayfa (kullanıcı adı kutusu) ve `/u/:login`.
2. Yükleme, hata ve "kullanıcı bulunamadı" ekranları.
3. PixiJS sahnesi: zemin, derinliğe göre sıralı binalar, kaydırma, yakınlaştırma, dokunmatik hareketler.
4. Bina görselleri: 5 tür × 5 seviye × 4 çağ yerine, tür başına 3 görsel ve çağa göre renk paleti ile başla.
5. Süsler, harabeler, anıtlar, ticaret yolları.
6. Köylüler: binalar arasında rastgele yürüyen basit birimler (tohumlu).
7. Binaya tıklayınca repo kartı; üzerine gelince ad etiketi.
8. Üst çubuk: dört kaynak, çağ, nüfus, skor.
9. Açık/koyu tema, Türkçe/İngilizce.
10. Klavyeyle gezilebilen bina listesi (ekran okuyucu için haritanın metin karşılığı).

**Bitti kriteri:** Üç örnek hesap doğru çiziliyor; orta sınıf dizüstünde 60 kare/saniye, telefonda 30; ilk anlamlı çizim 3 saniyenin altında; görsel regresyon testleri geçiyor. Etiket `v0.3.0`.

**Öğreneceğin:** WebGL sahne grafiği, derinlik sıralama, sprite atlas, kare bütçesi.

### Faz 4: Zaman tüneli (Hafta 6, 14 saat)

**Hedef:** Ürünü rakiplerden ayıran özellik.

1. Alt çubukta ay ay ilerleyen kaydırıcı; oynat, duraklat, 1x/4x/16x.
2. Ay değişince yeni binalar "inşa edilir", seviye atlayanlar büyür (kısa animasyon).
3. Çağ atlama anı: tam ekran kısa geçiş ve tarih yazısı.
4. Maç sonu ekranı: yıllara göre dört kaynağın çizgi grafiği, çağ atlama işaretleri, özet istatistikler.
5. Adres çubuğunda tarih: `/u/:login?t=2024-06`.
6. "Hareketi azalt" tarayıcı tercihine uy.

**Bitti kriteri:** 8 yıllık hesap 16x hızda takılmadan oynuyor; tarihli adres aynı görüntüyü açıyor; grafik değerleri motor çıktısıyla birebir aynı. Etiket `v0.4.0`.

### Faz 5: Paylaşım (Hafta 7, 12 saat)

**Hedef:** Her kullanıcının ürünü başkasına gösterme yolu.

1. `GET /u/:login/card.svg`: 800×400 SVG; üssün sade bir izometrik görünümü, çağ, dört kaynak, skor. Worker içinde motorla üretilir, 6 saat önbelleklenir.
2. Kartı README'ye ekleme kodunu gösteren "profiline ekle" penceresi.
3. Haritayı PNG olarak indir.
4. Open Graph etiketleri; önizleme görseli olarak kartın PNG hali. Worker'da SVG'den PNG üretmek zor çıkarsa sabit bir tanıtım görseline düş.
5. "Verimi sil" uç noktası: kullanıcı adı için önbelleği ve kayıtları temizler.

**Bitti kriteri:** Kart GitHub README'sinde doğru görünüyor; bağlantı paylaşıldığında önizleme çıkıyor; kart yanıtı önbellekten 50 ms altında. Etiket `v0.5.0`.

### Faz 6: Altyapı ve dayanıklılık (Hafta 8, 12 saat)

**Hedef:** Sistemi tek komutla yeniden kurulabilir ve yük altında öngörülebilir yapmak. Mülakat hikayenin altyapı kısmı burada yazılır.

1. `infra/`: Worker, D1, KV, DNS ve gizli değişkenler OpenTofu ile tanımlı. Elle oluşturulmuş kaynak kalmaz.
2. `staging` ve `production` ortamları; aynı modül, farklı değişkenler.
3. `deploy.yml`: `main`'e birleşince staging'e, etiket atılınca production'a yayın.
4. IP başına istek sınırı ve kota koruması (kalan puan 500 altındaysa yeni çekim yok, eski önbellek döner).
5. Bölüm 10'daki metrikler ve `/status` sayfası.
6. k6 ile yük testi: önbellekli uçta saniyede 50 istek, 5 dakika.
7. Felaket tatbikatı: staging'i tamamen sil, `tofu apply` ile geri kur, süreyi ölç ve README'ye yaz.

**Bitti kriteri:** Staging sıfırdan 10 dakikanın altında kuruluyor; yük testinde p95 200 ms altı, hata oranı %1 altı; kota bittiğinde site çökmek yerine eski veriyi gösteriyor. Etiket `v0.6.0`.

**Öğreneceğin:** IaC durumu (state), ortam ayrımı, kademeli bozulma, yük testi okuma. Kaynak: OpenTofu ve Cloudflare provider belgeleri, k6 belgeleri.

### Faz 7: Cila ve dokümantasyon (Hafta 9, 12 saat)

1. Ana sayfa: tek cümle, kullanıcı adı kutusu, üç örnek üs, 20 saniyelik demo.
2. Boş hesap, tek repolu hesap, 500+ repolu hesap için uç durumlar.
3. Erişilebilirlik taraması (kontrast, klavye, odak sırası).
4. Paket boyutu bütçesi: ilk yük 300 KB (sıkıştırılmış) altı.
5. Bölüm 11'deki tüm belgeler.
6. Beş kişiye denet, takıldıkları yerleri not al, en önemli üçünü düzelt.

**Bitti kriteri:** Lighthouse performans ve erişilebilirlik 90 üstü; README tamam; beş kişilik deneme notları `docs/` altında.

### Faz 8: Yayın (Hafta 10, 8 saat)

1. `v1.0.0` etiketi ve sürüm notu.
2. Kendi GitHub profiline kartı ekle.
3. Duyurular: Show HN, r/webdev, dev.to yazısı, LinkedIn, X.
4. İlk 72 saat `/status` sayfasını izle; kota ve hata oranını not et.
5. Bölüm 12'deki CV maddelerini gerçek sayılarla doldur.

**Bitti kriteri:** Site herkese açık; en az 3 kanalda duyuru yapılmış; yayın sonrası kısa bir değerlendirme `docs/LAUNCH.md`'de.

## 7. Haftalık takvim

Toplam 120 saat, 10 hafta. Haftalık süren farklıysa saat sütununu toplayıp kendi hızına böl.

| Hafta | Faz | Saat | Hafta sonunda elinde olan |
| --- | --- | --- | --- |
| 1 | 0 Kurulum | 12 | Canlı boş site, iki çalışan deneme, isim adayları |
| 2 | 1 Veri | 12 | Kullanıcı adından olay listesi dönen API |
| 3 | 2 Motor | 12 | Test edilmiş kural motoru |
| 4 | 3 Harita | 13 | Durağan harita: zemin, binalar, kaydırma |
| 5 | 3 Harita | 13 | Köylüler, repo kartı, tema, dil |
| 6 | 4 Zaman | 14 | Zaman tüneli ve maç sonu ekranı |
| 7 | 5 Paylaşım | 12 | README kartı ve paylaşım bağlantısı |
| 8 | 6 Altyapı | 12 | OpenTofu, staging, yük testi, `/status` |
| 9 | 7 Cila | 12 | Ana sayfa, belgeler, beş kişilik deneme |
| 10 | 8 Yayın | 8 | `v1.0.0` ve duyurular |

**Haftalık rutin:** Haftanın ilk oturumunda fazı ajana ver. Son oturumunda ajanın yazdığı her PR'ı kendin oku ve `DECISIONS.md`'ye o haftanın üç kararını kendi cümlelerinle yaz. Mülakatta anlatacağın şey o notlardır.

**Kontrol noktası:** Hafta 5 sonunda harita çalışmıyorsa Bölüm 13'teki daraltma sırasını uygula; süreyi uzatma.

## 8. Test stratejisi

Testlerin ağırlığı motordadır, çünkü ürünün doğruluğu orada belirlenir ve saf fonksiyon olduğu için test etmesi ucuzdur.

**Motor (Vitest, birim ve özellik tabanlı)**

- Her eşik için sınır testi: 99 commit II. Çağ değil, 100 commit ve 3 repo II. Çağ.
- Determinizm: aynı girdi 100 kez aynı çıktı.
- Monotonluk: olay eklemek çağı, skoru veya bina seviyesini asla düşürmez (fast-check ile rastgele girdiler).
- Zaman tutarlılığı: `simulate(t1)` binaları, `t1 < t2` için `simulate(t2)` binalarının alt kümesidir ve konumları değişmez.
- Yerleşim: iki bina aynı karoya düşmez; 60 bina sınırı aşılmaz.
- Anlık görüntü testleri: üç örnek hesabın son durumu dosyada saklı; kurallar değişince fark bilinçli onaylanır.

**Veri katmanı (Vitest, entegrasyon)**

- `normalize`: kaydedilmiş GraphQL yanıtlarından beklenen olay listesi.
- Uç nokta: önbellek isabeti, önbellek kaçırma, 404, kota bitti, GitHub 5xx. GitHub çağrıları sahtelenir.
- Eşzamanlı 10 istek tek bir GitHub çekimi üretir.

**Arayüz (Playwright, uçtan uca ve görsel)**

- Akış: ana sayfa, kullanıcı adı gir, harita görünür, binaya tıkla, kart açılır.
- Zaman tüneli: kaydırıcı başa alınınca bina sayısı azalır; adres çubuğundaki tarih güncellenir.
- Görsel regresyon: üç örnek hesap için ekran görüntüsü karşılaştırması. Köylü animasyonu testte dondurulur.
- Hata ekranları: olmayan kullanıcı, API kapalı.

**Performans ve yük**

- Motor kıyaslaması: 8 yıllık `history` 50 ms altında; CI'da %20'den fazla yavaşlama uyarı verir.
- k6: önbellekli uçta saniyede 50 istek, 5 dakika, p95 200 ms altı.
- Paket boyutu: ilk yük 300 KB altı; aşarsa CI kırılır.

**Kural:** Testler gerçek GitHub API'sine asla çıkmaz. Ajan bir testi geçirmek için testi silemez veya beklentiyi gevşetemez; gerekirse durup sorar.

## 9. CI/CD ve yayın

Her değişiklik otomatik test edilir, `main` otomatik olarak staging'e, etiketler production'a gider.

**`ci.yml` (her pull request)**

1. Kurulum ve önbellek (pnpm).
2. Lint ve tip kontrolü.
3. Birim ve entegrasyon testleri, kapsam raporu.
4. Build ve paket boyutu kontrolü.
5. Playwright testleri (build çıktısına karşı).
6. `tofu fmt -check`, `tofu validate`, `tofu plan` (çıktı PR yorumuna yazılır).

**`deploy.yml`**

- `main`'e birleşme: D1 migration, Worker ve web yayını staging'e; ardından staging'e duman testi.
- `v*` etiketi: aynı adımlar production'a; ardından GitHub Release oluşturulur.
- Duman testi başarısızsa önceki Worker sürümüne geri dönülür.

**Gizli değişkenler:** `GITHUB_TOKEN_SERVER` (yalnızca herkese açık veri okuma yetkili), `CLOUDFLARE_API_TOKEN`. İkisi de GitHub Actions secrets ve Worker secrets içinde durur; depoda ve OpenTofu durum dosyasında düz metin olarak bulunmaz.

**Ortamlar**

| Ortam | Adres | Veri |
| --- | --- | --- |
| Yerel | `localhost` | Kaydedilmiş örnek yanıtlar; GitHub'a çıkmaz |
| Staging | `staging.<alan-adı>` | Ayrı D1 ve KV, gerçek GitHub |
| Production | `<alan-adı>` | Ayrı D1 ve KV, gerçek GitHub |

**Maliyet:** Hedef aylık 0 TL. Tek zorunlu harcama alan adı; öğrenci paketinden ücretsiz alan adı çıkıyorsa onu kullan. Cloudflare ücretsiz katman sınırlarını Faz 0'da ajan güncel belgeden okuyup `DECISIONS.md`'ye yazsın.

**Demo ortamı:** Production'ın kendisi. Ana sayfadaki üç örnek üs her zaman önbellekte tutulur; GitHub kotası bitse bile demo çalışır.

## 10. Gözlemlenebilirlik

Tek bir soruya her an cevap verebilmelisin: "Şu an GitHub kotam ne durumda ve kullanıcılar hata görüyor mu?"

**Metrikler**

| Metrik | Neden | Alarm eşiği |
| --- | --- | --- |
| Kalan GitHub puanı | Kota biterse yeni üs üretilemez | 500 altı |
| Önbellek isabet oranı | Kota tüketimini belirler | %70 altı |
| İstek süresi p50 / p95 (uç nokta bazında) | Kullanıcı deneyimi | p95 500 ms üstü |
| Hata oranı (4xx ve 5xx ayrı) | Bozulmayı erken görmek | 5xx %1 üstü |
| Yeni üs sayısı (saatlik) | Büyüme ve kötüye kullanım | Bir saatte 300 üstü |
| Çekim süresi ve harcanan puan (hesap başına) | Pahalı hesapları bulmak | 100 puan üstü |
| Kart isteği sayısı | README'lerde yayılma göstergesi | Yok |

**Loglar:** Her istek tek satır JSON: `ts, route, login_hash, status, duration_ms, cache, points_used, request_id`. Kullanıcı adı açık yazılmaz, hash'lenir. IP adresi saklanmaz.

**Panel:** `/status` sayfası son 24 saatin yukarıdaki metriklerini gösterir. Veri kaynağı Workers Analytics Engine; ücretsiz katmanda yoksa `fetch_log` tablosundan saatlik özet. Sen Prometheus ve Grafana bildiğin için, istersen v1.1'de metrikleri Grafana Cloud'un ücretsiz katmanına da gönderebilirsin; MVP için gerekli değil.

**Hizmet seviyesi hedefi:** Önbellekli isteklerde aylık %99,5 başarı ve p95 200 ms. README'de yazılı olsun; mülakatta "SLO'n neydi, nasıl ölçtün" sorusunun cevabı budur.

## 11. Dokümantasyon

README'yi açan kişi 30 saniyede ne olduğunu görmeli, 2 dakikada kendi üssünü açabilmeli.

**README sırası**

1. Tek cümlelik tanım ve canlı bağlantı.
2. 15–20 saniyelik GIF: kullanıcı adı girilir, üs çizilir, zaman tüneli oynar, çağ atlanır.
3. "Kendi profiline ekle": kopyalanabilir tek satır.
4. Nasıl çalışır: kaynak ve çağ tabloları (kısa hali), `docs/RULES.md` bağlantısı.
5. Mimari diyagramı ve iki paragraf açıklama.
6. Sayılar: test kapsamı, p95, sıfırdan kurulum süresi, paket boyutu.
7. Yerelde çalıştırma: üç komut.
8. Yol haritası ve katkı rehberi.
9. Lisans ve görsel kaynakları (`ASSETS.md`).

**Diğer belgeler**

- `docs/ARCHITECTURE.md`: bileşen diyagramı (Mermaid), veri akışı, veri modeli.
- `docs/RULES.md`: oyun kurallarının tamamı; `rules.ts` ile aynı PR'da güncellenir.
- `docs/DECISIONS.md`: tarih, karar, alternatifler, neden. Her faz en az üç kayıt.
- `docs/RUNBOOK.md`: kota bitti, GitHub kapalı, yanlış yayın geri alma; her biri için beş adım.
- `CONTRIBUTING.md` ve `CODE_OF_CONDUCT.md`.

**Örnek çıktılar:** `docs/gallery/` altında üç farklı profil tipinin üs görüntüsü (yeni başlayan, düzenli katkıcı, yıldızlı proje sahibi). Başkasının hesabını örnek göstermeden önce izin al ya da kendi hesabını ve uydurma örnek verileri kullan.

**Demo videosu:** 60 saniye, sesli anlatımsız, altyazılı. Akış: problem cümlesi, üs, zaman tüneli, README kartı, `/status` sayfası.

## 12. Staja ve işe dönüştürme

Bu proje önce bir ürün, sonra bir altyapı hikayesidir. Hedefin Cloud/DevOps ve SRE olduğu için mülakatta haritayı değil, onu nasıl işlettiğini anlatacaksın.

**CV maddeleri (köşeli parantezleri yayından sonra gerçek sayılarla doldur)**

- GitHub geçmişini zamanda ilerleyen bir strateji oyunu üssüne çeviren açık kaynak web uygulamasını tasarlayıp yayınladım; ilk ay \[N\] üs üretildi, \[M\] README'ye gömüldü.
- Saatlik 5.000 puanlık GitHub API kotasını önbellek, istek tekleştirme ve kademeli bozulma ile yönettim; önbellek isabet oranı %\[X\], p95 yanıt süresi \[Y\] ms.
- Tüm altyapıyı OpenTofu ile tanımladım ve GitHub Actions ile iki ortama otomatik yayınladım; ortam sıfırdan \[Z\] dakikada kuruluyor, aylık maliyet 0.

**LinkedIn ve blog**

- Yayın günü: 20 saniyelik zaman tüneli videosu ve kendi üssün. İlk cümle sonuç olsun, teknoloji listesi değil.
- Bir hafta sonra teknik yazı: "Saatte 5.000 puanla kaç kullanıcıya hizmet verilir?" Kota hesabını, önbellek stratejisini ve gerçek sayıları anlat.
- İkinci yazı (isteğe bağlı): deterministik motorun özellik tabanlı testlerle nasıl doğrulandığı.

**Mülakat hikayesi (2 dakika)**

1. Durum: GitHub profil görselleştiricileri çok ama hepsi bugünün fotoğrafını gösteriyor.
2. Karar: tek fark olarak zamanı seçtim; bu yüzden motoru saf ve deterministik yazdım.
3. Zorluk: tek belirteçle saatte 5.000 puan. Yayın günü trafiği bunu dakikalar içinde bitirebilirdi.
4. Çözüm: 24 saatlik önbellek, tekleştirme, kota azalınca eski veriyi sunma, her şeyi ölçme.
5. Sonuç: gerçek sayılar ve bir sonraki adım (kullanıcının kendi kotasıyla giriş).

**Muhtemel sorular**

- Kota bittiğinde kullanıcı ne görüyor? Bunu nasıl test ettin?
- Önbellek süresini neden 24 saat seçtin? Daha kısa veya uzun olsa ne değişirdi?
- Aynı anda 100 kişi aynı kullanıcı adını isterse ne olur?
- Motoru neden sunucuda değil tarayıcıda çalıştırıyorsun? Kart için neden sunucuda da çalışıyor?
- Kuralları değiştirirsen eski üsler ne olur?
- OpenTofu durum dosyasını nerede tutuyorsun, kilitlenme nasıl çalışıyor?
- Yanlış bir yayını nasıl geri alırsın?
- 10 kat trafik gelse ilk ne kırılır?
- Kodun ne kadarını yapay zeka yazdı, sen neyi kontrol ettin?

Son soruya dürüst cevap ver: kodu ajan yazdı, mimari kararları ve her PR'ın incelemesini sen yaptın, kanıtı `DECISIONS.md`.

## 13. Riskler ve B planları

En büyük risk teknik değil: kalabalık bir alanda fark edilmemek. Teknik risklerin hepsinin bir daraltma yolu var.

| Risk | Olasılık | Önlem veya B planı |
| --- | --- | --- |
| Rakiplerden ayrışamamak | Yüksek | Zaman tünelini ilk sıraya koy; tanıtımda yalnızca onu göster. Yayından önce rakiplere tekrar bak |
| Görsellerin amatör durması | Yüksek | Tek bir hazır paket ve tek palet kullan; kendi çizimine girme. Az çeşit, tutarlı görünüm |
| Kapsamın oyuna dönüşmesi | Yüksek | Bölüm 2'deki "yok" listesi bağlayıcı. Yeni fikirler `docs/IDEAS.md`'ye yazılır, MVP'ye girmez |
| GitHub kotasının yayın günü bitmesi | Orta | Önbellek, kuyruk, eski veriyi sunma. B planı: v1.1'deki GitHub girişini öne çek |
| Katkı verisinin beklenen çözünürlükte gelmemesi | Orta | Aylık yerine çeyreklik adım; zaman tüneli yine çalışır |
| Büyük hesaplarda yavaşlık | Orta | 60 bina sınırı, sayfalama üst limiti, 10 saniyelik çekim zaman aşımı |
| Worker'da PNG üretememek | Orta | Sabit tanıtım görseli; PNG yalnızca tarayıcıda indirilir |
| Ücretsiz katman sınırlarının aşılması | Düşük | `/status` üzerinden izle; aşılırsa kart önbellek süresini 24 saate çıkar |
| Marka sorunu | Düşük | Age of Empires adı, terimleri ve görselleri kullanılmaz; ürün adı özgün |
| Ajanın yazdığı kodu anlamamak | Orta | Haftalık PR okuma rutini ve karar günlüğü; anlamadığın PR birleşmez |

**Süre yetmezse daraltma sırası (üstten başla)**

1. Köylüler ve ticaret yolları.
2. Teknoloji ağacı ve anıtlar.
3. PNG indirme ve Open Graph görseli.
4. İngilizce arayüz dışındaki dil ve açık tema.
5. Staging ortamı (OpenTofu kalır, tek ortam olur).

**Asla kesilmeyecekler:** zaman tüneli, çağ sistemi, README kartı, motor testleri, OpenTofu.

## 14. Ajana nasıl verilir

Ajana her seferinde tek bir faz ver; tüm planı verip "yap" deme. Önce aşağıdaki kuralları `CLAUDE.md`'ye, bu dokümanı `docs/PLAN.md`'ye koy.

**`CLAUDE.md` içeriği**

```markdown
# Hisar: ajan kuralları

- Plan docs/PLAN.md dosyasındadır. Yalnızca sana verilen fazı uygula; sonraki fazlara geçme.
- Bölüm 2'deki "MVP'de yok" listesindeki hiçbir şeyi ekleme.
- Her görev ayrı dal ve ayrı pull request. Doğrudan main'e push yok.
- Commit mesajları Conventional Commits biçiminde.
- Bir paketi kurmadan önce güncel kararlı sürümünü ve resmî belgesini kontrol et; ezberden API yazma.
- packages/engine saf kalır: ağ, dosya, tarih (Date.now) ve Math.random kullanılmaz.
- Testler gerçek GitHub API'sine çıkmaz; fixtures kullanır.
- Bir testi geçirmek için testi silme, atlama veya beklentiyi gevşetme. Takılırsan dur ve sor.
- Gizli değerleri koda, loga veya depoya yazma.
- Age of Empires adını, terimlerini ve görsellerini kullanma.
- Kullanılan her görselin kaynağını ve lisansını ASSETS.md'ye ekle.
- Önemli her teknik kararı docs/DECISIONS.md'ye tarihle yaz: karar, alternatifler, neden.
- Planla çelişen bir şey bulursan uygulamadan önce bildir.
```

**Faz başlatma şablonu**

```text
docs/PLAN.md dosyasını ve CLAUDE.md'yi oku.
Şimdi yalnızca "Faz <N>: <ad>" bölümünü uygulayacaksın.

1. Önce bu fazın görevlerini alt adımlara bölen bir uygulama planı yaz ve onayımı bekle.
2. Onaydan sonra görevleri sırayla, her biri ayrı PR olacak şekilde yap.
3. Her PR'da: ne değişti, nasıl test edildi, varsa ekran görüntüsü.
4. Fazın "Bitti kriteri"ndeki her maddeyi tek tek doğrula ve kanıtıyla raporla
   (komut çıktısı, ölçüm, bağlantı).
5. Kriterlerden biri sağlanmıyorsa "bitti" deme; neyin eksik olduğunu yaz.
6. Sonunda docs/DECISIONS.md'ye bu fazda alınan kararları ekle.
```

**Faz bitiş kontrolü (ayrı ve temiz bir oturumda)**

```text
docs/PLAN.md içindeki "Faz <N>" bölümünü oku. Depoyu incele ve "Bitti kriteri"ndeki
her maddeyi bağımsız olarak doğrula. Testleri kendin çalıştır. Sağlanmayan veya
şüpheli her maddeyi, dosya ve satır göstererek listele. Kod değiştirme.
```

Kontrolü ayrı oturumda yaptırmanın nedeni: işi yapan oturum kendi işini onaylamaya yatkındır.

**Senin her faz sonunda yapacakların**

- [ ] Yayındaki staging adresini açıp özelliği elle dene.
- [ ] O fazın PR'larını oku; anlamadığın yeri ajana açıklat.
- [ ] `DECISIONS.md`'ye kendi cümlelerinle üç karar yaz.
- [ ] Sürüm etiketini at ve sürüm notunu yaz.
- [ ] Takvimin gerisindeysen Bölüm 13'teki daraltma sırasına bak.

## Kaynaklar

- [GitKingdom tanıtım yazısı](https://dev.to/rgourley/i-built-gitkingdom-where-github-becomes-a-fantasy-kingdom-27lb)
- [Git City deposu](https://github.com/srizzon/git-city)
- [Repolis (Product Hunt)](https://www.producthunt.com/p/repolis/repolis)
- [GitHub GraphQL API kota belgesi](https://docs.github.com/en/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api)
