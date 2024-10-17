<script lang="ts">
	import Wrapper from "$components/Wrapper/+page.svelte";
	import Input from "$components/Input/+page.svelte";
	import EmptyIcon from "$assets/images/empty.webp";

	let queryValue: string = "";
	let responseValue: string = null;
	let convoList: any = [];
	let isLoading: boolean = false;
	let storyBody: HTMLDivElement;
	let errorMessage = `
	I am sorry. An error was occured or 
	maybe I am cold and can't answer you right now. 
	Please try again after a few minutes.`;

	const handleGenerateStory = async () => {
		// CLEAR MESSAGES
		if (String(queryValue).toLowerCase() === "-cls") {
			clearQueryValue();
			convoList = [];
			responseValue = null;
			isLoading = false;
			return;
		}

		// FETCH STREAM DATA TO BACKEND
		if (queryValue) {
			const query = queryValue;
			convoList = [...convoList, { sender: "admin", message: query }];
			clearQueryValue();
			scrollBody();
			isLoading = true;

			fetch("/api/story", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			})
				.then((data) => {
					isLoading = false;
					// PIPE CHUNKS TO WRITABLE STREAM
					const decoderStream = new TextDecoderStream("utf-8");
					responseValue = ""
					const writer = new WritableStream({
						write(chunk) {
							responseValue += chunk;
							scrollBody();
						},
					});

					data.body
						.pipeThrough(decoderStream)
						.pipeTo(writer)
						.then(() => {
							convoList = [...convoList, { sender: "bot", message: responseValue || errorMessage }];
							scrollBody();
							// CLEAR STREAM RESPONSE FOR NEXT ANIMATION
							responseValue = "";
						});
				})
				.catch((err) => {
					// DISPLAY ERROR MESSAGE IF THE SERVER DOES NOT RESPONSE
					isLoading = false;
					convoList = [...convoList, { sender: "bot", message: errorMessage }];
				});
		}
	};

	// SCROLL AT THE BOTTOM
	const scrollBody = () => {
		setTimeout(() => {
			storyBody.scrollTo(0, storyBody.scrollHeight + 50);
		}, 100);
	};

	// CLEAR QUERY TEXT UPON SUBMITTING
	const clearQueryValue = () => {
		queryValue = "";
	};
</script>

<Wrapper title="Story Generation Page" desc="using meta/meta-llama-3-8b">
	<div class="story-wrapper">
		<!-- OUTPUT TEXT AREA -->
		<div class="story-body" bind:this={storyBody}>
			<!-- PLACEHOLDER -->
			{#if responseValue === null && convoList.length === 0}
				<div class="flex items-center justify-center h-[calc(100%_-_40px)] flex-col">
					<img src={EmptyIcon} alt="" class="opacity-30 h-[300px] w-[300px]" />
					<p class="mt-[-50px] text-[#c1c1c1]">It's empty here. Pick a topic.</p>
				</div>
			{/if}

			<div class="flex flex-col p-5">
				<!-- DISPLAY CONVERSATION -->
				{#each convoList as cL}
					<div
						class={`w-full flex p-2 rounded-lg break-all overflow-x-hidden whitespace-pre-line
					${cL.sender == "bot" ? "justify-start mt-[-45px]" : "justify-center bg-slate-400 bg-opacity-5 text-slate-500"} `}
					>
						{cL.message}
					</div>
				{/each}

				<!-- CHAT RESPONSE ANIMATION -->
				{#if isLoading}
					<div class="py-3 animate-bounce mt-5">
						<div class="flex">
							<div class="h-2 w-2 rounded-full bg-slate-500 me-2"></div>
							<div class="h-2 w-2 rounded-full bg-slate-500 me-2"></div>
							<div class="h-2 w-2 rounded-full bg-slate-500 me-2"></div>
						</div>
					</div>
				{/if}
			</div>

			<!-- STREAM RESPONSE -->
			{#if responseValue}
				<div class="px-6 animated whitespace-pre-line mt-[-45px]">
					{responseValue}
				</div>
			{/if}
		</div>

		<!-- INPUT TEXT AREA -->
		<div class="story-footer">
			<div
				class="absolute bottom-[-80px] w-full text-center text-[12px] text-cyan-950 hidden md:block"
			>
				Tip: You can type "<span class="font-bold">-cls</span>" to clear all messages.
			</div>
			<Input
				id="query_field"
				bind:value={queryValue}
				label=""
				hideLabel={true}
				onKeyPress={handleGenerateStory}
				type="text"
				customClassName="text-[16px] text-center border-none focus:border-none"
				placeholder="Type to generate a story here..."
			/>
		</div>
	</div>
</Wrapper>
