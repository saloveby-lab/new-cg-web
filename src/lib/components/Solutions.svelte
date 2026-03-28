<script>
  const solutions = [
    {
      title: 'White Label Casino',
      desc: 'Cost-effective, ready-to-launch casino solution with your brand. Go live within weeks with fully-managed infrastructure, licensing support, and 24/7 operations.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=300&fit=crop&q=80',
      badge: 'Most Popular',
      badgeColor: 'gold'
    },
    {
      title: 'Turnkey Casino',
      desc: 'Full ownership and control. Self-hosted, independently operated platform with complete source code access, dedicated servers, and custom integrations.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=300&fit=crop&q=80',
      badge: null,
      badgeColor: null
    },
    {
      title: 'Self-Service Platform',
      desc: 'Maximum customization with API-driven architecture. Build, configure and deploy at your own pace with our comprehensive developer toolkit.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&h=300&fit=crop&q=80',
      badge: null,
      badgeColor: null
    },
    {
      title: 'Crypto Casino',
      desc: 'Native cryptocurrency support with blockchain transparency, provably fair gaming, and instant payouts. Designed for the crypto-first market.',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=700&h=300&fit=crop&q=80',
      badge: 'Web3 Ready',
      badgeColor: 'cyan'
    }
  ];
</script>

<section id="solutions" class="py-24 lg:py-32 px-6 lg:px-14">
  <div class="max-w-[1400px] mx-auto">
    <div class="flex items-center gap-3 text-[11px] font-bold text-gold uppercase tracking-[0.15em] mb-3 reveal">
      <span class="w-6 h-px bg-gold"></span>Casino Solutions
    </div>
    <h2 class="font-display font-extrabold text-[clamp(2rem,3.5vw,3rem)] tracking-tight mb-4 reveal">
      Launch Your Casino <span class="text-gold">Your Way</span>
    </h2>
    <p class="text-txt-muted text-lg max-w-2xl leading-relaxed mb-14 reveal">
      Whether you're starting fresh or scaling an existing platform, our modular solutions adapt to your business model.
    </p>

    <div class="grid md:grid-cols-2 gap-5">
      {#each solutions as sol, i}
        <div class="group relative rounded-2xl border border-card-border bg-card overflow-hidden hover:border-gold/20 transition-all duration-500 card-glow reveal" style="transition-delay: {i * 0.1}s">
          <div class="relative h-48 overflow-hidden">
            <img src={sol.image} alt={sol.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent"></div>
            {#if sol.badge}
              <div class="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                {sol.badgeColor === 'cyan' ? 'bg-cyan/10 border border-cyan/20 text-cyan' : 'bg-gold/10 border border-gold/20 text-gold'}">
                {sol.badge}
              </div>
            {/if}
          </div>
          <div class="p-7 pt-2">
            <h3 class="font-display font-bold text-xl mb-2">{sol.title}</h3>
            <p class="text-sm text-txt-muted leading-relaxed mb-4">{sol.desc}</p>
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-gold group-hover:gap-3 transition-all">Learn more →</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
