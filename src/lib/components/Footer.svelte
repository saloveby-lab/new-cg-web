<script>
  const columns = [
    {
      title: 'Solutions',
      links: [
        { label: 'White Label', href: '/solution' },
        { label: 'Turnkey Casino', href: '/solution' },
        { label: 'API Integration', href: '/solution' },
        { label: 'Custom Development', href: '/solution' }
      ]
    },
    {
      title: 'Products',
      links: [
        { label: 'Games Aggregator', href: '/solution' },
        { label: 'Sportsbook', href: '/solution' },
        { label: 'Live Casino', href: '/solution' },
        { label: 'AI Analytics', href: '/solution' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'News', href: '/news' },
        { label: 'Events', href: '/events' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQs', href: '/faqs' },
        { label: 'Documentation', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: '𝕏', label: 'Twitter', href: '#' },
    { icon: 'in', label: 'LinkedIn', href: '#' },
    { icon: '▶', label: 'YouTube', href: '#' },
    { icon: '📷', label: 'Instagram', href: '#' }
  ];
</script>

<footer class="relative bg-gradient-to-b from-bg to-bg-2 border-t border-gold/10">
  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-br from-gold/[0.02] via-transparent to-cyan/[0.02] pointer-events-none"></div>

  <div class="relative max-w-[1600px] mx-auto px-6 lg:px-16 pt-20 pb-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12 mb-16 pb-16 border-b border-gold/10">
      <!-- Brand -->
      <div class="lg:col-span-2">
        <div class="mb-6">
          <img src="/images/logo-cg-game.png" alt="CasinoGame Logo" class="h-12 w-auto" />
        </div>
        <p class="text-sm text-txt-muted leading-relaxed mb-6 max-w-sm">
          CasinoGame is licensed and regulated as B2B gaming provider by the Anjouan Gaming authority under license ALSI-202503036-FI2.
        </p>
        <div class="flex items-center gap-3">
          {#each socialLinks as social}
            <a
              href={social.href}
              aria-label={social.label}
              class="w-10 h-10 rounded-xl bg-card border border-card-border flex items-center justify-center text-sm text-txt-muted hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 group"
            >
              <span class="group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
            </a>
          {/each}
        </div>
      </div>

      {#each columns as col}
        <div>
          <h5 class="font-display text-xs font-bold uppercase tracking-wider text-gold mb-6">{col.title}</h5>
          <div class="space-y-3">
            {#each col.links as link}
              <a
                href={link.href}
                class="block text-sm text-txt-muted hover:text-gold transition-all duration-300 hover:translate-x-1"
              >
                {link.label}
              </a>
            {/each}
          </div>
        </div>
      {/each}

      <!-- Location & Details -->
      <div class="lg:col-span-2">
        <h5 class="font-display text-xs font-bold uppercase tracking-wider text-gold mb-6">Location & Details</h5>
        <div class="space-y-4">
          <div>
            <p class="text-sm font-medium text-txt mb-1">SILO TRUST Limited Liability Company</p>
            <p class="text-xs text-txt-muted leading-relaxed">
              The Meydan Hotel, Grandstand, 6th floor,<br />
              Meydan Road, Nad Al Sheba, Dubai, U.A.E.
            </p>
          </div>
          <div class="space-y-2">
            <a href="tel:+639601275422" class="flex items-center gap-2 text-sm text-txt-muted hover:text-gold transition-colors">
              <span>📞</span>
              <span>+63 960 127 5422</span>
            </a>
            <a href="mailto:mon@casinogame.com" class="flex items-center gap-2 text-sm text-txt-muted hover:text-gold transition-colors">
              <span>✉️</span>
              <span>mon@casinogame.com</span>
            </a>
            <a href="https://www.casinogame.com" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-sm text-txt-muted hover:text-gold transition-colors">
              <span>🌐</span>
              <span>www.casinogame.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex flex-col sm:flex-row items-center gap-4 text-xs text-txt-muted">
        <p>&copy; 2024 CasinoGame. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <span class="hidden sm:block">•</span>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span class="text-green-400 font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 text-xs">
        <div class="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-card-border">
          <span class="text-gold">🛡️</span>
          <span class="text-txt-muted">Anjouan Gaming Licensed</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-card-border">
          <span class="text-cyan">📜</span>
          <span class="text-txt-muted">ALSI-202503036-FI2</span>
        </div>
      </div>
    </div>
  </div>
</footer>
