<script>
  import { onMount } from 'svelte';

  let visible = false;
  onMount(() => {
    visible = true;
  });

  const upcomingEvents = [
    {
      title: 'ICE London 2024',
      date: '2024-04-08',
      endDate: '2024-04-10',
      location: 'ExCeL London, UK',
      type: 'Conference',
      description: 'Join us at the world\'s biggest gaming event. Visit our booth to see live demos of our latest platform features.',
      image: '/images/event/ice.jpg',
      status: 'Upcoming',
      booth: 'N5-220'
    },
    {
      title: 'SBC Summit',
      date: '2024-03-30',
      endDate: '2024-03-30',
      location: 'Lisbon, Portugal',
      type: 'Conference',
      description: 'Meet us at SBC Summit to discuss the latest trends in sports betting and casino gaming.',
      image: '/images/event/sbc-summit.jpg',
      status: 'Registration Open',
      booth: 'Platinum Sponsor'
    },
    {
      title: 'SiGMA Euro-Med',
      date: '2024-05-15',
      endDate: '2024-05-17',
      location: 'Malta',
      type: 'Conference',
      description: 'Network with industry leaders and explore the future of iGaming at this exclusive Mediterranean event.',
      image: '/images/news/11.png',
      status: 'Upcoming',
      booth: 'Gold Sponsor'
    },
    {
      title: 'SBWA Awards',
      date: '2024-04-20',
      endDate: '2024-04-20',
      location: 'London, UK',
      type: 'Awards',
      description: 'Celebrating excellence in sports betting and gaming industry innovation.',
      image: '/images/event/sbwa.jpg',
      status: 'Save the Date',
      booth: null
    }
  ];

  const pastEvents = [
    {
      title: 'SiGMA Europe 2023',
      date: '2023-11-13',
      endDate: '2023-11-16',
      location: 'Malta',
      type: 'Conference',
      description: 'Successfully showcased our platform to over 500 operators. Announced major partnerships and new game releases.',
      image: '/images/news/12.png',
      highlights: ['200+ meetings', '15 new partnerships', 'Best Booth Award']
    },
    {
      title: 'CasinoGame Annual Summit',
      date: '2023-10-05',
      endDate: '2023-10-05',
      location: 'Online',
      type: 'Summit',
      description: 'Our annual partner event brought together 300+ operators worldwide to discuss industry trends and platform roadmap.',
      image: '/images/news/13.jpg',
      highlights: ['300+ attendees', 'Platform 3.0 revealed', '10 expert speakers']
    },
    {
      title: 'G2E Las Vegas 2023',
      date: '2023-10-10',
      endDate: '2023-10-12',
      location: 'Las Vegas, USA',
      type: 'Conference',
      description: 'Massive presence at North America\'s premier gaming event with live demos and networking opportunities.',
      image: '/images/news/14.jpeg',
      highlights: ['Booth #1234', '150+ demos', 'Media coverage']
    }
  ];

  const eventTypes = ['All', 'Conference', 'Webinar', 'Product Launch', 'Summit'];
  let selectedType = 'All';

  $: filteredUpcoming = selectedType === 'All'
    ? upcomingEvents
    : upcomingEvents.filter(event => event.type === selectedType);
</script>

<svelte:head>
  <title>Events - CasinoGame</title>
</svelte:head>

<main class="relative pt-20 min-h-screen">
  <!-- Page-specific Background -->
  <div class="absolute inset-0 -z-10 pointer-events-none">
    <div class="absolute top-0 right-1/3 w-[950px] h-[950px] bg-gradient-to-bl from-pink-400/[0.11] via-purple-400/[0.08] to-transparent rounded-full blur-3xl opacity-50"></div>
    <div class="absolute bottom-1/3 left-0 w-[850px] h-[850px] bg-gradient-to-tr from-indigo-400/[0.10] via-violet-400/[0.06] to-transparent rounded-full blur-3xl opacity-45"></div>
    <div class="absolute top-1/2 right-0 w-[700px] h-[700px] bg-gradient-to-br from-fuchsia-400/[0.08] via-purple-500/[0.05] to-transparent rounded-full blur-3xl opacity-40"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16 lg:py-20">
    <!-- Hero Section -->
    <div class="text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-700" class:opacity-100={visible} class:opacity-0={!visible}>
      <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 bg-gradient-to-r from-gold via-gold-dark to-gold bg-clip-text text-transparent">
        Events & Conferences
      </h1>
      <p class="text-base sm:text-lg lg:text-xl text-txt-muted max-w-3xl mx-auto px-4">
        Meet us at industry events worldwide and stay connected with exclusive webinars
      </p>
    </div>

    <!-- Event Type Filter -->
    <div class="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center">
      {#each eventTypes as type}
        <button
          on:click={() => selectedType = type}
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 {selectedType === type ? 'bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20' : 'bg-card text-txt-muted border border-card-border hover:border-gold/50'}"
        >
          {type}
        </button>
      {/each}
    </div>

    <!-- Upcoming Events -->
    <section class="mb-12 sm:mb-16 lg:mb-20">
      <h2 class="font-display font-bold text-2xl sm:text-3xl mb-6 sm:mb-10 text-txt">Upcoming Events</h2>
      <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {#each filteredUpcoming as event}
          <div class="bg-card rounded-2xl overflow-hidden border border-card-border hover:border-gold/50 transition-all duration-300 group">
            <div class="h-64 overflow-hidden relative">
              <img src={event.image} alt={event.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1.5 bg-gold/90 backdrop-blur-sm text-bg text-xs rounded-lg font-semibold">
                  {event.status}
                </span>
              </div>
            </div>
            <div class="p-8">

            <h3 class="font-display font-bold text-2xl mb-3 text-txt group-hover:text-gold transition-colors">
              {event.title}
            </h3>

            <div class="space-y-2 mb-4">
              <div class="flex items-center gap-2 text-txt-muted">
                <span>📅</span>
                <span class="text-sm">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  {#if event.date !== event.endDate}
                    - {new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  {/if}
                </span>
              </div>
              <div class="flex items-center gap-2 text-txt-muted">
                <span>📍</span>
                <span class="text-sm">{event.location}</span>
              </div>
              {#if event.booth}
                <div class="flex items-center gap-2 text-txt-muted">
                  <span>🎯</span>
                  <span class="text-sm">{event.booth}</span>
                </div>
              {/if}
              <div class="flex items-center gap-2 text-txt-muted">
                <span>🏷️</span>
                <span class="text-sm">{event.type}</span>
              </div>
            </div>

            <p class="text-txt-muted mb-6">{event.description}</p>

            <button class="w-full px-6 py-3 rounded-lg font-semibold text-sm bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20 hover:-translate-y-0.5 hover:shadow-gold/30 transition-all duration-300">
              Register Interest
            </button>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Past Events -->
    <section class="mb-12 sm:mb-16 lg:mb-20">
      <h2 class="font-display font-bold text-2xl sm:text-3xl mb-6 sm:mb-10 text-txt">Past Events</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {#each pastEvents as event}
          <div class="bg-gradient-to-br from-card to-bg rounded-xl overflow-hidden border border-card-border">
            <div class="h-48 overflow-hidden">
              <img src={event.image} alt={event.title} class="w-full h-full object-cover" />
            </div>
            <div class="p-6">

            <h3 class="font-display font-bold text-lg mb-2 text-txt">
              {event.title}
            </h3>

            <div class="space-y-1.5 mb-4">
              <div class="flex items-center gap-2 text-txt-muted text-xs">
                <span>📅</span>
                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div class="flex items-center gap-2 text-txt-muted text-xs">
                <span>📍</span>
                <span>{event.location}</span>
              </div>
            </div>

            <p class="text-sm text-txt-muted mb-4">{event.description}</p>

            <div class="space-y-2">
              <div class="text-xs font-semibold text-gold mb-2">Highlights:</div>
              {#each event.highlights as highlight}
                <div class="flex items-center gap-2 text-xs text-txt-muted">
                  <span class="text-gold">✓</span>
                  <span>{highlight}</span>
                </div>
              {/each}
            </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Event Calendar CTA -->
    <section class="bg-gradient-to-br from-gold/5 to-transparent rounded-2xl p-6 sm:p-8 lg:p-12 border border-gold/20 text-center">
      <h2 class="font-display font-bold text-2xl sm:text-3xl mb-3 sm:mb-4 text-txt">Want to Meet Us?</h2>
      <p class="text-sm sm:text-base text-txt-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
        Schedule a meeting at any of our upcoming events or join our exclusive webinars to learn about our latest innovations
      </p>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <a href="/contact" class="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20 hover:-translate-y-0.5 hover:shadow-gold/30 transition-all duration-300">
          Schedule a Meeting
        </a>
        <button class="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base bg-card text-txt border border-card-border hover:border-gold/50 transition-all duration-300">
          Download Event Calendar
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
</style>
