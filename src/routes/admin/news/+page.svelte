<script>
	import { onMount } from 'svelte';

	let news = [];
	let pagination = {};
	let loading = false;
	let showCreateModal = false;
	let showEditModal = false;
	let editingNews = null;

	// Form data
	let formData = {
		title: '',
		content: '',
		excerpt: '',
		featured_image: '',
		category: 'Company News',
		featured: false,
		author_id: 1, // Default author
		status: 'draft'
	};

	// Available categories
	const categories = [
		'Company News',
		'Product Launch',
		'Partnership',
		'Technology',
		'Regulatory',
		'Product Update',
		'Awards',
		'Events'
	];

	onMount(async () => {
		await loadNews();
	});

	async function loadNews(page = 1) {
		loading = true;
		try {
			const response = await fetch(`/api/news?page=${page}&limit=10`);
			const data = await response.json();
			news = data.news || [];
			pagination = data.pagination || {};
		} catch (error) {
			console.error('Error loading news:', error);
			alert('ไม่สามารถโหลดข้อมูลได้');
		} finally {
			loading = false;
		}
	}

	async function createNews() {
		try {
			const response = await fetch('/api/news', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (response.ok) {
				alert('News created successfully');
				showCreateModal = false;
				resetForm();
				await loadNews();
			} else {
				alert('Error: ' + result.error);
			}
		} catch (error) {
			console.error('Error creating news:', error);
			alert('เกิดข้อผิดพลาด');
		}
	}

	async function deleteNews(id) {
		if (!confirm('Are you sure you want to delete this news?')) return;

		try {
			const response = await fetch(`/api/news/${id}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				alert('News deleted successfully');
				await loadNews();
			} else {
				alert('Failed to delete');
			}
		} catch (error) {
			console.error('Error deleting news:', error);
			alert('An error occurred');
		}
	}

	async function updateStatus(id, newStatus) {
		try {
			const response = await fetch(`/api/news/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: newStatus })
			});

			if (response.ok) {
				alert('อัพเดทสถานะสำเร็จ');
				await loadNews();
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
			content: '',
			excerpt: '',
			featured_image: '',
			category: 'Company News',
			featured: false,
			author_id: 1,
			status: 'draft'
		};
	}

	function openEditModal(item) {
		editingNews = item;
		formData = {
			title: item.title,
			content: item.content,
			excerpt: item.excerpt || '',
			featured_image: item.featured_image || '',
			category: item.category || 'Company News',
			featured: item.featured ? true : false,
			author_id: item.author_id,
			status: item.status
		};
		showEditModal = true;
	}

	async function updateNews() {
		try {
			const response = await fetch(`/api/news/${editingNews.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (response.ok) {
				alert('News updated successfully');
				showEditModal = false;
				editingNews = null;
				resetForm();
				await loadNews();
			} else {
				alert('Error: ' + result.error);
			}
		} catch (error) {
			console.error('Error updating news:', error);
			alert('An error occurred');
		}
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
			<h1 class="text-3xl font-bold text-white mb-2">Manage News</h1>
			<p class="text-gray-400">Manage news articles and posts</p>
		</div>
		<button
			on:click={() => (showCreateModal = true)}
			class="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition flex items-center gap-2 shadow-sm"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
			</svg>
			Create News
		</button>
	</div>

	{#if loading}
		<div class="text-center py-12">
			<div class="inline-flex items-center gap-3">
				<svg class="animate-spin h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<p class="text-gray-400">Loading data...</p>
			</div>
		</div>
	{:else if news.length === 0}
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
			<svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
			</svg>
			<p class="text-gray-400 mb-4">No news articles yet</p>
			<button
				on:click={() => (showCreateModal = true)}
				class="text-green-400 hover:text-green-300 font-medium"
			>
				Create First News
			</button>
		</div>
	{:else}
		<!-- News Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each news as item}
				<div class="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl hover:border-green-500/50 transition">
					{#if item.featured_image}
						<img
							src={item.featured_image}
							alt={item.title}
							class="w-full h-48 object-cover"
						/>
					{:else}
						<div class="w-full h-48 bg-gray-200 flex items-center justify-center">
							<span class="text-gray-400">No Image</span>
						</div>
					{/if}

					<div class="p-4">
						<div class="flex items-center justify-between mb-2 gap-2">
							<div class="flex items-center gap-2 flex-wrap">
								<span
									class="px-2 py-1 text-xs font-semibold rounded {item.status === 'published'
										? 'bg-green-500/20 text-green-400 border border-green-500/30'
										: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}"
								>
									{item.status}
								</span>
								{#if item.category}
									<span class="px-2 py-1 text-xs font-semibold rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
										{item.category}
									</span>
								{/if}
								{#if item.featured}
									<span class="px-2 py-1 text-xs font-semibold rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
										⭐ Featured
									</span>
								{/if}
							</div>
							<span class="text-xs text-gray-500 whitespace-nowrap">by {item.author_name || 'Unknown'}</span>
						</div>

						<h3 class="text-lg font-semibold mb-2 line-clamp-2 text-white">{item.title}</h3>
						<p class="text-sm text-gray-400 mb-4 line-clamp-3">{item.excerpt || item.content}</p>

						<div class="flex gap-2">
							<button
								on:click={() => openEditModal(item)}
								class="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-3 rounded"
							>
								Edit
							</button>
							{#if item.status === 'draft'}
								<button
									on:click={() => updateStatus(item.id, 'published')}
									class="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-3 rounded"
								>
									Publish
								</button>
							{:else}
								<button
									on:click={() => updateStatus(item.id, 'draft')}
									class="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-3 rounded"
								>
									Unpublish
								</button>
							{/if}
							<button
								on:click={() => deleteNews(item.id)}
								class="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-3 rounded"
							>
								Delete
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
						on:click={() => loadNews(i + 1)}
						class="px-4 py-2 rounded-lg font-medium transition {pagination.page === i + 1
							? 'bg-green-600 text-white shadow-sm'
							: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}"
					>
						{i + 1}
					</button>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<!-- Create News Modal -->
{#if showCreateModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
		<div class="bg-gray-800 rounded-lg p-8 max-w-2xl w-full m-4 border border-gray-700">
			<h2 class="text-2xl font-bold mb-4 text-white">Create New News</h2>

			<form on:submit|preventDefault={createNews}>
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Title</label>
					<input
						type="text"
						bind:value={formData.title}
						required
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Excerpt (Summary)</label>
					<textarea
						bind:value={formData.excerpt}
						rows="2"
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
					></textarea>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Content</label>
					<textarea
						bind:value={formData.content}
						required
						rows="6"
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
					></textarea>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Featured Image URL</label>
					<input
						type="text"
						bind:value={formData.featured_image}
						placeholder="https://example.com/image.jpg"
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
					/>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Category</label>
					<select
						bind:value={formData.category}
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
					>
						{#each categories as cat}
							<option value={cat}>{cat}</option>
						{/each}
					</select>
				</div>

				<div class="mb-4">
					<label class="flex items-center gap-3 cursor-pointer">
						<input
							type="checkbox"
							bind:checked={formData.featured}
							class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-green-500"
						/>
						<span class="text-sm font-medium text-gray-300">Featured Story (Show on homepage)</span>
					</label>
				</div>

				<div class="mb-6">
					<label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
					<select
						bind:value={formData.status}
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
					>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
					</select>
				</div>

				<div class="flex gap-4">
					<button
						type="submit"
						class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
					>
						Create
					</button>
					<button
						type="button"
						on:click={() => {
							showCreateModal = false;
							resetForm();
						}}
						class="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Edit News Modal -->
{#if showEditModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
		<div class="bg-gray-800 rounded-lg p-8 max-w-2xl w-full m-4 border border-gray-700">
			<h2 class="text-2xl font-bold mb-4 text-white">Edit News</h2>

			<form on:submit|preventDefault={updateNews}>
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Title</label>
					<input
						type="text"
						bind:value={formData.title}
						required
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Excerpt (Summary)</label>
					<textarea
						bind:value={formData.excerpt}
						rows="2"
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					></textarea>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Content</label>
					<textarea
						bind:value={formData.content}
						required
						rows="8"
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
					></textarea>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Featured Image URL</label>
					<input
						type="text"
						bind:value={formData.featured_image}
						placeholder="https://example.com/image.jpg"
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
					/>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Category</label>
					<select
						bind:value={formData.category}
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{#each categories as cat}
							<option value={cat}>{cat}</option>
						{/each}
					</select>
				</div>

				<div class="mb-4">
					<label class="flex items-center gap-3 cursor-pointer">
						<input
							type="checkbox"
							bind:checked={formData.featured}
							class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
						/>
						<span class="text-sm font-medium text-gray-300">Featured Story (Show on homepage)</span>
					</label>
				</div>

				<div class="mb-6">
					<label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
					<select
						bind:value={formData.status}
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
					</select>
				</div>

				<div class="flex gap-4">
					<button
						type="submit"
						class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
					>
						Update
					</button>
					<button
						type="button"
						on:click={() => {
							showEditModal = false;
							editingNews = null;
							resetForm();
						}}
						class="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded"
					>
						Cancel
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
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
