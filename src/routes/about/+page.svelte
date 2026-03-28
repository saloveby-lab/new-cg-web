<script>
  import { onMount } from 'svelte';

  let visible = false;
  onMount(() => {
    visible = true;
  });

  const stats = [
    { value: '500+', label: 'Casino Games', gradient: 'from-gold-light to-gold' },
    { value: '50+', label: 'Countries', gradient: 'from-cyan to-blue-400' },
    { value: '24/7', label: 'Support', gradient: 'from-purple-400 to-pink-400' },
    { value: '99.9%', label: 'Uptime', gradient: 'from-green-400 to-emerald-400' }
  ];

  const values = [
    {
      title: 'AI-Powered Innovation',
      desc: 'Leveraging artificial intelligence and machine learning to deliver predictive analytics and personalized gaming experiences',
      icon: '🤖',
      gradient: 'from-cyan/20 to-blue-500/20'
    },
    {
      title: 'Enterprise Security',
      desc: 'Bank-grade encryption, multi-layer security protocols, and continuous threat monitoring to protect your operations',
      icon: '🛡️',
      gradient: 'from-gold/20 to-amber-500/20'
    },
    {
      title: 'Global Scalability',
      desc: 'Cloud-native infrastructure designed to scale seamlessly from startup to enterprise level operations',
      icon: '🌐',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      title: 'Real-time Analytics',
      desc: 'Advanced business intelligence dashboards with live player tracking, revenue metrics, and predictive insights',
      icon: '📊',
      gradient: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  const timeline = [
    { year: '2018', title: 'Founded', desc: 'Established with a vision to revolutionize iGaming technology' },
    { year: '2020', title: 'Global Expansion', desc: 'Reached 25+ countries with licensing in major markets' },
    { year: '2022', title: 'AI Integration', desc: 'Launched machine learning powered analytics platform' },
    { year: '2024', title: 'Industry Leader', desc: 'Serving 500+ operators across 50+ countries worldwide' }
  ];
</script>

<svelte:head>
  <title>About Us - CasinoGame</title>
</svelte:head>

<main class="relative pt-20 min-h-screen">
  <!-- Page-specific Background -->
  <div class="absolute inset-0 -z-10 pointer-events-none">
    <div class="absolute top-1/4 right-0 w-[950px] h-[950px] bg-gradient-to-bl from-cyan/[0.12] via-blue-400/[0.08] to-transparent rounded-full blur-3xl opacity-50"></div>
    <div class="absolute bottom-1/4 left-0 w-[850px] h-[850px] bg-gradient-to-tr from-purple-500/[0.10] via-indigo-400/[0.06] to-transparent rounded-full blur-3xl opacity-45"></div>
    <div class="absolute top-0 left-1/3 w-[750px] h-[750px] bg-gradient-to-br from-gold/[0.08] via-amber-400/[0.05] to-transparent rounded-full blur-3xl opacity-40"></div>
  </div>

  <!-- Hero Section with Gradient -->
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-cyan/5"></div>
    <div class="absolute inset-0 hero-grid-bg"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-20 sm:py-28 lg:py-32">
      <div class="text-center max-w-4xl mx-auto transition-all duration-700" class:opacity-100={visible} class:opacity-0={!visible}>
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-xs font-semibold text-gold uppercase tracking-wider mb-8">
          <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
          About CasinoGame
        </div>

        <h1 class="font-display font-bold text-4xl sm:text-6xl lg:text-7xl mb-6 leading-tight">
          Pioneering the Future of
          <span class="block mt-2 bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">
            iGaming Technology
          </span>
        </h1>

        <p class="text-base sm:text-lg lg:text-xl text-txt-muted max-w-3xl mx-auto leading-relaxed">
          Empowering operators worldwide with AI-driven platforms, enterprise-grade security, and cutting-edge innovation in online gaming solutions
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20">
        {#each stats as stat, i}
          <div class="relative group" style="animation-delay: {i * 0.1}s">
            <div class="absolute inset-0 bg-gradient-to-br {stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
            <div class="relative bg-card border border-card-border rounded-2xl p-6 sm:p-8 text-center hover:border-gold/30 transition-all duration-300">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-br {stat.gradient} bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div class="text-xs sm:text-sm text-txt-muted font-medium">{stat.label}</div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16 lg:py-20 space-y-20 sm:space-y-28 lg:space-y-32">

    <!-- Vision & Mission -->
    <section class="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-gold to-gold-dark opacity-20 blur-2xl group-hover:opacity-30 transition-all duration-500"></div>
        <div class="relative bg-gradient-to-br from-card via-card to-bg border border-card-border rounded-3xl p-8 sm:p-10 lg:p-12">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-2xl mb-6">
            🎯
          </div>
          <h2 class="font-display font-bold text-2xl sm:text-3xl mb-4 text-txt">Our Vision</h2>
          <p class="text-txt-muted text-base sm:text-lg leading-relaxed">
            To be the global standard for AI-powered iGaming solutions, transforming how operators engage with players through intelligent automation, predictive analytics, and seamless technology integration.
          </p>
        </div>
      </div>

      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-cyan to-blue-500 opacity-20 blur-2xl group-hover:opacity-30 transition-all duration-500"></div>
        <div class="relative bg-gradient-to-br from-card via-card to-bg border border-card-border rounded-3xl p-8 sm:p-10 lg:p-12">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan to-blue-500 flex items-center justify-center text-2xl mb-6">
            🚀
          </div>
          <h2 class="font-display font-bold text-2xl sm:text-3xl mb-4 text-txt">Our Mission</h2>
          <p class="text-txt-muted text-base sm:text-lg leading-relaxed">
            Deliver enterprise-grade iGaming platforms that combine innovative technology, robust security, and exceptional user experience to drive sustainable growth for our partners worldwide.
          </p>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section>
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-txt">Core Values</h2>
        <p class="text-txt-muted text-base sm:text-lg max-w-2xl mx-auto">
          The principles that drive our innovation and commitment to excellence
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-6 sm:gap-8">
        {#each values as value, i}
          <div class="relative group" style="animation-delay: {i * 0.15}s">
            <div class="absolute -inset-1 bg-gradient-to-br {value.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
            <div class="relative bg-card border border-card-border rounded-2xl p-8 hover:border-gold/30 transition-all duration-300 h-full">
              <div class="text-5xl mb-6">{value.icon}</div>
              <h3 class="font-display font-bold text-xl sm:text-2xl mb-4 text-txt">{value.title}</h3>
              <p class="text-txt-muted text-sm sm:text-base leading-relaxed">{value.desc}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Timeline -->
    <section>
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-txt">Our Journey</h2>
        <p class="text-txt-muted text-base sm:text-lg max-w-2xl mx-auto">
          Milestones in our evolution as an industry-leading iGaming platform provider
        </p>
      </div>

      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold-dark to-transparent hidden sm:block"></div>

        <div class="space-y-8 sm:space-y-12">
          {#each timeline as item, i}
            <div class="relative grid sm:grid-cols-2 gap-8 items-center">
              <!-- Left side (odd items) -->
              {#if i % 2 === 0}
                <div class="sm:text-right">
                  <div class="bg-card border border-card-border rounded-2xl p-6 sm:p-8 hover:border-gold/30 transition-all duration-300">
                    <div class="text-gold font-display font-bold text-4xl sm:text-5xl mb-3">{item.year}</div>
                    <h3 class="font-display font-bold text-xl sm:text-2xl mb-2 text-txt">{item.title}</h3>
                    <p class="text-txt-muted text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
                <div class="hidden sm:block"></div>
              {:else}
                <div class="hidden sm:block"></div>
                <div>
                  <div class="bg-card border border-card-border rounded-2xl p-6 sm:p-8 hover:border-gold/30 transition-all duration-300">
                    <div class="text-gold font-display font-bold text-4xl sm:text-5xl mb-3">{item.year}</div>
                    <h3 class="font-display font-bold text-xl sm:text-2xl mb-2 text-txt">{item.title}</h3>
                    <p class="text-txt-muted text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
              {/if}

              <!-- Timeline Dot -->
              <div class="absolute left-8 sm:left-1/2 top-1/2 -translate-y-1/2 sm:-translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-bg hidden sm:block"></div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative overflow-hidden rounded-3xl">
      <div class="absolute inset-0 bg-gradient-to-br from-gold/10 via-gold-dark/5 to-transparent"></div>
      <div class="relative bg-card border border-gold/20 rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
        <h2 class="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 text-txt">Ready to Transform Your iGaming Business?</h2>
        <p class="text-txt-muted text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          Join leading operators worldwide who trust CasinoGame for their platform needs
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" class="px-8 py-4 rounded-xl font-semibold text-base bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20 hover:-translate-y-1 hover:shadow-gold/40 transition-all duration-300">
            Get Started Today
          </a>
          <a href="/solution" class="px-8 py-4 rounded-xl font-semibold text-base bg-card text-txt border-2 border-gold/30 hover:border-gold hover:bg-gold/5 transition-all duration-300">
            Explore Solutions
          </a>
        </div>
      </div>
    </section>
  </div>
</main>

<style>
  .opacity-0 {
    opacity: 0;
    transform: translateY(20px);
  }
  .opacity-100 {
    opacity: 1;
    transform: translateY(0);
  }
</style>
