<script>
	import { onMount } from 'svelte';

	let users = [];
	let pagination = {};
	let loading = false;
	let showCreateModal = false;

	// Form data
	let formData = {
		username: '',
		email: '',
		password: '',
		role: 'user'
	};

	onMount(async () => {
		await loadUsers();
	});

	async function loadUsers(page = 1) {
		loading = true;
		try {
			const response = await fetch(`/api/users?page=${page}&limit=10`);
			const data = await response.json();
			users = data.users || [];
			pagination = data.pagination || {};
		} catch (error) {
			console.error('Error loading users:', error);
			alert('ไม่สามารถโหลดข้อมูลได้');
		} finally {
			loading = false;
		}
	}

	async function createUser() {
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (response.ok) {
				alert('สร้าง User สำเร็จ');
				showCreateModal = false;
				resetForm();
				await loadUsers();
			} else {
				alert('Error: ' + result.error);
			}
		} catch (error) {
			console.error('Error creating user:', error);
			alert('เกิดข้อผิดพลาด');
		}
	}

	async function deleteUser(id) {
		if (!confirm('คุณแน่ใจหรือไม่ที่จะลบ User นี้?')) return;

		try {
			const response = await fetch(`/api/users/${id}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				alert('ลบ User สำเร็จ');
				await loadUsers();
			} else {
				alert('ไม่สามารถลบได้');
			}
		} catch (error) {
			console.error('Error deleting user:', error);
			alert('เกิดข้อผิดพลาด');
		}
	}

	function resetForm() {
		formData = {
			username: '',
			email: '',
			password: '',
			role: 'user'
		};
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
			<h1 class="text-3xl font-bold text-white mb-2">Manage Users</h1>
			<p class="text-gray-400">Manage user accounts in the system</p>
		</div>
		<button
			on:click={() => (showCreateModal = true)}
			class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition flex items-center gap-2 shadow-sm"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
			</svg>
			Create User
		</button>
	</div>

	{#if loading}
		<div class="text-center py-12">
			<div class="inline-flex items-center gap-3">
				<svg class="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<p class="text-gray-400">Loading data...</p>
			</div>
		</div>
	{:else if users.length === 0}
		<div class="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-12 text-center">
			<svg class="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
			</svg>
			<p class="text-gray-400 mb-4">No users in the system yet</p>
			<button
				on:click={() => (showCreateModal = true)}
				class="text-blue-400 hover:text-blue-300 font-medium"
			>
				Create First User
			</button>
		</div>
	{:else}
		<!-- Users Table -->
		<div class="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
			<table class="min-w-full divide-y divide-gray-700">
				<thead class="bg-gray-900">
					<tr>
						<th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">ID</th>
						<th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Username</th>
						<th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
						<th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Role</th>
						<th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
							Created At
						</th>
						<th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
					</tr>
				</thead>
				<tbody class="bg-gray-800 divide-y divide-gray-700">
					{#each users as user}
						<tr class="hover:bg-gray-700/50 transition">
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.id}</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{user.username}</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm">
								<span
									class="px-2 py-1 rounded text-xs font-semibold {user.role === 'admin'
										? 'bg-red-500/20 text-red-400 border border-red-500/30'
										: 'bg-gray-700 text-gray-300 border border-gray-600'}"
								>
									{user.role}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
								{new Date(user.created_at).toLocaleDateString('th-TH')}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm">
								<button
									on:click={() => deleteUser(user.id)}
									class="text-red-400 hover:text-red-300 font-semibold transition"
								>
									Delete
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		{#if pagination.totalPages > 1}
			<div class="flex justify-center mt-8 gap-2">
				{#each Array(pagination.totalPages) as _, i}
					<button
						on:click={() => loadUsers(i + 1)}
						class="px-4 py-2 rounded-lg font-medium transition {pagination.page === i + 1
							? 'bg-blue-600 text-white shadow-lg'
							: 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}"
					>
						{i + 1}
					</button>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<!-- Create User Modal -->
{#if showCreateModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700">
			<h2 class="text-2xl font-bold mb-4 text-white">Create New User</h2>

			<form on:submit|preventDefault={createUser}>
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Username</label>
					<input
						type="text"
						bind:value={formData.username}
						required
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
					<input
						type="email"
						bind:value={formData.email}
						required
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-300 mb-2">Password</label>
					<input
						type="password"
						bind:value={formData.password}
						required
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div class="mb-6">
					<label class="block text-sm font-medium text-gray-300 mb-2">Role</label>
					<select
						bind:value={formData.role}
						class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
				</div>

				<div class="flex gap-4">
					<button
						type="submit"
						class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
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
