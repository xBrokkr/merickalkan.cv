# Contributors'da sadece sen görünsün

GitHub bazen Contributors listesini güncellemediği için Cursor Agent hâlâ görünebilir. **Kesin çözüm:** Aynı kodu yeni bir repoya taşımak.

## Adımlar

### 1. GitHub'da yeni repo aç
- GitHub → **New repository**
- İsim: **merickalkan-portfolio** (veya merickalkan-cv)
- Public, **README ekleme** (zaten kodda var)
- Create repository

### 2. Bu projeyi yeni repoya pushla
Terminalde (bu klasörde):

```bash
cd /Users/brokkr/Documents/personal/merickalkan-portfolio

# Eski remote'u kaldır (veya isim ver)
git remote rename origin old-origin

# Yeni repo'yu ekle (URL'yi kendi yeni repo adresinle değiştir)
git remote add origin https://github.com/xBrokkr/YENI_REPO_ADI.git

git push -u origin master
```

### 3. GitHub Pages ve domain
- Yeni repo → **Settings → Pages** → Source: **master** branch
- **CNAME** dosyası zaten projede (`merickalkan.cv`) — yeni repoda da aynı kalır
- Domain (merickalkan.cv) DNS’ini yeni repo’nun GitHub Pages’ine yönlendir (gerekirse DNS’te sadece repo adını güncellemen yeterli; GitHub Pages kullanıyorsan genelde aynı kalır)

### 4. Eski repoyu kapat
- Eski **merickalkan-portfolio** repo’sunu **Settings → Danger zone → Archive** veya sil
- Artık tek contributor sen olacaksın (yeni repoda tek commit = tek kişi)

---

**Neden işe yarıyor:** Yeni repoda sadece senin yaptığın tek commit var; Cursor Agent hiç commit yapmadığı için Contributors’da sadece **xBrokkr** görünür.
