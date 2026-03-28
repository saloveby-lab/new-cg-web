<script>
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let error = '';
	let loading = false;

	async function handleLogin() {
		error = '';
		loading = true;

		try {
			const response = await fetch('/admin/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			const result = await response.json();

			if (response.ok) {
				// Login สำเร็จ redirect ไป admin
				goto('/admin');
			} else {
				error = result.error || 'Login failed';
			}
		} catch (err) {
			error = 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Login - CasinoGame</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 lg:pt-16">
	<div class="max-w-md w-full space-y-8">
		<!-- Logo -->
		<div class="text-center">
			<!-- <img src="/images/logo-cg-game.png" alt="CasinoGame Logo" class="h-16 w-auto mx-auto mb-6" /> -->
			<h2 class="text-3xl font-bold text-white">Admin Panel</h2>
			<p class="mt-2 text-sm text-gray-400">Sign in to manage backend</p>
		</div>

		<!-- Login Form -->
		<div class="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
			<form on:submit|preventDefault={handleLogin} class="space-y-6">
				{#if error}
					<div class="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
						{error}
					</div>
				{/if}

				<div>
					<label for="username" class="block text-sm font-medium text-gray-300 mb-2">
						Username
					</label>
					<input
						id="username"
						type="text"
						bind:value={username}
						required
						autocomplete="username"
						class="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
						placeholder="Enter your username"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-300 mb-2">
						Password
					</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						autocomplete="current-password"
						class="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
						placeholder="Enter your password"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
				>
					{#if loading}
						<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Signing in...
					{:else}
						Sign In
					{/if}
				</button>
			</form>
		</div>

		<!-- Back to Website -->
		<div class="text-center">
			<a href="/" class="text-sm text-gray-400 hover:text-white transition flex items-center justify-center gap-2">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				Back to Website
			</a>
		</div>

		<!-- Default Credentials Info -->
		<div class="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
			<p class="text-xs text-gray-400 mb-2">Default Credentials:</p>
			<div class="space-y-1">
				<p class="text-sm text-gray-300 font-mono">Username: <span class="text-blue-400">admin</span></p>
				<p class="text-sm text-gray-300 font-mono">Password: <span class="text-blue-400">admin123</span></p>
			</div>
		</div>
	</div>
</div>
