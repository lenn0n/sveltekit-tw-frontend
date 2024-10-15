<script lang="ts">
	import "$assets/css/app.css";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import Input from "$components/Input/+page.svelte";
	import Button from "$components/Button/+page.svelte";
	import GithubIcon from "$assets/images/github-sign.png";
	import supabase from "$lib/supabaseClient";
	import useCookie from "$utils/useCookie";
	import localStorage from "$utils/useLocalStorage";

	type Provider = "github";
	let emailValue: string = "";
	let passValue: string = "";
	let isLoading: boolean = false;
	let errorMessage: string = "";

	const { getCookie, setCookie } = useCookie();

	const handleLogin = async (platform: string) => {
		// LOGIN USING OAUTH
		if (platform !== undefined) {
			isLoading = true;
			await supabase.auth.signInWithOAuth({
				provider: String(platform).toLowerCase() as Provider,
			});
		} else {
			// LOGIN USING EMAIL AND PASSWORD
			if (emailValue && passValue) {
				isLoading = true;
				const { data, error } = await supabase.auth.signInWithPassword({
					email: emailValue,
					password: passValue,
				});
				if (data.session) {
					setCookie({
						name: "token",
						value: data.session.access_token,
						domain: window.location.hostname,
					});
					goto("/story");
				} else {
					isLoading = false;
					errorMessage = "Invalid credential. Please try again.";
				}
			}
		}
	};

	onMount(() => {
		checkTokenInLocalStorage();
	});

	const checkTokenInLocalStorage = () => {
		setTimeout(() => {
			const token = localStorage.get("sb-hvnydrfnekqopyjrvgsv-auth-token");
			// CHECK IF THERES NO TOKEN IN THE COOKIES
			if (!getCookie("token") && token) {
				isLoading = true;
				const access_token = JSON.parse(token).access_token;
				setCookie({ name: "token", value: access_token, domain: window.location.hostname });
				// CLEAN UP THE STORAGE. SUPABASE IS PASSING TOO MANY INFO AND WE DONT NEED TO EXPOSE IT FOR NOW.
				// WE JUST NEED THE TOKEN.
				// window.localStorage.clear()
				goto("/story");
			}
		}, 1000); 
		// WAIT FOR LOCALSTORAGE TO FINISH SAVING
		// SUPABASE SETS A TOKEN IN THE LOCALSTORAGE AFTER CALLING A CALLBACK
	};
</script>

<div class="login-page">
	<div class="login-form">
		<div class="login-leftside"></div>
		<div class="login-rightside">
			<div class="login-header md:h-[80px]">
				<h2>Authentication</h2>
				<div class="text-[14px] text-[#515151] pt-2">
					<div>
						If you’ve landed here and are unsure what this website is about, it’s simply a technical
						exam.
					</div>

					{#if errorMessage}
						<div class="text-red-500 text-[12px] pt-2 font-bold">{errorMessage}</div>
					{/if}
				</div>
			</div>
			<fieldset disabled={isLoading}>
				<div class="">
					<Input
						focus
						id="email_field"
						type="text"
						bind:value={emailValue}
						label="Email Address"
						hideLabel={false}
						customClassName=""
						onKeyPress={handleLogin}
						placeholder="Enter Email Address"
					/>
					<Input
						id="pass_field"
						type="password"
						bind:value={passValue}
						label="Password"
						hideLabel={false}
						customClassName=""
						onKeyPress={handleLogin}
						placeholder="Enter Password"
					/>
				</div>

				<Button
					platform="undefined"
					icon=""
					isSocial={false}
					handleOnClick={handleLogin}
					customClassName="!bg-[#2f4262] !bg-opacity-95 text-white">Login</Button
				>
				<div class="login-separator"><span>or</span></div>
				<Button
					platform="Github"
					icon={GithubIcon}
					handleOnClick={handleLogin}
					customClassName=""
					isSocial={true}
				/>
			</fieldset>
		</div>
	</div>
</div>
