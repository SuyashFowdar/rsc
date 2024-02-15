<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.js?url';
	import './styles.css';
	import '../lib/fa/free.min.css';

	export let data;

	let currentPath = '';
</script>

<svelte:head>
	<script src={scriptSrc}></script>
</svelte:head>

<div class="app">
	<nav class="navbar navbar-expand-lg bg-body-secondary">
		<div class="container-fluid">
			<a class="navbar-brand" href="/">RSC Ltd</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div class="navbar-nav">
					{#each data.models as model}
						<a class="nav-link {data.modelName === model.path ? 'active' : ''}"
						   href="/list/{ model.path }">{ model.name }</a>
					{/each}
				</div>
			</div>
		</div>
	</nav>

	<main>
		<slot />
	</main>
</div>

<style>
</style>
