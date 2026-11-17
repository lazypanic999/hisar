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
