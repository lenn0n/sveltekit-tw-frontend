<script lang="ts">
	import { onMount } from "svelte";
	import Wrapper from "$components/Wrapper/+page.svelte";
	import Plot from "svelte-plotly.js";
	import type { AreaTypes } from "$types/time.d.ts";

	let area: AreaTypes = "LUZ_MKT_REQT";
	let data = [{ x: [], y: [] }];
	let isLoading: boolean = true;

	const fetchEnergy = async () => {
		isLoading = true
		fetch("https://python-flask-backend-lake.vercel.app/api/v1/retrieve-time", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ area }),
		})
			.then((data) => {
				return data.json();
			})
			.then((energy) => {
				data = [
					{
						x: energy.data.x,
						y: energy.data.y,
					},
				];
				isLoading = false;
			});
	};

	onMount(() => {
		fetchEnergy();
	});
</script>

<Wrapper title="Main Time Series Page" desc="using PlotlyJS">
	<div class="my-10 flex items-center justify-center">
		<select bind:value={area} on:change={() => { fetchEnergy()}}>
			<option value="LUZ_MKT_REQT">Luzon</option>
			<option value="VIS_MKT_REQT">Visayas</option>
			<option value="MIN_MKT_REQT">Mindanao</option>
		</select>
	</div>
	<div class={`max-w-[98%] ${isLoading ? "hidden" : "block"} animated`}>
		<Plot
			{data}
			layout={{
				margin: { t: 0 },
			}}
			fillParent="width"
			debounce={250}
		/>
	</div>
	<div class={`max-w-[100%] ${isLoading ? 'block': 'hidden'} bg-slate-700 bg-opacity-5 animate-pulse rounded-lg h-[40%] mx-10`}>

	</div>
</Wrapper>
