<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  let visible = false;
  onMount(() => {
    visible = true;
  });

  let categories = [
    {
      name: 'General',
      icon: '💡',
      faqs: [
        {
          question: 'What is CasinoGame?',
          answer: 'CasinoGame is a comprehensive B2B iGaming platform provider offering white-label casino solutions, game integration APIs, and custom development services for online gaming operators worldwide.',
          open: false
        },
        {
          question: 'Which markets do you operate in?',
          answer: 'We operate in 50+ countries across Europe, Asia, Latin America, and Africa. Our platform is compliant with major gaming jurisdictions including MGA, UKGC, Curacao, and various other regulatory bodies.',
          open: false
        },
        {
          question: 'How long does it take to launch a casino?',
          answer: 'With our white-label solution, you can launch a fully functional casino in as little as 2-4 weeks. Custom implementations typically take 2-3 months depending on specific requirements.',
          open: false
        },
        {
          question: 'Do you provide 24/7 support?',
          answer: 'Yes, we provide round-the-clock technical support for all our partners. Our dedicated support team is available via email, phone, and live chat to ensure your operations run smoothly.',
          open: false
        }
      ]
    },
    {
      name: 'Technical',
      icon: '⚙️',
      faqs: [
        {
          question: 'What technologies does your platform use?',
          answer: 'Our platform is built on modern, scalable technologies including Node.js, React, PostgreSQL, Redis, and runs on AWS infrastructure with CloudFlare CDN for optimal performance and security.',
          open: false
        },
        {
          question: 'How does API integration work?',
          answer: 'We provide RESTful APIs with comprehensive documentation, sandbox environment for testing, and dedicated integration support. Most integrations can be completed within 1-2 weeks with our technical assistance.',
          open: false
        },
        {
          question: 'Is the platform mobile-optimized?',
          answer: 'Yes, our platform is fully responsive and optimized for all devices. We also offer native iOS and Android apps as part of our white-label solution, ensuring seamless mobile gaming experience.',
          open: false
        },
        {
          question: 'What about platform security?',
          answer: 'Security is our top priority. We implement SSL encryption, two-factor authentication, DDoS protection, regular security audits, and comply with PCI DSS standards for payment processing.',
          open: false
        }
      ]
    },
    {
      name: 'Games & Content',
      icon: '🎮',
      faqs: [
        {
          question: 'How many games are available?',
          answer: 'Our platform offers 500+ games including slots, table games, live dealer games, and sports betting. We continuously add new titles from top-tier providers and develop exclusive in-house games.',
          open: false
        },
        {
          question: 'Can I add my own games?',
          answer: 'Absolutely! Our platform supports third-party game integration through our API. You can add games from any provider that offers standard integration protocols.',
          open: false
        },
        {
          question: 'Do you offer live dealer games?',
          answer: 'Yes, we provide live dealer solutions with professional studios, multiple game tables, HD streaming, and support for various languages and currencies.',
          open: false
        },
        {
          question: 'Are games certified and fair?',
          answer: 'All our games are RNG-certified by independent testing laboratories like iTech Labs and GLI. We ensure complete fairness and transparency in all gaming operations.',
          open: false
        }
      ]
    },
    {
      name: 'Payments',
      icon: '💳',
      faqs: [
        {
          question: 'What payment methods are supported?',
          answer: 'We support 100+ payment methods including credit/debit cards, e-wallets (Skrill, Neteller, PayPal), bank transfers, cryptocurrencies (Bitcoin, Ethereum, USDT), and local payment methods for specific regions.',
          open: false
        },
        {
          question: 'How long do withdrawals take?',
          answer: 'Withdrawal processing times vary by payment method: e-wallets (instant-24h), cards (1-3 days), bank transfers (2-5 days), crypto (instant-1h). Our system supports instant withdrawals for verified accounts.',
          open: false
        },
        {
          question: 'Can I use multiple currencies?',
          answer: 'Yes, our platform supports 50+ currencies with automatic conversion. Players can deposit and withdraw in their preferred currency, and you can set different currency options per market.',
          open: false
        },
        {
          question: 'What are the transaction fees?',
          answer: 'Transaction fees vary by payment provider and are customizable. We work with multiple payment processors to ensure competitive rates and offer volume-based discounts for high-transaction operators.',
          open: false
        }
      ]
    },
    {
      name: 'Licensing & Compliance',
      icon: '📜',
      faqs: [
        {
          question: 'Do you help with licensing?',
          answer: 'Yes, we provide consultation and support throughout the licensing process. We have partnerships with licensing authorities and can guide you through application procedures for various jurisdictions.',
          open: false
        },
        {
          question: 'Is your platform compliant with regulations?',
          answer: 'Our platform is built to comply with major gaming regulations including GDPR, AML/KYC requirements, responsible gaming standards, and specific jurisdictional requirements.',
          open: false
        },
        {
          question: 'What about responsible gaming features?',
          answer: 'We provide comprehensive responsible gaming tools including deposit limits, self-exclusion, reality checks, session time limits, and integration with responsible gaming organizations like GamStop.',
          open: false
        },
        {
          question: 'How is player data protected?',
          answer: 'Player data is encrypted end-to-end, stored in secure servers with regular backups, and handled in full compliance with GDPR and other data protection regulations. We conduct regular security audits.',
          open: false
        }
      ]
    },
    {
      name: 'Pricing & Business',
      icon: '💰',
      faqs: [
        {
          question: 'What is your pricing model?',
          answer: 'We offer flexible pricing models including monthly licensing fees, revenue share, and hybrid models. Pricing depends on your specific requirements, game selection, and expected volume. Contact us for a custom quote.',
          open: false
        },
        {
          question: 'Is there a setup fee?',
          answer: 'Setup fees vary based on the solution chosen. White-label solutions have a one-time setup fee, while API integration may have minimal or no setup costs. Custom development is quoted separately.',
          open: false
        },
        {
          question: 'What is included in the license?',
          answer: 'License includes platform access, game library, payment integration, back-office tools, player management, reporting & analytics, technical support, and regular platform updates.',
          open: false
        },
        {
          question: 'Can I get a demo?',
          answer: 'Yes! We offer free platform demos and can set up a test account for you to explore all features. Contact our sales team to schedule a personalized demo session.',
          open: false
        }
      ]
    }
  ];

  let selectedCategory = 'General';
  $: currentFaqs = categories.find(cat => cat.name === selectedCategory)?.faqs || [];

  function toggleFaq(categoryName, faqIndex) {
    categories = categories.map(cat => {
      if (cat.name === categoryName) {
        return {
          ...cat,
          faqs: cat.faqs.map((faq, idx) => ({
            ...faq,
            open: idx === faqIndex ? !faq.open : faq.open
          }))
        };
      }
      return cat;
    });
  }
</script>

<svelte:head>
  <title>FAQs - CasinoGame</title>
</svelte:head>

<main class="relative pt-20 min-h-screen">
  <!-- Page-specific Background -->
  <div class="absolute inset-0 -z-10 pointer-events-none">
    <div class="absolute top-1/4 left-0 w-[900px] h-[900px] bg-gradient-to-br from-emerald-400/[0.12] via-green-400/[0.08] to-transparent rounded-full blur-3xl opacity-50"></div>
    <div class="absolute bottom-0 right-1/4 w-[1000px] h-[1000px] bg-gradient-to-tl from-teal-400/[0.10] via-cyan-400/[0.06] to-transparent rounded-full blur-3xl opacity-45"></div>
    <div class="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-lime-400/[0.08] via-green-500/[0.05] to-transparent rounded-full blur-3xl opacity-40"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16 lg:py-20">
    <!-- Hero Section -->
    <div class="text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-700" class:opacity-100={visible} class:opacity-0={!visible}>
      <h1 class="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 bg-gradient-to-r from-gold via-gold-dark to-gold bg-clip-text text-transparent leading-tight">
        Frequently Asked Questions
      </h1>
      <p class="text-base sm:text-lg lg:text-xl text-txt-muted max-w-3xl mx-auto px-4">
        Find answers to common questions about our platform, services, and solutions
      </p>
    </div>

    <!-- Search Bar -->
    <div class="max-w-2xl mx-auto mb-8 sm:mb-12">
      <div class="relative">
        <input
          type="text"
          placeholder="Search for answers..."
          class="w-full px-4 sm:px-6 py-3 sm:py-4 bg-card border border-card-border rounded-xl text-sm sm:text-base text-txt placeholder:text-txt-muted focus:outline-none focus:border-gold transition-colors pl-10 sm:pl-12"
        />
        <span class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-txt-muted text-sm sm:text-base">🔍</span>
      </div>
    </div>

    <div class="grid lg:grid-cols-4 gap-6 sm:gap-8">
      <!-- Category Sidebar -->
      <aside class="lg:col-span-1">
        <div class="bg-card rounded-xl p-3 sm:p-4 border border-card-border lg:sticky lg:top-24">
          <h3 class="font-display font-bold text-base sm:text-lg mb-3 sm:mb-4 text-txt px-2">Categories</h3>
          <nav class="space-y-1 grid grid-cols-2 lg:grid-cols-1 gap-1 sm:gap-0">
            {#each categories as category}
              <button
                on:click={() => selectedCategory = category.name}
                class="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-300 {selectedCategory === category.name ? 'bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20' : 'text-txt-muted hover:bg-bg hover:text-txt'}"
              >
                <span class="text-lg sm:text-xl">{category.icon}</span>
                <span class="font-medium text-xs sm:text-sm">{category.name}</span>
              </button>
            {/each}
          </nav>
        </div>
      </aside>

      <!-- FAQ Content -->
      <div class="lg:col-span-3">
        <div class="mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
          <span class="text-3xl sm:text-4xl">{categories.find(cat => cat.name === selectedCategory)?.icon}</span>
          <h2 class="font-display font-bold text-2xl sm:text-3xl text-txt">{selectedCategory}</h2>
        </div>

        <div class="space-y-4">
          {#each currentFaqs as faq, index}
            <div class="bg-card rounded-xl border border-card-border overflow-hidden transition-all duration-300 hover:border-gold/50">
              <button
                on:click={() => toggleFaq(selectedCategory, index)}
                class="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 class="font-display font-bold text-lg text-txt pr-4">
                  {faq.question}
                </h3>
                <span class="text-gold text-2xl transition-transform duration-300 flex-shrink-0" class:rotate-180={faq.open}>
                  ↓
                </span>
              </button>

              {#if faq.open}
                <div transition:slide={{ duration: 300 }} class="px-6 pb-6">
                  <p class="text-txt-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Still Have Questions -->
    <section class="mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl p-6 sm:p-8 lg:p-12 border border-gold/20 text-center">
      <h2 class="font-display font-bold text-2xl sm:text-3xl mb-3 sm:mb-4 text-txt">Still Have Questions?</h2>
      <p class="text-sm sm:text-base text-txt-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
        Can't find the answer you're looking for? Our support team is here to help you with any questions about our platform and services.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <a href="/contact" class="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20 hover:-translate-y-0.5 hover:shadow-gold/30 transition-all duration-300">
          Contact Support
        </a>
        <button class="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base bg-card text-txt border border-card-border hover:border-gold/50 transition-all duration-300">
          Schedule a Demo
        </button>
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
  .rotate-180 {
    transform: rotate(180deg);
  }
</style>
