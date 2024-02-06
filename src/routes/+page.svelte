<script>
	import { browser } from '$app/environment';

	export let data;

	let selectedCompanyId = null;

	if (browser) selectedCompanyId = localStorage.selectedCompanyId || 0;

	function selectCompany(company) {
		if (!company.id) {
			localStorage.removeItem('selectedCompanyId');
		} else {
			localStorage.selectedCompanyId = company.id;
		}

		selectedCompanyId = company.id;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="d-flex flex-column align-items-center justify-content-center" style="height: 50vh;">
	<h2>Select Company</h2>
	<div class="list-group" style="width: 300px;">
		{#each data.companyList as company}
			<button type="button"
					class="list-group-item list-group-item-action { company.id === selectedCompanyId ? 'active' : '' }"
					aria-current="true"
					on:click={ () => { selectCompany(company) } }>
				{ company.name }
			</button>
		{/each}
	</div>
</section>

<style>
</style>
