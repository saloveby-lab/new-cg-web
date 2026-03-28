<script>
  import { onMount } from 'svelte';

  export let data;

  let visible = false;
  onMount(() => {
    visible = true;
  });

  // Transform database news to match UI format
  $: news = (data.news || []).map(item => ({
    id: item.slug,
    title: item.title,
    date: item.published_at || item.created_at,
    category: item.category || 'News',
    excerpt: item.excerpt || item.content.substring(0, 150) + '...',
    image: item.featured_image || '/images/news/default.png',
    featured: item.featured === 1 || item.featured === true
  }));

  // Extract unique categories from news
  $: uniqueCategories = [...new Set(news.map(n => n.category))];
  $: categories = ['All', ...uniqueCategories];

  let selectedCategory = 'All';

  $: filteredNews = selectedCategory === 'All'
    ? news
    : news.filter(item => item.category === selectedCategory);
</script>

<svelte:head>
  <title>News - CasinoGame</title>
</svelte:head>

<main class="relative pt-20 min-h-screen">
  <!-- Page-specific Background -->
  <div class="absolute inset-0 -z-10 pointer-events-none">
    <div class="absolute top-40 left-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-orange-400/[0.12] via-gold/[0.10] to-transparent rounded-full blur-3xl opacity-50"></div>
    <div class="absolute bottom-20 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-amber-400/[0.10] via-yellow-400/[0.06] to-transparent rounded-full blur-3xl opacity-45"></div>
    <div class="absolute top-1/3 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-gold-dark/[0.08] via-amber-500/[0.05] to-transparent rounded-full blur-3xl opacity-40"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16 lg:py-20">
    <!-- Hero Section -->
    <div class="text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-700" class:opacity-100={visible} class:opacity-0={!visible}>
      <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 bg-gradient-to-r from-gold via-gold-dark to-gold bg-clip-text text-transparent">
        Latest News
      </h1>
      <p class="text-base sm:text-lg lg:text-xl text-txt-muted max-w-3xl mx-auto px-4">
        Stay updated with the latest developments, partnerships, and innovations from CasinoGame
      </p>
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center">
      {#each categories as category}
        <button
          on:click={() => selectedCategory = category}
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 {selectedCategory === category ? 'bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20' : 'bg-card text-txt-muted border border-card-border hover:border-gold/50'}"
        >
          {category}
        </button>
      {/each}
    </div>

    <!-- Featured News -->
    {#if selectedCategory === 'All'}
      <section class="mb-12 sm:mb-16">
        <h2 class="font-display font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-txt">Featured Stories</h2>
        <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {#each news.filter(n => n.featured) as article}
            <a href="/news/{article.id}" class="bg-card rounded-2xl overflow-hidden border border-card-border hover:border-gold/50 transition-all duration-300 group cursor-pointer block">
              <div class="h-64 overflow-hidden">
                <img src={article.image} alt={article.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div class="p-8">
                <div class="flex items-center gap-3 mb-4">
                  <span class="px-3 py-1 bg-gold/10 text-gold text-xs rounded-lg border border-gold/20">
                    {article.category}
                  </span>
                  <span class="text-sm text-txt-muted">{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h3 class="font-display font-bold text-2xl mb-4 text-txt group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
                <p class="text-txt-muted mb-6">{article.excerpt}</p>
                <span class="text-gold font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More <span>→</span>
                </span>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}

    <!-- All News -->
    <section>
      <h2 class="font-display font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-txt">
        {selectedCategory === 'All' ? 'Recent Updates' : selectedCategory}
      </h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {#each filteredNews.filter(n => !n.featured || selectedCategory !== 'All') as article}
          <a href="/news/{article.id}" class="bg-card rounded-xl overflow-hidden border border-card-border hover:border-gold/50 transition-all duration-300 group cursor-pointer block">
            <div class="h-48 overflow-hidden">
              <img src={article.image} alt={article.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-2.5 py-0.5 bg-gold/10 text-gold text-xs rounded border border-gold/20">
                {article.category}
              </span>
              <span class="text-xs text-txt-muted">{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h3 class="font-display font-bold text-lg mb-3 text-txt group-hover:text-gold transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p class="text-sm text-txt-muted mb-4 line-clamp-3">{article.excerpt}</p>
            <span class="text-gold font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              Read More <span>→</span>
            </span>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl p-6 sm:p-8 lg:p-12 border border-gold/20 text-center">
      <h2 class="font-display font-bold text-2xl sm:text-3xl mb-3 sm:mb-4 text-txt">Stay in the Loop</h2>
      <p class="text-sm sm:text-base text-txt-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
        Subscribe to our newsletter and never miss an update about new features, partnerships, and industry insights
      </p>
      <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          class="flex-1 px-4 py-2.5 sm:py-3 bg-bg border border-card-border rounded-lg text-txt placeholder:text-txt-muted focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
        />
        <button class="px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20 hover:-translate-y-0.5 hover:shadow-gold/30 transition-all duration-300 whitespace-nowrap">
          Subscribe
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
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
