<script>
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<!-- Background Layer -->
<div class="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-bg to-[#0d0d0d]">
  <!-- Sophisticated Gradient Orbs -->
  <div class="absolute top-0 right-1/3 w-[1000px] h-[1000px] bg-gradient-to-br from-gold/[0.12] via-amber-400/[0.08] to-transparent rounded-full blur-3xl opacity-40 animate-float"></div>
  <div class="absolute bottom-0 left-0 w-[900px] h-[900px] bg-gradient-to-tr from-cyan/[0.10] via-blue-400/[0.06] to-transparent rounded-full blur-3xl opacity-35 animate-float" style="animation-delay: -2s; animation-duration: 8s;"></div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/[0.08] via-indigo-500/[0.05] to-transparent rounded-full blur-3xl opacity-30 animate-float" style="animation-delay: -4s; animation-duration: 10s;"></div>

  <!-- Luxury Grid Pattern -->
  <div class="absolute inset-0 opacity-[0.025]" style="background-image: linear-gradient(rgba(212, 168, 83, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 168, 83, 0.15) 1px, transparent 1px); background-size: 80px 80px;"></div>

  <!-- Radial Vignette -->
  <div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>

  <!-- Premium Noise Texture -->
  <div class="absolute inset-0 opacity-[0.02] mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%225%22 /%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"></div>
</div>

<Navbar />
<slot />
<Footer />

<style>
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -30px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .bg-gradient-radial {
    background: radial-gradient(circle at center, var(--tw-gradient-stops));
  }
</style>
