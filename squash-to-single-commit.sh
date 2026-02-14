#!/bin/bash
# Contributors'dan cursoragent'ı düşürmek için: tüm geçmişi tek commit yap, senin adına.
# Çalıştırdıktan sonra: git push -f origin master

set -e
BRANCH=master

# Mevcut dosyaları koru, geçmişi sil
git checkout --orphan temp_branch
git add -A
git commit -m "Portfolio & CV site"

# Eski master'ı sil, bu branch'i master yap
git branch -D "$BRANCH"
git branch -m "$BRANCH"

echo "Tamam. Şimdi: git push -f origin master"
