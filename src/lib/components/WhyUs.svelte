<script>
  const features = [
    {
      icon: '🧠', title: 'AI-Powered Intelligence',
      desc: 'Our proprietary AI engine analyzes player patterns in real-time, optimizing engagement strategies, preventing fraud, and maximizing lifetime value across your entire player base.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop&q=80',
      tags: ['Real-time ML', 'Fraud Detection', 'Predictive'],
      featured: true, layout: 'text-left'
    },
    {
      icon: '🔒', title: 'Bank-Grade Security',
      desc: 'ISO 27001 certified with end-to-end encryption, real-time threat monitoring, and multi-layer fraud prevention.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&h=200&fit=crop&q=80',
      tags: [], featured: false, layout: null
    },
    {
      icon: '🌍', title: 'Global Reach',
      desc: 'Multi-jurisdictional licensing, 30+ languages, and 150+ payment methods for worldwide coverage.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&q=80',
      tags: [], featured: false, layout: null
    },
    {
      icon: '⚡', title: '99.99% Uptime SLA',
      desc: 'Enterprise cloud infrastructure with auto-scaling, load balancing, and zero-downtime deployments.',
      image: null, tags: [], featured: false, layout: null
    },
    {
      icon: '🤝', title: 'Dedicated Partnership',
      desc: '24/7 expert support with dedicated account managers, technical integration engineers, and strategic consultants who understand every regulated market we operate in.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80',
      tags: [], featured: true, layout: 'img-left'
    }
  ];
</script>

<section id="why" class="py-24 lg:py-32 px-6 lg:px-14 relative overflow-hidden">
  <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[150px]"></div>
  <div class="max-w-[1400px] mx-auto relative z-10">
    <div class="flex items-center gap-3 text-[11px] font-bold text-gold uppercase tracking-[0.15em] mb-3 reveal">
      <span class="w-6 h-px bg-gold"></span>Why CasinoGame
    </div>
    <h2 class="font-display font-extrabold text-[clamp(2rem,3.5vw,3rem)] tracking-tight mb-4 reveal">
      Engineered for <span class="text-gold">Excellence</span>
    </h2>
    <p class="text-txt-muted text-lg max-w-2xl leading-relaxed mb-14 reveal">
      Deep industry expertise combined with cutting-edge technology for unmatched iGaming solutions.
    </p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each features as feat, i}
        {#if feat.featured && feat.layout === 'text-left'}
          <!-- AI Featured card -->
          <div class="relative md:col-span-2 rounded-2xl border border-gold/[0.15] bg-gradient-to-br from-gold/[0.04] to-card overflow-hidden reveal">
            <div class="grid md:grid-cols-2 items-center">
              <div class="p-8 lg:p-10">
                <div class="text-3xl mb-4">{feat.icon}</div>
                <h3 class="font-display font-bold text-xl mb-3">{feat.title}</h3>
                <p class="text-sm text-txt-muted leading-relaxed">{feat.desc}</p>
                {#if feat.tags.length}
                  <div class="flex flex-wrap gap-3 mt-5">
                    {#each feat.tags as tag}
                      <span class="px-3 py-1 rounded-full bg-gold/[0.08] border border-gold/[0.1] text-[10px] font-semibold text-gold">{tag}</span>
                    {/each}
                  </div>
                {/if}
              </div>
              <div class="relative h-64 md:h-full overflow-hidden">
                <img src={feat.image} alt={feat.title} class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-r from-card via-card/60 to-transparent"></div>
              </div>
            </div>
          </div>
        {:else if feat.featured && feat.layout === 'img-left'}
          <!-- Partnership Featured card -->
          <div class="relative md:col-span-2 rounded-2xl border border-card-border bg-card overflow-hidden hover:border-gold/20 transition-all duration-400 reveal">
            <div class="grid md:grid-cols-2 items-center">
              <div class="relative h-56 md:h-full overflow-hidden">
                <img src={feat.image} alt={feat.title} class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-l from-card via-card/60 to-transparent md:bg-gradient-to-r"></div>
              </div>
              <div class="p-8 lg:p-10">
                <div class="text-2xl mb-3">{feat.icon}</div>
                <h3 class="font-display font-bold text-xl mb-3">{feat.title}</h3>
                <p class="text-sm text-txt-muted leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          </div>
        {:else}
          <!-- Standard card -->
          <div class="rounded-2xl border border-card-border bg-card p-8 hover:border-gold/20 transition-all duration-400 reveal">
            {#if feat.image}
              <div class="relative h-32 rounded-xl overflow-hidden mb-5">
                <img src={feat.image} alt={feat.title} class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent"></div>
              </div>
            {/if}
            <div class="text-2xl mb-3">{feat.icon}</div>
            <h3 class="font-display font-bold text-lg mb-2">{feat.title}</h3>
            <p class="text-sm text-txt-muted leading-relaxed">{feat.desc}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>
