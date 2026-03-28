<script>
  const licenses = [
    { flag: '🇲🇹', title: 'Malta Gaming Authority', desc: 'B2B and B2C licenses covering casino and sportsbook.', badge: 'MGA Licensed', color: 'gold' },
    { flag: '🇬🇧', title: 'UK Gambling Commission', desc: 'Licensed for operations and software in the UK market.', badge: 'UKGC Licensed', color: 'gold' },
    { flag: '🇮🇲', title: 'Isle of Man GSC', desc: 'OGRA license for B2C and B2B global solutions.', badge: 'IoM Licensed', color: 'gold' },
    { flag: '🇨🇼', title: 'Curaçao GCB', desc: 'Licensed by the Gaming Control Board for global operations.', badge: 'GCB Licensed', color: 'gold' },
    { flag: '🇧🇪', title: 'Belgian Gaming Commission', desc: 'E-Class licensed for EU market operations.', badge: 'Belgium', color: 'gold' },
    { flag: '🛡️', title: 'ISO 27001 Certified', desc: 'Fully compliant information security management standards.', badge: 'ISO Certified', color: 'cyan' },
    { flag: '🇮🇹', title: 'Italian B2B Certificate', desc: 'Authorized to offer full range of services in Italy.', badge: 'Italy', color: 'gold' },
    { flag: '🔐', title: 'GLI / eCOGRA Tested', desc: 'Independently tested and certified for fairness.', badge: 'RNG Certified', color: 'green' }
  ];
</script>

<section id="licenses" class="py-24 lg:py-32 px-6 lg:px-14 bg-bg-2">
  <div class="max-w-[1400px] mx-auto">
    <div class="flex items-center gap-3 text-[11px] font-bold text-gold uppercase tracking-[0.15em] mb-3 reveal">
      <span class="w-6 h-px bg-gold"></span>Trust & Compliance
    </div>
    <h2 class="font-display font-extrabold text-[clamp(2rem,3.5vw,3rem)] tracking-tight mb-4 reveal">
      Licenses & <span class="text-gold">Certifications</span>
    </h2>
    <p class="text-txt-muted text-lg max-w-2xl leading-relaxed mb-14 reveal">
      Operating under the most rigorous regulatory frameworks worldwide.
    </p>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each licenses as lic, i}
        {@const colorMap = { gold: { bg: 'from-gold/10 to-gold/[0.03]', border: 'border-gold/10', text: 'text-gold', badgeBg: 'bg-gold/[0.08]', badgeBorder: 'border-gold/10' }, cyan: { bg: 'from-cyan/10 to-cyan/[0.03]', border: 'border-cyan/10', text: 'text-cyan', badgeBg: 'bg-cyan/[0.08]', badgeBorder: 'border-cyan/10' }, green: { bg: 'from-green-500/10 to-green-500/[0.03]', border: 'border-green-500/10', text: 'text-green-400', badgeBg: 'bg-green-500/[0.08]', badgeBorder: 'border-green-500/10' } }}
        {@const c = colorMap[lic.color]}
        <div class="group bg-bg rounded-2xl border border-card-border p-7 text-center hover:border-gold/25 hover:-translate-y-1 transition-all duration-400 card-glow reveal" style="transition-delay: {(i % 4) * 0.08}s">
          <div class="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br {c.bg} {c.border} border flex items-center justify-center text-3xl group-hover:animate-glow transition-all">
            {lic.flag}
          </div>
          <h4 class="font-display font-bold text-sm mb-2">{lic.title}</h4>
          <p class="text-xs text-txt-muted leading-relaxed mb-3">{lic.desc}</p>
          <span class="inline-block px-3 py-1 rounded-full {c.badgeBg} {c.badgeBorder} border text-[10px] font-bold {c.text} uppercase tracking-wider">
            {lic.badge}
          </span>
        </div>
      {/each}
    </div>
  </div>
</section>
