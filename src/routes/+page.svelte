<script>
  import { onMount } from 'svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Stats from '$lib/components/Stats.svelte';
  import Solutions from '$lib/components/Solutions.svelte';
  import Products from '$lib/components/Products.svelte';
  import WhyUs from '$lib/components/WhyUs.svelte';
  import Licenses from '$lib/components/Licenses.svelte';
  import Brands from '$lib/components/Brands.svelte';
  import Payments from '$lib/components/Payments.svelte';
  import CTA from '$lib/components/CTA.svelte';

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  });
</script>

<svelte:head>
  <title>CasinoGame — Next-Gen iGaming Solutions</title>
  <meta name="description" content="Enterprise-grade iGaming solutions — White Label, Turnkey, Crypto Casino platforms with 300+ game providers and AI-powered analytics." />
</svelte:head>

<main class="relative min-h-screen">
  <!-- Page-specific Background -->
  <div class="absolute inset-0 -z-10 pointer-events-none">
    <div class="absolute top-0 right-1/4 w-[1100px] h-[1100px] bg-gradient-to-bl from-gold/[0.15] via-amber-400/[0.10] to-transparent rounded-full blur-3xl opacity-50"></div>
    <div class="absolute top-1/3 left-0 w-[850px] h-[850px] bg-gradient-to-br from-cyan/[0.12] via-blue-400/[0.08] to-transparent rounded-full blur-3xl opacity-45"></div>
    <div class="absolute bottom-0 right-0 w-[900px] h-[900px] bg-gradient-to-tl from-purple-500/[0.10] via-violet-500/[0.06] to-transparent rounded-full blur-3xl opacity-40"></div>
  </div>

  <Hero />
  <Stats />
  <Solutions />
  <Products />
  <WhyUs />
  <Licenses />
  <Brands />
  <Payments />
  <CTA />
</main>
