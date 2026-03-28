<script>
  import { onMount } from 'svelte';

  let visible = false;
  onMount(() => {
    visible = true;
  });

  const solutions = [
    {
      title: 'White Label Solution',
      description: 'Launch your casino in weeks with our turnkey platform',
      features: [
        'Fully customizable branding',
        'Pre-integrated payment systems',
        'Complete game library',
        'Marketing tools included',
        'Technical support 24/7'
      ],
      icon: '🎰'
    },
    {
      title: 'API Integration',
      description: 'Seamlessly integrate our games into your existing platform',
      features: [
        'RESTful API access',
        'Real-time game feeds',
        'Comprehensive documentation',
        'Sandbox environment',
        'Dedicated integration support'
      ],
      icon: '🔌'
    },
    {
      title: 'Custom Development',
      description: 'Tailored solutions built to your exact specifications',
      features: [
        'Bespoke game development',
        'Custom features & modules',
        'Unique design implementation',
        'Scalable architecture',
        'Ongoing maintenance'
      ],
      icon: '⚙️'
    }
  ];

  const platforms = [
    {
      name: 'Baccarat',
      description: 'Classic baccarat game with multiple betting options and smooth gameplay',
      features: ['Banker/Player', 'Tie Betting', 'HD Graphics', 'Mobile Ready'],
      image: '/images/home/bc.jpg'
    },
    {
      name: 'Dragon Tiger',
      description: 'Fast-paced Dragon Tiger game with simple rules and exciting gameplay',
      features: ['Quick Rounds', 'Side Bets', 'Live Stats', 'Auto Play'],
      image: '/images/home/dt.jpeg'
    },
    {
      name: 'Roulette',
      description: 'Premium roulette with European and American variants',
      features: ['Multiple Variants', 'Inside/Outside Bets', 'Statistics', 'HD Quality'],
      image: '/images/home/rl.jpg'
    },
    {
      name: 'Sports Betting',
      description: 'Comprehensive sportsbook platform with live betting',
      features: ['Live Betting', 'Multiple Sports', 'Odds Management', 'Cash Out'],
      image: '/images/home/sb.jpg'
    }
  ];
</script>

<svelte:head>
  <title>Solutions - CasinoGame</title>
</svelte:head>

<main class="relative pt-20 min-h-screen">
  <!-- Page-specific Background -->
  <div class="absolute inset-0 -z-10 pointer-events-none">
    <div class="absolute top-20 right-0 w-[1050px] h-[1050px] bg-gradient-to-bl from-blue-400/[0.13] via-cyan/[0.09] to-transparent rounded-full blur-3xl opacity-50"></div>
    <div class="absolute bottom-0 left-0 w-[850px] h-[850px] bg-gradient-to-tr from-purple-500/[0.11] via-violet-400/[0.07] to-transparent rounded-full blur-3xl opacity-45"></div>
    <div class="absolute top-1/2 left-1/3 w-[750px] h-[750px] bg-gradient-to-br from-indigo-400/[0.08] via-blue-500/[0.05] to-transparent rounded-full blur-3xl opacity-40"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16 lg:py-20">
    <!-- Hero Section -->
    <div class="text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-700" class:opacity-100={visible} class:opacity-0={!visible}>
      <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 bg-gradient-to-r from-gold via-gold-dark to-gold bg-clip-text text-transparent">
        Our Solutions
      </h1>
      <p class="text-base sm:text-lg lg:text-xl text-txt-muted max-w-3xl mx-auto px-4">
        Comprehensive iGaming solutions designed to power your success
      </p>
    </div>

    <!-- Main Solutions -->
    <section class="mb-12 sm:mb-16 lg:mb-20">
      <h2 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-8 sm:mb-12 text-txt text-center">Choose Your Path</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {#each solutions as solution}
          <div class="bg-card rounded-2xl p-6 sm:p-8 border border-card-border hover:border-gold/50 transition-all duration-300 group">
            <div class="text-5xl sm:text-6xl mb-4 sm:mb-6">{solution.icon}</div>
            <h3 class="font-display font-bold text-xl sm:text-2xl mb-3 sm:mb-4 text-txt group-hover:text-gold transition-colors">
              {solution.title}
            </h3>
            <p class="text-sm sm:text-base text-txt-muted mb-4 sm:mb-6">{solution.description}</p>
            <ul class="space-y-2 sm:space-y-3">
              {#each solution.features as feature}
                <li class="flex items-start gap-2 text-xs sm:text-sm text-txt-muted">
                  <span class="text-gold mt-0.5 flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              {/each}
            </ul>
            <button class="mt-6 sm:mt-8 w-full px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20 hover:-translate-y-0.5 hover:shadow-gold/30 transition-all duration-300">
              Learn More
            </button>
          </div>
        {/each}
      </div>
    </section>

    <!-- Platform Solutions -->
    <section class="mb-12 sm:mb-16 lg:mb-20">
      <h2 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-8 sm:mb-12 text-txt text-center">Platform Solutions</h2>
      <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {#each platforms as platform}
          <div class="bg-gradient-to-br from-card to-bg rounded-xl overflow-hidden border border-card-border hover:border-gold/50 transition-all duration-300">
            <div class="h-40 sm:h-48 overflow-hidden">
              <img src={platform.image} alt={platform.name} class="w-full h-full object-cover" />
            </div>
            <div class="p-5 sm:p-8">
              <h3 class="font-display font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-txt">{platform.name}</h3>
              <p class="text-sm sm:text-base text-txt-muted mb-4 sm:mb-6">{platform.description}</p>
              <div class="flex flex-wrap gap-2">
                {#each platform.features as feature}
                  <span class="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gold/10 text-gold text-xs rounded-lg border border-gold/20">
                    {feature}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Technology Stack -->
    <section class="bg-gradient-to-br from-gold/5 to-transparent rounded-2xl p-6 sm:p-8 lg:p-12 border border-gold/20 mb-12 sm:mb-16 lg:mb-20">
      <h2 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-8 sm:mb-12 text-txt text-center">Technology Stack</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {#each [
          { title: 'Frontend', tech: ['React', 'Vue.js', 'Svelte', 'WebGL'] },
          { title: 'Backend', tech: ['Node.js', 'Python', 'Go', 'Java'] },
          { title: 'Database', tech: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
          { title: 'Infrastructure', tech: ['AWS', 'Docker', 'Kubernetes', 'CloudFlare'] }
        ] as stack}
          <div>
            <h3 class="font-display font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gold">{stack.title}</h3>
            <ul class="space-y-1.5 sm:space-y-2">
              {#each stack.tech as item}
                <li class="text-xs sm:text-sm text-txt-muted">• {item}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-card rounded-2xl p-6 sm:p-8 lg:p-12 border border-card-border text-center">
      <h2 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 text-txt">Ready to Get Started?</h2>
      <p class="text-base sm:text-lg lg:text-xl text-txt-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
        Let's discuss how our solutions can help grow your iGaming business
      </p>
      <a href="/contact" class="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20 hover:-translate-y-0.5 hover:shadow-gold/30 transition-all duration-300">
        Contact Us Today
      </a>
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
