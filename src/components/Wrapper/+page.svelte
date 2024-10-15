<script lang="ts">
	import "$assets/css/app.css";
	import Dropdown from "$components/Dropdown/+page.svelte";
	export let title: string = "";
	export let desc: string = "";
</script>

<div class="common-page">
	<div class="common-page-wrapper">
		<div class="common-title">
			<h2>{title}</h2>
			<p>{desc}</p>
			<div class="absolute right-3 top-3">
				<Dropdown />
			</div>
		</div>
		<slot />
	</div>
</div>
