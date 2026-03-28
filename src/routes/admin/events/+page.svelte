<script>
	import { onMount } from 'svelte';

	let events = [];
	let pagination = {};
	let loading = false;
	let showCreateModal = false;

	// Form data
	let formData = {
		title: '',
		description: '',
		location: '',
		event_date: '',
		end_date: '',
		featured_image: '',
		status: 'upcoming',
		max_participants: null,
		author_id: 1 // Default author
	};

	onMount(async () => {
		await loadEvents();
	});

	async function loadEvents(page = 1) {
		loading = true;
		try {
			const response = await fetch(`/api/events?page=${page}&limit=10`);
			const data = await response.json();
			events = data.events || [];
			pagination = data.pagination || {};
		} catch (error) {
			console.error('Error loading events:', error);
			alert('ไม่สามารถโหลดข้อมูลได้');
		} finally {
			loading = false;
		}
	}

	async function createEvent() {
		try {
			const response = await fetch('/api/events', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (response.ok) {
				alert('สร้าง Event สำเร็จ');
				showCreateModal = false;
				resetForm();
				await loadEvents();
			} else {
				alert('Error: ' + result.error);
			}
		} catch (error) {
			console.error('Error creating event:', error);
			alert('เกิดข้อผิดพลาด');
		}
	}

	async function deleteEvent(id) {
		if (!confirm('คุณแน่ใจหรือไม่ที่จะลบ Event นี้?')) return;

		try {
			const response = await fetch(`/api/events/${id}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				alert('ลบ Event สำเร็จ');
				await loadEvents();
			} else {
				alert('ไม่สามารถลบได้');
			}
		} catch (error) {
			console.error('Error deleting event:', error);
			alert('เกิดข้อผิดพลาด');
		}
	}

	async function updateStatus(id, newStatus) {
		try {
			const response = await fetch(`/api/events/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: newStatus })
			});

			if (response.ok) {
				alert('อัพเดทสถานะสำเร็จ');
				await loadEvents();
			} else {
				alert('ไม่สามารถอัพเดทได้');
			}
		} catch (error) {
			console.error('Error updating status:', error);
			alert('เกิดข้อผิดพลาด');
		}
	}

	function resetForm() {
		formData = {
			title: '',
			description: '',
			location: '',
			event_date: '',
			end_date: '',
			featured_image: '',
			status: 'upcoming',
			max_participants: null,
			author_id: 1
		};
	}

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('th-TH', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="max-w-7xl mx-auto">
	<!-- Breadcrumb -->
	<div class="mb-6">
		<a href="/admin" class="text-sm text-gray-400 hover:text-white flex items-center gap-2 w-fit transition">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
			</svg>
			Back to Dashboard
		</a>
	</div>

	<div class="flex justify-between items-center mb-8">
		<div>
			<h1 class="text-3xl font-bold text-white mb-2">Manage Events</h1>
			<p class="text-gray-400">Manage events and activities</p>
		</div>
		<button
			on:click={() => (showCreateModal = true)}
			class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-5 rounded-lg transition flex items-center gap-2 shadow-sm"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
			</svg>
			Create Event
		</button>
	</div>

	{#if loading}
		<div class="text-center py-12">
			<div class="inline-flex items-center gap-3">
				<svg class="animate-spin h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<p class="text-gray-400">Loading data...</p>
			</div>
		</div>
	{:else if events.length === 0}
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
			<svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
			</svg>
			<p class="text-gray-400 mb-4">No events yet</p>
			<button
				on:click={() => (showCreateModal = true)}
				class="text-purple-400 hover:text-purple-300 font-medium"
			>
				Create First Event
			</button>
		</div>
	{:else}
		<!-- Events Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{#each events as event}
				<div class="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl hover:border-purple-500/50 transition">
					{#if event.featured_image}
						<img
							src={event.featured_image}
							alt={event.title}
							class="w-full h-48 object-cover"
						/>
					{:else}
						<div class="w-full h-48 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
							<span class="text-white text-xl font-bold">EVENT</span>
						</div>
					{/if}

					<div class="p-5">
						<div class="flex items-center justify-between mb-3">
							<span
								class="px-3 py-1 text-xs font-semibold rounded-full {event.status === 'upcoming'
									? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
									: event.status === 'ongoing'
										? 'bg-green-500/20 text-green-400 border border-green-500/30'
										: 'bg-gray-700 text-gray-300 border border-gray-600'}"
							>
								{event.status}
							</span>
							<span class="text-xs text-gray-500">by {event.author_name || 'Unknown'}</span>
						</div>

						<h3 class="text-xl font-bold mb-2 text-white">{event.title}</h3>

						<div class="space-y-2 mb-4">
							<div class="flex items-center text-sm text-gray-400">
								<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									></path>
								</svg>
								{formatDate(event.event_date)}
							</div>

							{#if event.location}
								<div class="flex items-center text-sm text-gray-400">
									<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										></path>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										></path>
									</svg>
									{event.location}
								</div>
							{/if}

							{#if event.max_participants}
								<div class="flex items-center text-sm text-gray-400">
									<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
										></path>
									</svg>
									Seats: {event.max_participants}
								</div>
							{/if}
						</div>

						<p class="text-sm text-gray-400 mb-4 line-clamp-2">{event.description}</p>

						<div class="flex gap-2">
							{#if event.status === 'upcoming'}
								<button
									on:click={() => updateStatus(event.id, 'ongoing')}
									class="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-3 rounded"
								>
									Start Event
								</button>
							{:else if event.status === 'ongoing'}
								<button
									on:click={() => updateStatus(event.id, 'completed')}
									class="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-2 px-3 rounded"
								>
									Complete
								</button>
							{/if}
							<button
								on:click={() => deleteEvent(event.id)}
								class="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-3 rounded"
							>
								ลบ
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Pagination -->
		{#if pagination.totalPages > 1}
			<div class="flex justify-center mt-8 gap-2">
				{#each Array(pagination.totalPages) as _, i}
					<button
						on:click={() => loadEvents(i + 1)}
						class="px-4 py-2 rounded-lg font-medium transition {pagination.page === i + 1
							? 'bg-purple-600 text-white shadow-sm'
							: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}"
					>
						{i + 1}
					</button>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<!-- Create Event Modal -->
{#if showCreateModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
		<div class="bg-white rounded-lg p-8 max-w-2xl w-full m-4">
			<h2 class="text-2xl font-bold mb-4">สร้าง Event ใหม่</h2>

			<form on:submit|preventDefault={createEvent}>
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
					<input
						type="text"
						bind:value={formData.title}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
					<textarea
						bind:value={formData.description}
						required
						rows="4"
						class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
					></textarea>
				</div>

				<div class="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
						<input
							type="datetime-local"
							bind:value={formData.event_date}
							required
							class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
						<input
							type="datetime-local"
							bind:value={formData.end_date}
							class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
						/>
					</div>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
					<input
						type="text"
						bind:value={formData.location}
						placeholder="Bangkok, Thailand"
						class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">Max Participants (Optional)</label>
					<input
						type="number"
						bind:value={formData.max_participants}
						min="1"
						placeholder="100"
						class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
					<input
						type="text"
						bind:value={formData.featured_image}
						placeholder="https://example.com/image.jpg"
						class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				<div class="mb-6">
					<label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
					<select
						bind:value={formData.status}
						class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
					>
						<option value="upcoming">Upcoming</option>
						<option value="ongoing">Ongoing</option>
						<option value="completed">Completed</option>
						<option value="cancelled">Cancelled</option>
					</select>
				</div>

				<div class="flex gap-4">
					<button
						type="submit"
						class="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
					>
						สร้าง
					</button>
					<button
						type="button"
						on:click={() => {
							showCreateModal = false;
							resetForm();
						}}
						class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
					>
						ยกเลิก
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
