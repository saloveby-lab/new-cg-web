<script>
	import { goto } from '$app/navigation';
</script>

<div class="max-w-5xl mx-auto">
	<h1 class="text-3xl font-bold mb-8 text-white">Dashboard</h1>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<!-- Users Card -->
		<a
			href="/admin/users"
			class="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl p-6 transition-all border border-gray-700 hover:border-blue-500 group"
		>
			<div class="flex items-center gap-4 mb-3">
				<div class="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition">
					<svg class="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
						></path>
					</svg>
				</div>
				<div>
					<h2 class="text-xl font-semibold text-white group-hover:text-blue-400 transition">Users</h2>
					<p class="text-sm text-gray-400">Manage users</p>
				</div>
			</div>
		</a>

		<!-- News Card -->
		<a
			href="/admin/news"
			class="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl p-6 transition-all border border-gray-700 hover:border-green-500 group"
		>
			<div class="flex items-center gap-4 mb-3">
				<div class="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition">
					<svg class="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
						></path>
					</svg>
				</div>
				<div>
					<h2 class="text-xl font-semibold text-white group-hover:text-green-400 transition">News</h2>
					<p class="text-sm text-gray-400">Manage news</p>
				</div>
			</div>
		</a>

		<!-- Events Card -->
		<a
			href="/admin/events"
			class="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl p-6 transition-all border border-gray-700 hover:border-purple-500 group"
		>
			<div class="flex items-center gap-4 mb-3">
				<div class="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition">
					<svg class="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						></path>
					</svg>
				</div>
				<div>
					<h2 class="text-xl font-semibold text-white group-hover:text-purple-400 transition">Events</h2>
					<p class="text-sm text-gray-400">Manage events</p>
				</div>
			</div>
		</a>
	</div>
</div>
