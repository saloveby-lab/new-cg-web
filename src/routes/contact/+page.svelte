<script>
  import { onMount } from 'svelte';

  let visible = false;
  onMount(() => {
    visible = true;
  });

  let formData = {
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  };

  const subjects = [
    'General Inquiry',
    'White Label Solution',
    'API Integration',
    'Custom Development',
    'Partnership Opportunity',
    'Technical Support',
    'Other'
  ];

  const offices = [
    {
      city: 'London',
      country: 'United Kingdom',
      address: '123 Gaming Street, London, UK EC1A 1BB',
      phone: '+44 20 1234 5678',
      email: 'london@casinogame.com',
      icon: '🇬🇧'
    },
    {
      city: 'Malta',
      country: 'Malta',
      address: '456 Bay Street, Sliema, Malta SLM 1234',
      phone: '+356 2123 4567',
      email: 'malta@casinogame.com',
      icon: '🇲🇹'
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '789 Marina Boulevard, Singapore 018956',
      phone: '+65 6123 4567',
      email: 'singapore@casinogame.com',
      icon: '🇸🇬'
    }
  ];

  const contactMethods = [
    {
      title: 'Email Us',
      description: 'Get in touch via email for detailed inquiries',
      value: 'info@casinogame.com',
      icon: '📧',
      action: 'mailto:info@casinogame.com'
    },
    {
      title: 'Call Us',
      description: '24/7 phone support for urgent matters',
      value: '+44 20 1234 5678',
      icon: '📞',
      action: 'tel:+442012345678'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our team in real-time',
      value: 'Start Chat',
      icon: '💬',
      action: '#'
    },
    {
      title: 'Schedule Meeting',
      description: 'Book a video call with our experts',
      value: 'Book Now',
      icon: '📅',
      action: '#'
    }
  ];

  function handleSubmit() {
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
  }
</script>

<svelte:head>
  <title>Contact Us - CasinoGame</title>
</svelte:head>

<main class="relative pt-20 min-h-screen">
  <!-- Page-specific Background -->
  <div class="absolute inset-0 -z-10 pointer-events-none">
    <div class="absolute top-0 left-1/3 w-[950px] h-[950px] bg-gradient-to-br from-gold/[0.14] via-amber-400/[0.10] to-transparent rounded-full blur-3xl opacity-50"></div>
    <div class="absolute bottom-1/4 right-0 w-[850px] h-[850px] bg-gradient-to-tl from-cyan/[0.11] via-teal-400/[0.07] to-transparent rounded-full blur-3xl opacity-45"></div>
    <div class="absolute top-1/2 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-blue-400/[0.08] via-cyan/[0.05] to-transparent rounded-full blur-3xl opacity-40"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16 lg:py-20">
    <!-- Hero Section -->
    <div class="text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-700" class:opacity-100={visible} class:opacity-0={!visible}>
      <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 bg-gradient-to-r from-gold via-gold-dark to-gold bg-clip-text text-transparent">
        Get in Touch
      </h1>
      <p class="text-base sm:text-lg lg:text-xl text-txt-muted max-w-3xl mx-auto px-4">
        Ready to start your iGaming journey? Our team is here to help you succeed
      </p>
    </div>

    <!-- Contact Methods -->
    <section class="mb-12 sm:mb-16 lg:mb-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {#each contactMethods as method}
          <a
            href={method.action}
            class="bg-card rounded-xl p-4 sm:p-6 border border-card-border hover:border-gold/50 transition-all duration-300 group text-center"
          >
            <div class="text-3xl sm:text-5xl mb-3 sm:mb-4">{method.icon}</div>
            <h3 class="font-display font-bold text-sm sm:text-lg mb-1 sm:mb-2 text-txt group-hover:text-gold transition-colors">
              {method.title}
            </h3>
            <p class="text-xs sm:text-sm text-txt-muted mb-2 sm:mb-3 hidden sm:block">{method.description}</p>
            <div class="text-gold font-semibold text-xs sm:text-sm">{method.value}</div>
          </a>
        {/each}
      </div>
    </section>

    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
      <!-- Contact Form -->
      <div>
        <h2 class="font-display font-bold text-2xl sm:text-3xl mb-6 sm:mb-8 text-txt">Send us a Message</h2>
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-txt mb-2">Full Name *</label>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                required
                class="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-txt placeholder:text-txt-muted focus:outline-none focus:border-gold transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-txt mb-2">Email *</label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                required
                class="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-txt placeholder:text-txt-muted focus:outline-none focus:border-gold transition-colors"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="company" class="block text-sm font-medium text-txt mb-2">Company</label>
              <input
                type="text"
                id="company"
                bind:value={formData.company}
                class="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-txt placeholder:text-txt-muted focus:outline-none focus:border-gold transition-colors"
                placeholder="Your Company"
              />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-txt mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                bind:value={formData.phone}
                class="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-txt placeholder:text-txt-muted focus:outline-none focus:border-gold transition-colors"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div>
            <label for="subject" class="block text-sm font-medium text-txt mb-2">Subject *</label>
            <select
              id="subject"
              bind:value={formData.subject}
              required
              class="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-txt focus:outline-none focus:border-gold transition-colors"
            >
              {#each subjects as subject}
                <option value={subject}>{subject}</option>
              {/each}
            </select>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-txt mb-2">Message *</label>
            <textarea
              id="message"
              bind:value={formData.message}
              required
              rows="6"
              class="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-txt placeholder:text-txt-muted focus:outline-none focus:border-gold transition-colors resize-none"
              placeholder="Tell us about your project..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20 hover:-translate-y-0.5 hover:shadow-gold/30 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      <!-- Office Locations -->
      <div>
        <h2 class="font-display font-bold text-2xl sm:text-3xl mb-6 sm:mb-8 text-txt">Our Offices</h2>
        <div class="space-y-4 sm:space-y-6">
          {#each offices as office}
            <div class="bg-card rounded-xl p-6 border border-card-border hover:border-gold/50 transition-all duration-300">
              <div class="flex items-start gap-4">
                <div class="text-4xl">{office.icon}</div>
                <div class="flex-1">
                  <h3 class="font-display font-bold text-xl mb-1 text-txt">
                    {office.city}
                  </h3>
                  <p class="text-sm text-txt-muted mb-4">{office.country}</p>

                  <div class="space-y-2">
                    <div class="flex items-start gap-2 text-sm text-txt-muted">
                      <span class="mt-0.5">📍</span>
                      <span>{office.address}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-txt-muted">
                      <span>📞</span>
                      <a href="tel:{office.phone.replace(/\s/g, '')}" class="hover:text-gold transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-txt-muted">
                      <span>📧</span>
                      <a href="mailto:{office.email}" class="hover:text-gold transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Business Hours -->
        <div class="mt-8 bg-gradient-to-br from-gold/5 to-transparent rounded-xl p-6 border border-gold/20">
          <h3 class="font-display font-bold text-lg mb-4 text-txt">Business Hours</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between text-txt-muted">
              <span>Monday - Friday:</span>
              <span class="text-txt font-medium">9:00 AM - 6:00 PM</span>
            </div>
            <div class="flex justify-between text-txt-muted">
              <span>Saturday:</span>
              <span class="text-txt font-medium">10:00 AM - 4:00 PM</span>
            </div>
            <div class="flex justify-between text-txt-muted">
              <span>Sunday:</span>
              <span class="text-txt font-medium">Closed</span>
            </div>
            <div class="mt-4 pt-4 border-t border-gold/20">
              <div class="flex items-center gap-2 text-gold">
                <span>⚡</span>
                <span class="font-semibold">24/7 Technical Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Link -->
    <section class="bg-card rounded-2xl p-6 sm:p-8 lg:p-12 border border-card-border text-center">
      <h2 class="font-display font-bold text-2xl sm:text-3xl mb-3 sm:mb-4 text-txt">Looking for Quick Answers?</h2>
      <p class="text-sm sm:text-base text-txt-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
        Check out our FAQ section for instant answers to common questions about our platform and services
      </p>
      <a href="/faqs" class="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base bg-gradient-to-r from-gold to-gold-dark text-bg shadow-lg shadow-gold/20 hover:-translate-y-0.5 hover:shadow-gold/30 transition-all duration-300">
        Visit FAQs
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
