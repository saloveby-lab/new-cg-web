<script>
  import { onMount } from 'svelte';

  const stats = [
    { target: 18, suffix: '+', label: 'Years Experience' },
    { target: 300, suffix: '+', label: 'Game Providers' },
    { target: 500, suffix: '+', label: 'Satisfied Clients' },
    { target: 150, suffix: '+', label: 'Payment Methods' },
    { target: 100, suffix: 'M+', label: 'Registered Players' },
    { target: 50, suffix: 'B+', label: 'Transactions / Year' }
  ];

  let values = stats.map(() => 0);
  let animated = false;

  onMount(() => {
    const el = document.getElementById('stats-bar');
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        stats.forEach((s, i) => {
          let c = 0;
          const step = Math.max(1, Math.floor(s.target / 50));
          const timer = setInterval(() => {
            c += step;
            if (c >= s.target) { c = s.target; clearInterval(timer); }
            values[i] = c;
            values = [...values];
          }, 25);
        });
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
  });
</script>

<div id="stats-bar" class="bg-bg-2 border-y border-card-border py-10 lg:py-14 px-6 lg:px-14">
  <div class="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
    {#each stats as stat, i}
      <div class="reveal" style="transition-delay: {i * 0.08}s">
        <div class="font-display font-extrabold text-3xl lg:text-4xl text-gradient">
          {values[i]}{stat.suffix}
        </div>
        <div class="text-[11px] text-txt-muted uppercase tracking-[0.1em] font-medium mt-1">{stat.label}</div>
      </div>
    {/each}
  </div>
</div>
