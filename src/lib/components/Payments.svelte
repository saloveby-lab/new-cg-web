<script>
  const payments = [
    { icon: '💳', name: 'Visa' },
    { icon: '💳', name: 'Mastercard' },
    { icon: '₿', name: 'Bitcoin' },
    { icon: '⟠', name: 'Ethereum' },
    { icon: '🟣', name: 'Skrill' },
    { icon: '🟢', name: 'Neteller' },
    { icon: '🏦', name: 'Bank Wire' },
    { icon: '🟡', name: 'Pix' },
    { icon: '🔶', name: 'UPI' },
    { icon: '🟣', name: 'Revolut' },
    { icon: '🔵', name: 'Trustly' },
    { icon: '🟢', name: 'Jeton' },
    { icon: '🟠', name: 'AstroPay' },
    { icon: '🔴', name: 'Neosurf' },
    { icon: '🟡', name: 'Interac' },
    { icon: '🔵', name: 'Zimpler' },
    { icon: '🔴', name: 'UnionPay' },
    { icon: '🟤', name: 'Paysafe' }
  ];
</script>

<section id="payments" class="py-24 lg:py-32 px-6 lg:px-14 bg-bg-2">
  <div class="max-w-[1400px] mx-auto">
    <div class="flex items-center gap-3 text-[11px] font-bold text-gold uppercase tracking-[0.15em] mb-3 reveal">
      <span class="w-6 h-px bg-gold"></span>Global Payments
    </div>
    <h2 class="font-display font-extrabold text-[clamp(2rem,3.5vw,3rem)] tracking-tight mb-4 reveal">
      150+ Payment <span class="text-gold">Providers</span>
    </h2>
    <p class="text-txt-muted text-lg max-w-2xl leading-relaxed mb-14 reveal">
      Seamless processing with worldwide coverage under a single integration.
    </p>

    <!-- Payment banner image -->
    <div class="relative rounded-2xl overflow-hidden mb-10 reveal group">
      <div class="relative h-64 sm:h-72 lg:h-80">
        <img src="/images/branding/branding_4.jpg" alt="Payment Processing" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-bg-2/95 via-bg-2/60 to-transparent flex items-end">
          <div class="p-8 sm:p-10 w-full">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-xs font-semibold text-gold mb-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                  Global Payment Solutions
                </div>
                <p class="text-sm sm:text-base text-txt-muted max-w-2xl leading-relaxed">
                  From traditional banking to cryptocurrency, we support every payment method your players need with enterprise-grade security and lightning-fast processing.
                </p>
              </div>
              <div class="flex gap-2 flex-shrink-0">
                <div class="px-4 py-2 rounded-lg bg-gold/10 border border-gold/20 text-center">
                  <div class="text-gold font-bold text-xl sm:text-2xl">150+</div>
                  <div class="text-txt-muted text-xs">Providers</div>
                </div>
                <div class="px-4 py-2 rounded-lg bg-cyan/10 border border-cyan/20 text-center">
                  <div class="text-cyan font-bold text-xl sm:text-2xl">24/7</div>
                  <div class="text-txt-muted text-xs">Processing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
      {#each payments as pay, i}
        <div class="group bg-bg rounded-xl border border-card-border p-4 text-center hover:border-gold/20 hover:-translate-y-0.5 transition-all duration-300 reveal" style="transition-delay: {(i % 9) * 0.03}s">
          <div class="text-2xl mb-1.5">{pay.icon}</div>
          <div class="text-[11px] font-medium text-txt-muted group-hover:text-txt transition-colors">{pay.name}</div>
        </div>
      {/each}
    </div>
  </div>
</section>
