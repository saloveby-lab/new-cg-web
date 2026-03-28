<script>
  import { onMount } from 'svelte';

  export let data;

  let visible = false;
  onMount(() => {
    visible = true;
  });

  $: article = data.article;
</script>

<svelte:head>
  <title>{article.title} - CasinoGame News</title>
</svelte:head>

<main class="relative pt-20 min-h-screen">
  <!-- Page-specific Background -->
  <div class="absolute inset-0 -z-10 pointer-events-none">
    <div class="absolute top-40 left-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-orange-400/[0.12] via-gold/[0.10] to-transparent rounded-full blur-3xl opacity-50"></div>
    <div class="absolute bottom-20 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-amber-400/[0.10] via-yellow-400/[0.06] to-transparent rounded-full blur-3xl opacity-45"></div>
  </div>

  <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-txt-muted mb-8 reveal">
      <a href="/" class="hover:text-gold transition-colors">Home</a>
      <span>→</span>
      <a href="/news" class="hover:text-gold transition-colors">News</a>
      <span>→</span>
      <span class="text-txt">{article.title}</span>
    </nav>

    <!-- Article Header -->
    <article class="reveal">
      <!-- Category Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-xs font-semibold text-gold uppercase tracking-wider mb-6">
        <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
        {article.category}
      </div>

      <!-- Title -->
      <h1 class="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-6 text-txt leading-tight transition-all duration-700" class:opacity-100={visible} class:opacity-0={!visible}>
        {article.title}
      </h1>

      <!-- Meta Info -->
      <div class="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-txt-muted mb-8">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <span class="text-bg text-xs font-bold">{article.author.charAt(0)}</span>
          </div>
          <span>{article.author}</span>
        </div>
        <div class="flex items-center gap-2">
          <span>📅</span>
          <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div class="flex items-center gap-2">
          <span>⏱️</span>
          <span>{article.readTime}</span>
        </div>
      </div>

      <!-- Featured Image -->
      <div class="relative rounded-2xl overflow-hidden mb-12 group">
        <img src={article.image} alt={article.title} class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <!-- Article Content -->
      <div class="prose prose-invert prose-lg max-w-none">
        <div class="text-xl text-txt-muted leading-relaxed mb-8 font-medium">
          {article.excerpt}
        </div>

        <div class="article-content text-txt-muted leading-relaxed space-y-6">
          {@html article.content}
        </div>
      </div>

      <!-- Share Buttons -->
      <div class="mt-12 pt-8 border-t border-card-border">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 class="text-sm font-semibold text-txt mb-3">Share this article</h3>
            <div class="flex gap-3">
              <button class="w-10 h-10 rounded-lg bg-card border border-card-border hover:border-gold/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <span class="text-lg">𝕏</span>
              </button>
              <button class="w-10 h-10 rounded-lg bg-card border border-card-border hover:border-gold/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <span class="text-lg">in</span>
              </button>
              <button class="w-10 h-10 rounded-lg bg-card border border-card-border hover:border-gold/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <span class="text-lg">📧</span>
              </button>
              <button class="w-10 h-10 rounded-lg bg-card border border-card-border hover:border-gold/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <span class="text-lg">🔗</span>
              </button>
            </div>
          </div>

          <a href="/news" class="px-6 py-3 rounded-lg font-semibold text-sm bg-card text-txt border border-card-border hover:border-gold/50 transition-all duration-300 hover:-translate-y-0.5">
            ← Back to News
          </a>
        </div>
      </div>
    </article>

    <!-- Related Articles -->
    {#if article.relatedNews && article.relatedNews.length > 0}
      <section class="mt-16 sm:mt-20 lg:mt-24 reveal">
        <h2 class="font-display font-bold text-2xl sm:text-3xl mb-8 text-txt">Related Articles</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each article.relatedNews as related}
            <a href="/news/{related.id}" class="group bg-card rounded-xl overflow-hidden border border-card-border hover:border-gold/50 transition-all duration-300">
              <div class="h-40 overflow-hidden">
                <img src={related.image} alt={related.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div class="p-5">
                <h3 class="font-display font-bold text-base text-txt group-hover:text-gold transition-colors line-clamp-2">
                  {related.title}
                </h3>
                <div class="mt-3 text-gold font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More <span>→</span>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Newsletter CTA -->
    <section class="mt-16 sm:mt-20 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl p-8 sm:p-10 lg:p-12 border border-gold/20 text-center reveal">
      <h2 class="font-display font-bold text-2xl sm:text-3xl mb-4 text-txt">Stay Updated</h2>
      <p class="text-txt-muted mb-6 max-w-xl mx-auto">
        Subscribe to our newsletter for the latest news, product updates, and industry insights
      </p>
      <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          class="flex-1 px-4 py-3 bg-bg border border-card-border rounded-lg text-txt placeholder:text-txt-muted focus:outline-none focus:border-gold transition-colors"
        />
        <button class="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20 hover:-translate-y-0.5 hover:shadow-gold/30 transition-all duration-300 whitespace-nowrap">
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

  :global(.article-content h2) {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--txt);
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-family: 'Space Grotesk', sans-serif;
  }

  :global(.article-content h3) {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--txt);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  :global(.article-content p) {
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }

  :global(.article-content ul) {
    list-style: none;
    padding-left: 0;
    margin-bottom: 1.5rem;
  }

  :global(.article-content ul li) {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  :global(.article-content ul li::before) {
    content: "✓";
    position: absolute;
    left: 0;
    color: #D4A853;
    font-weight: bold;
  }

  :global(.article-content a) {
    color: #D4A853;
    text-decoration: underline;
    transition: color 0.3s;
  }

  :global(.article-content a:hover) {
    color: #E5C070;
  }
</style>
