<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;

	async function handleLogout() {
		try {
			await fetch('/admin/logout', { method: 'POST' });
			goto('/admin/login');
		} catch (error) {
			console.error('Logout error:', error);
		}
	}

	// ถ้าอยู่ในหน้า login ไม่แสดง layout
	$: isLoginPage = $page.url.pathname === '/admin/login';
</script>

{#if isLoginPage}
	<slot />
{:else}
	<div class="min-h-screen bg-gray-900">
		<!-- Admin Navbar -->
		<header class="bg-gray-800 border-b border-gray-700 sticky top-0 z-10 shadow-lg">
			<div class="max-w-[1600px] mx-auto px-6 py-4">
				<div class="flex items-center justify-between">
					<!-- Logo -->
					<div class="flex items-center gap-6">
						<a href="/admin">
							<img src="/images/logo-cg-game.png" alt="CasinoGame Admin" class="h-10 w-auto" />
						</a>
					</div>

					<!-- User Info & Logout -->
					<div class="flex items-center gap-4">
						{#if data?.user}
							<div class="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600">
								<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
									<span class="text-white text-sm font-semibold">
										{data.user.username.charAt(0).toUpperCase()}
									</span>
								</div>
								<div>
									<p class="text-sm font-medium text-white">{data.user.username}</p>
									<p class="text-xs text-gray-400 capitalize">{data.user.role}</p>
								</div>
							</div>
						{/if}
						<button
							on:click={handleLogout}
							class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition flex items-center gap-2"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								></path>
							</svg>
							Logout
						</button>
					</div>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<main class="max-w-[1600px] mx-auto px-6 py-8 lg:pt-16">
			<slot />
		</main>
	</div>
{/if}
