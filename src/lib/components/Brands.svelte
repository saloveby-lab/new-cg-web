<script>
  const row1 = [
    { code: 'EV', name: 'Evolution', type: 'Live Casino', color: 'red' },
    { code: 'PG', name: 'Pragmatic Play', type: 'Game Provider', color: 'blue' },
    { code: 'NE', name: 'NetEnt', type: 'Game Studio', color: 'green' },
    { code: 'MG', name: 'Microgaming', type: 'Game Provider', color: 'purple' },
    { code: 'PG', name: "Play'n GO", type: 'Game Studio', color: 'orange' },
    { code: 'YG', name: 'Yggdrasil', type: 'Game Provider', color: 'teal' },
    { code: 'BS', name: 'Betsoft', type: '3D Games', color: 'amber' },
    { code: 'RT', name: 'Red Tiger', type: 'Game Studio', color: 'rose' },
    { code: 'EZ', name: 'Ezugi', type: 'Live Casino', color: 'cyan' },
    { code: 'HB', name: 'Habanero', type: 'Game Provider', color: 'yellow' },
    { code: 'QS', name: 'Quickspin', type: 'Game Studio', color: 'indigo' },
    { code: 'SL', name: 'Stakelogic', type: 'Live & Slots', color: 'sky' }
  ];

  const row2 = [
    { code: 'BR', name: 'Betradar', type: 'Sportsbook', color: 'lime' },
    { code: 'EK', name: 'ELK Studios', type: 'Game Studio', color: 'pink' },
    { code: 'PS', name: 'Playson', type: 'Game Provider', color: 'violet' },
    { code: 'AM', name: 'Amatic', type: 'Game Provider', color: 'fuchsia' },
    { code: 'EG', name: 'EGT Interactive', type: 'Game Provider', color: 'emerald' },
    { code: 'TK', name: 'Thunderkick', type: 'Game Studio', color: 'stone' },
    { code: 'WZ', name: 'Wazdan', type: 'Game Provider', color: 'zinc' },
    { code: 'BG', name: 'BetGames', type: 'Live Games', color: 'amber' },
    { code: 'SP', name: 'Spinomenal', type: 'Game Provider', color: 'cyan' }
  ];

  function colorClass(c) {
    return `from-${c}-500/20 to-${c}-900/20 border-${c}-500/10 text-${c}-400`;
  }
</script>

<section id="brands" class="py-24 lg:py-32 px-6 lg:px-14 overflow-hidden">
  <div class="max-w-[1400px] mx-auto mb-12">
    <div class="flex items-center gap-3 text-[11px] font-bold text-gold uppercase tracking-[0.15em] mb-3 reveal">
      <span class="w-6 h-px bg-gold"></span>Trusted By The Best
    </div>
    <h2 class="font-display font-extrabold text-[clamp(2rem,3.5vw,3rem)] tracking-tight mb-4 reveal">
      Brand <span class="text-gold">Partners & Clients</span>
    </h2>
    <p class="text-txt-muted text-lg max-w-2xl leading-relaxed reveal">
      Powering the world's leading online casino brands and game studios.
    </p>
  </div>

  <!-- Row 1 -->
  <div class="overflow-hidden mb-3">
    <div class="flex gap-4 animate-marquee marquee-track" style="width:max-content">
      {#each [...row1, ...row1] as brand}
        <div class="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-card border border-card-border hover:border-gold/20 transition-all">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br {colorClass(brand.color)} border flex items-center justify-center font-display font-black text-xs">
            {brand.code}
          </div>
          <div>
            <div class="font-semibold text-sm">{brand.name}</div>
            <div class="text-[10px] text-txt-muted">{brand.type}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Row 2 (reverse) -->
  <div class="overflow-hidden">
    <div class="flex gap-4 animate-marquee-rev marquee-track" style="width:max-content">
      {#each [...row2, ...row2] as brand}
        <div class="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-card border border-card-border hover:border-gold/20 transition-all">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br {colorClass(brand.color)} border flex items-center justify-center font-display font-black text-xs">
            {brand.code}
          </div>
          <div>
            <div class="font-semibold text-sm">{brand.name}</div>
            <div class="text-[10px] text-txt-muted">{brand.type}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
