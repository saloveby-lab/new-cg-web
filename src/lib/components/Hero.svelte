<script>
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section class="relative min-h-screen flex items-center overflow-hidden">
  <div class="absolute inset-0 hero-grid-bg"></div>
  <div class="absolute inset-0">
    <div class="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[120px]"></div>
    <div class="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan/[0.02] rounded-full blur-[100px]"></div>
  </div>

  <div class="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16 pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
    <div class="order-2 lg:order-1">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/[0.08] border border-gold/[0.15] text-[11px] font-bold text-gold uppercase tracking-[0.12em] mb-7 reveal">
        <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot"></span>
        Next-Gen iGaming Platform · AI Powered
      </div>
      <h1 class="font-display font-bold text-[clamp(2.6rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight mb-6 reveal reveal-delay-1">
        Build Your<br>
        <span class="bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">Premium Casino</span><br>
        with <span class="bg-gradient-to-r from-cyan to-blue-400 bg-clip-text text-transparent">AI-Powered</span> Tech
      </h1>
      <p class="text-txt-muted text-base sm:text-lg leading-relaxed max-w-xl mb-10 reveal reveal-delay-2">
        Enterprise-grade iGaming solutions powered by artificial intelligence — White Label platforms, predictive analytics, 500+ premium games, and seamless multi-jurisdictional compliance.
      </p>
      <div class="flex flex-wrap gap-4 reveal reveal-delay-3">
        <button on:click={() => scrollTo('contact')} class="px-8 py-3.5 rounded-lg font-semibold bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/25 hover:-translate-y-0.5 hover:shadow-gold/40 transition-all duration-300">
          Request a Demo
        </button>
        <button on:click={() => scrollTo('solutions')} class="px-8 py-3.5 rounded-lg font-semibold border border-txt-dark text-txt hover:border-gold hover:text-gold transition-all duration-300">
          Explore Solutions →
        </button>
      </div>
      <div class="flex flex-wrap items-center gap-4 sm:gap-6 mt-10 reveal reveal-delay-4">
        <div class="flex items-center gap-2 text-xs sm:text-sm font-medium">
          <span class="w-5 h-5 rounded-md bg-gold/10 flex items-center justify-center text-gold text-xs">✓</span>
          <span class="text-txt-muted">MGA Licensed</span>
        </div>
        <div class="flex items-center gap-2 text-xs sm:text-sm font-medium">
          <span class="w-5 h-5 rounded-md bg-cyan/10 flex items-center justify-center text-cyan text-xs">✓</span>
          <span class="text-txt-muted">ISO 27001</span>
        </div>
        <div class="flex items-center gap-2 text-xs sm:text-sm font-medium">
          <span class="w-5 h-5 rounded-md bg-green-500/10 flex items-center justify-center text-green-400 text-xs">✓</span>
          <span class="text-txt-muted">99.99% Uptime</span>
        </div>
      </div>
    </div>

    <div class="relative reveal reveal-delay-2 order-1 lg:order-2">
      <!-- Ambient Glows -->
      <div class="absolute -inset-20 bg-gradient-to-br from-gold/20 via-transparent to-cyan/20 blur-3xl opacity-30"></div>

      <div class="relative rounded-3xl overflow-hidden border border-gold/20 shadow-2xl shadow-gold/10 group">
        <!-- Main Image -->
        <div class="relative aspect-[4/3] lg:aspect-[16/10]">
          <img
            src="/images/home/home-banner-1.jpg"
            alt="Casino Platform"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent"></div>
        </div>

        <!-- Live Dashboard Overlay -->
        <div class="absolute bottom-6 left-6 right-6">
          <div class="bg-bg-2/95 backdrop-blur-2xl rounded-2xl border border-gold/30 p-6 shadow-2xl shadow-gold/20">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></span>
                <span class="text-xs font-bold text-gold uppercase tracking-wider">Live Analytics</span>
              </div>
              <span class="px-2.5 py-1 bg-gold/10 text-gold text-xs rounded-lg border border-gold/20 font-semibold">Real-time</span>
            </div>

            <div class="grid grid-cols-3 gap-4 sm:gap-6">
              <div class="text-center sm:text-left">
                <div class="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-gold-light to-gold bg-clip-text text-transparent mb-1">$2.4M</div>
                <div class="text-[10px] sm:text-xs text-txt-muted font-medium">Revenue Today</div>
              </div>
              <div class="text-center sm:text-left">
                <div class="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-cyan to-blue-400 bg-clip-text text-transparent mb-1">14.2K</div>
                <div class="text-[10px] sm:text-xs text-txt-muted font-medium">Active Players</div>
              </div>
              <div class="text-center sm:text-left">
                <div class="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1">+23%</div>
                <div class="text-[10px] sm:text-xs text-txt-muted font-medium">Growth MoM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute -top-10 -right-10 w-40 h-40 border-2 border-gold/10 rounded-full animate-spin-slow"></div>
      <div class="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-cyan/10 rounded-full animate-spin-slower"></div>
      <div class="absolute top-1/3 -right-6 w-20 h-20 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-2xl"></div>
    </div>
  </div>
</section>
