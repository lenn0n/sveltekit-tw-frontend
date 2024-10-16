<script lang="ts">
	import { onMount } from "svelte";
	import Wrapper from "$components/Wrapper/+page.svelte";
	import Plot from "svelte-plotly.js";
	import type { AreaTypes } from "$types/time.d.ts";

	let area: AreaTypes = "LUZ_MKT_REQT";
	let data = [{ x: [], y: [] }];
	let isLoading: boolean = true;

	const getSelected = () => {
		switch (area) {
			case "LUZ_MKT_REQT":
				return "Luzon";
			case "VIS_MKT_REQT":
				return "Visayas";
			case "MIN_MKT_REQT":
				return "Mindanao";
			default:
				return "Luzon";
		}
	};

	const fetchEnergy = async () => {
		isLoading = true;
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
	<div class="flex items-center justify-center my-6 xl:my-10">
		PH Energy Consumption
	</div>
	<div class={`${isLoading ? "hidden" : "block"} time-graph`}>
		<Plot
			{data}
			layout={{
				margin: { t: 0 },
			}}
			fillParent="width"
			debounce={250}
		/>
	</div>
	<div class={`${isLoading ? "flex" : "hidden"} time-graph-placeholder`}>Loading Graph</div>
	<div class="time-selection">
		<label for="" class="me-2 text-[#515151]">Select Area:</label>
		<div class="border-[1px] rounded-md p-1">
			<select
				disabled={isLoading}
				bind:value={area}
				on:change={() => {
					fetchEnergy();
				}}
			>
				<option value="LUZ_MKT_REQT">Luzon</option>
				<option value="VIS_MKT_REQT">Visayas</option>
				<option value="MIN_MKT_REQT">Mindanao</option>
			</select>
		</div>
	</div>
</Wrapper>
