<script lang="ts">
  // Define the props
  export let platform: string;
  export let icon: string;
  export let handleOnClick: (platform: string) => void;
  export let customClassName: string = '';  // Optional, default to empty string
  export let isSocial: boolean = false;     // Optional, default to false
</script>

<button 
  class={`login-button ${customClassName} disabled:opacity-35`} 

  on:click={() => handleOnClick(platform)}>
  {#if isSocial}
    <img src={icon} alt="social-icon" />
    Continue with {platform}
  {:else}
    <slot />  <!-- This is equivalent to React's Children Props -->
  {/if}
</button>