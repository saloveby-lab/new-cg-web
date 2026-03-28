<script>
  const products = [
    { num: '01', title: 'Baccarat', desc: 'Classic baccarat game with multiple betting options and smooth gameplay experience.', image: '/images/games/baccarat.jpg', tag: null },
    { num: '02', title: 'Dragon Tiger', desc: 'Fast-paced Dragon Tiger game with simple rules and exciting gameplay.', image: '/images/games/dragontiger.jpg', tag: null },
    { num: '03', title: 'Roulette', desc: 'Premium roulette experience with European and American variants.', image: '/images/games/roulette.jpg', tag: null },
    { num: '04', title: 'Sic Bo', desc: 'Traditional Sic Bo dice game with various betting combinations.', image: '/images/games/sicbo.jpg', tag: null },
    { num: '05', title: 'Hi-Lo', desc: 'Engaging Hi-Lo card game with high-low prediction gameplay.', image: '/images/games/hilo.jpg', tag: null },
    { num: '06', title: 'Pok Deng', desc: 'Popular Thai card game Pok Deng with authentic gameplay.', image: '/images/games/pok-deng.jpg', tag: 'ai' }
  ];
</script>

<section id="products" class="py-24 lg:py-32 px-6 lg:px-14 bg-bg-2">
  <div class="max-w-[1400px] mx-auto">
    <div class="flex items-center gap-3 text-[11px] font-bold text-gold uppercase tracking-[0.15em] mb-3 reveal">
      <span class="w-6 h-px bg-gold"></span>iGaming Products
    </div>
    <h2 class="font-display font-extrabold text-[clamp(2rem,3.5vw,3rem)] tracking-tight mb-4 reveal">
      Complete <span class="text-gold">Product Suite</span>
    </h2>
    <p class="text-txt-muted text-lg max-w-2xl leading-relaxed mb-14 reveal">
      A comprehensive ecosystem to power every aspect of your online gaming operations.
    </p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each products as prod, i}
        <div class="group bg-bg rounded-2xl border border-card-border p-6 hover:border-gold/20 hover:-translate-y-1 transition-all duration-400 reveal" style="transition-delay: {(i % 3) * 0.1}s">
          <div class="relative h-36 rounded-xl overflow-hidden mb-5">
            <img src={prod.image} alt={prod.title} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent"></div>
            <span class="absolute bottom-3 left-3 font-mono text-[10px] px-2 py-1 rounded border
              {prod.tag === 'ai' ? 'text-cyan bg-cyan/10 border-cyan/10' : 'text-gold bg-gold/10 border-gold/10'}">
              {prod.num}
            </span>
          </div>
          <h4 class="font-display font-bold text-lg mb-2">{prod.title}</h4>
          <p class="text-sm text-txt-muted leading-relaxed">{prod.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
