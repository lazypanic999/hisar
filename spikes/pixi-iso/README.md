# Deneme B: PixiJS ile izometrik zemin

Faz 0'ın ikinci teknik riskini erken dener: 32×32 izometrik zemin, üzerinde 5 bina, fareyle kaydırma ve imlece göre yakınlaştırma.

## Çalıştırma

Kurulum gerektirmez; PixiJS 8.20.1 CDN'den yüklenir. Tarayıcı ES modüllerini `file://` adresinden yüklemediği için yerel bir sunucu gerekir. Repo kökünden:

```sh
npx serve spikes/pixi-iso
```

Sonra açılan adresi tarayıcıda aç. Sol üstte FPS görünür. Ölçülen FPS (dizüstü ve telefon) buraya yazılacak.

## Notlar

- Izgaradan ekrana dönüşüm 2:1 izometrik: `x = (gx − gy) · W/2`, `y = (gx + gy) · H/2`.
- Derinlik sıralaması için `zIndex = gx + gy` yeterli; binalar tek karoluk olduğu sürece çakışma yok.
- Yakınlaştırmada imlecin altındaki dünya noktası `toLocal` ile alınıp ölçekten sonra `toGlobal` farkı kadar kaydırılıyor.

## Sonraki adım (Faz 3)

Kutular yerine Kenney sprite'ları, sprite atlas ve dokunmatik iki parmak yakınlaştırma.
