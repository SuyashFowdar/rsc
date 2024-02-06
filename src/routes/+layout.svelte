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
	/*.app {*/
	/*	display: flex;*/
	/*	flex-direction: column;*/
	/*	min-height: 100vh;*/
	/*}*/

	/*main {*/
	/*	flex: 1;*/
	/*	display: flex;*/
	/*	flex-direction: column;*/
	/*	padding: 1rem;*/
	/*	width: 100%;*/
	/*	max-width: 64rem;*/
	/*	margin: 0 auto;*/
	/*	box-sizing: border-box;*/
	/*}*/

	/*footer {*/
	/*	display: flex;*/
	/*	flex-direction: column;*/
	/*	justify-content: center;*/
	/*	align-items: center;*/
	/*	padding: 12px;*/
	/*}*/

	/*footer a {*/
	/*	font-weight: bold;*/
	/*}*/

	/*@media (min-width: 480px) {*/
	/*	footer {*/
	/*		padding: 12px 0;*/
	/*	}*/
	/*}*/
</style>
