<script>
    export let data;
</script>

{#if data}
    <p>{JSON.stringify(data)}</p>
{/if}