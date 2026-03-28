<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let scrolled = false;
  let mobileMenuOpen = false;

  onMount(() => {
    const handler = () => {
      scrolled = window.scrollY > 80;
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  });

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Solution", href: "/solution" },
    { label: "News", href: "/news" },
    { label: "Events", href: "/events" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact us", href: "/contact" },
  ];

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  // Make current path reactive
  $: currentPath = $page.url.pathname;
  $: isActive = (href) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath === href;
  };
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b transition-all duration-500 {scrolled
    ? 'bg-bg/98 shadow-2xl shadow-gold/5 border-gold/10'
    : 'bg-bg/85 border-gold/[0.06]'}"
>
  <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16">
    <div class="flex items-center justify-between h-24 sm:h-28">
      <!-- Logo -->
      <a href="/" class="flex items-center z-50 relative group">
        <!-- Mobile Logo -->
        <img
          src="/images/logo.png"
          alt="CasinoGame Logo"
          class="md:hidden h-12 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(212,168,83,0.3)]"
        />
        <!-- Tablet Logo -->
        <img
          src="/images/logo-cg.png"
          alt="CasinoGame Logo"
          class="hidden md:block lg:hidden h-16 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(212,168,83,0.3)]"
        />
        <!-- Desktop Logo -->
        <img
          src="/images/logo-cg-game.png"
          alt="CasinoGame Logo"
          class="hidden lg:block h-14 xl:h-16 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(212,168,83,0.4)]"
        />
      </a>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center gap-10 xl:gap-12">
        {#each links as { label, href }}
          <a
            {href}
            data-sveltekit-preload-data="hover"
            class="relative text-sm xl:text-base font-medium transition-all duration-300 group {isActive(
              href,
            )
              ? 'text-gold'
              : 'text-txt-muted hover:text-txt'}"
          >
            {label}
            <span
              class="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-dark transition-all duration-300 {isActive(
                href,
              )
                ? 'w-full'
                : 'w-0 group-hover:w-full'}"
            ></span>
          </a>
        {/each}
      </div>

      <!-- CTA Button (Desktop) -->
      <a
        href="/contact"
        class="hidden lg:inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm xl:text-base bg-gradient-to-r from-gold via-gold-dark to-gold bg-size-200 bg-pos-0 hover:bg-pos-100 text-bg shadow-xl shadow-gold/25 hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-0.5 transition-all duration-500 relative overflow-hidden group"
      >
        <span class="relative z-10">Get Started</span>
        <svg
          class="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </a>

      <!-- Mobile Menu Button -->
      <button
        on:click={toggleMobileMenu}
        class="lg:hidden relative w-10 h-10 flex items-center justify-center text-txt z-50" 
        aria-label="Toggle menu"
      >
        <div class="w-6 flex flex-col gap-1.5">
          <span
            class="w-full h-0.5 bg-current transition-all duration-300 {mobileMenuOpen
              ? 'rotate-45 translate-y-2'
              : ''}"
          ></span>
          <span
            class="w-full h-0.5 bg-current transition-all duration-300 {mobileMenuOpen
              ? 'opacity-0'
              : ''}"
          ></span>
          <span
            class="w-full h-0.5 bg-current transition-all duration-300 {mobileMenuOpen
              ? '-rotate-45 -translate-y-2'
              : ''}"
          ></span>
        </div>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div
      class="lg:hidden fixed inset-0 top-24 sm:top-28 bg-[#0a0a0a]/98 backdrop-blur-2xl z-40 animate-fade-in border-t border-gold/10"
    >
      <div class="max-w-[1400px] mx-auto px-6 py-8 bg-black">
        <div class="flex flex-col gap-2">
          {#each links as { label, href }}
            <a
              {href}
              data-sveltekit-preload-data="hover"
              on:click={closeMobileMenu}
              class="text-base font-semibold transition-all duration-300 py-4 px-5 rounded-xl {isActive(
                href,
              )
                ? 'text-gold bg-gold/15 border border-gold/30 shadow-lg shadow-gold/10'
                : 'text-txt hover:text-gold hover:bg-card/80 border border-card-border/50 hover:border-gold/20'}"
            >
              {label}
            </a>
          {/each}
          <a
            href="/contact"
            on:click={closeMobileMenu}
            class="mt-6 px-6 py-4 rounded-xl font-semibold text-center bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20"
          >
            Get Started →
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }

  .bg-size-200 {
    background-size: 200% auto;
  }

  .bg-pos-0 {
    background-position: 0% center;
  }

  .bg-pos-100 {
    background-position: 100% center;
  }
</style>
