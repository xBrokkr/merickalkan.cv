# SOCI4L: An On-chain Reputation Layer for Avalanche

> TASLAK - Product case study. Yayın hedefi: merickalkan.cv'de tek sayfa (veya floyka.space/work).
> [KÖŞELİ PARANTEZLİ] yerler senin dolduracağın/onaylayacağın kısımlar.

---

## The Problem

On Avalanche, a wallet address proves ownership but nothing else. Builders, creators, and community members do real work on-chain and off-chain, yet their reputation lives scattered across explorers, social accounts, and Discord roles. There was no way to answer a simple question: **"who is this wallet, and are they real?"**

## The Bet

Reputation on-chain does not need to start with heavy protocol standards. It can start as a product: turn a wallet's real activity into verifiable reputation through attestations and scoring, and surface it as a public profile anyone can read. Ship it as a consumer-grade experience first, then open it to other teams as a layer they can build on.

Positioning evolution: the product launched with a profile-first message ("turn your Avalanche wallet into a profile that proves you're real") and matured into its current position as **an on-chain reputation layer for Avalanche**. [BU EVRİMİ CASE STUDY'DE ANLATMAK GÜÇLÜ BİR PRODUCT HİKÂYESİ - istersen ayrı bir "Repositioning" bölümü yapalım]

## My Role

Product Lead: product vision, strategy, positioning, and UX architecture. [VARSA: ekip kaç kişi, senin dışında kimler ne yapıyor - 1 cümle]

## What I Designed

The identity system, end to end:

- **Attestations**: verifiable claims about a wallet's activity and contributions, signed and recorded on-chain.
- **Reputation scoring**: score snapshots that make on-chain activity measurable and comparable over time.
- **Profile model**: wallet-native public profiles that surface reputation, on-chain assets, and curated links in one place.
- **Social graph**: follows, mutes, and blocks; the primitives of a real social layer rather than a static page.
- **Showcase modules**: creators curate what represents them instead of an auto-generated dump.
- **Admin and trust surfaces**: moderation, audit logging, and slug protection designed in from day one.

## What Shipped

Three product surfaces:

1. **Web app** (soci4l.net): profile creation, discovery, engagement insights.
2. **Browser extension**: SOCI4L context where users already are (with a Fuji testnet variant for the ecosystem).
3. **Developer SDK**: profiles as a building block for other Avalanche teams.

[EKLE: launch tarihi ve şu anki durum - 1 cümle]

## Validation

- Competed in **Avalanche Build Games**, eliminated before the final round. [EKLE: programın tanımı / kaç takımdan kaça kaldınız - 1 cümle, biliyorsan]
- [EKLE: kullanıcı/profil/waitlist sayısı - anlamlı bir eşiği geçince ekle, erken sayı yazma]
- [EKLE: ekosistemden alıntı/geri bildirim varsa - Hürsel Çay veya başka bir isimden 1 cümle]

## What I Learned

[SENİN SESİNDEN 2-3 madde. Öneri iskeleti:]
- [Ör: Reputation'ı skorla göstermek ile rozet/etiketle göstermek arasındaki tercih ve nedeni]
- [Ör: Extension + SDK'yı erken ship'lemenin maliyeti/getirisi]
- [Ör: On-chain ürünlerde güven yüzeylerini (moderasyon, audit) baştan kurmanın önemi]

---

## Yayın notları (yayınlarken sil)

- Görseller: profil sayfası, skor kartı, extension ekranı; koyu temada 3-4 ekran yeterli.
- CV'ye değil siteye derinlik koyuyoruz: CV'de tek satır (Build Games + 3 surface), detay burada.
- Metrik eklenene kadar "Validation" bölümü Build Games + alıntıyla yayınlanabilir; sayı şart değil.
- Uzun tire kullanma.
