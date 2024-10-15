<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import useCookie from "$utils/useCookie";
	let show: boolean = false;
	
	const toggleShow = () => {
		show = !show;
	};

	const checkIfSelected = (path: string) => {
		return path == $page.url.pathname ? "font-bold bg-gray-100 text-gray-900" : "text-gray-700";
	};

	const handleNavigatePage = (path: string) => {
		if (path) {
			goto(path);
		}
	};

	const handleLogout = () => {
		const { removeCookie } = useCookie();
		removeCookie({ name: "token", domain: window.location.hostname });
		setTimeout(() => {
			window.localStorage.clear();
			goto("/");
		}, 1);
	};
</script>

<div class="relative inline-block text-left">
	<div>
		<button
			on:click={() => toggleShow()}
			type="button"
			class="dropdown-button"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true"
		>
			<svg
				class="-mr-1 -ml-1 h-5 w-5 text-gray-400"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
				data-slot="icon"
			>
				<path
					fill-rule="evenodd"
					d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>

	<div
		class={`dropdown-menu
  ${show ? "duration-100 opacity-100 scale-100  z-[3]" : "duration-500 opacity-0 scale-50 pointer-events-none z-[-2]"}
  `}
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-button"
		tabindex={-1}
	>
		<div class="py-1" role="none">
			<button
				on:click={() => {
					handleNavigatePage("/story");
				}}
				class={`${checkIfSelected("/story")} block px-4 py-2 text-sm w-full text-start hover:font-bold`}
				tabindex={-1}
				id="menu-item-0">Story Generation</button
			>
			<button
				on:click={() => {
					handleNavigatePage("/time");
				}}
				class={`${checkIfSelected("/time")} block px-4 py-2 text-sm w-full text-start hover:font-bold`}
				tabindex={-1}
				id="menu-item-1">Main Time Series</button
			>
			<button
				type="button"
				on:click={() => handleLogout()}
				class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:font-bold"
				role="menuitem"
				tabindex={-1}
				id="menu-item-3">Sign out</button
			>
		</div>
	</div>
</div>
