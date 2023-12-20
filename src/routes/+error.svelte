<script>
    import {page} from "$app/stores";
</script>

<div class="flex h-screen justify-center items-center space-x-2">
    <h2 class="text-3xl">{$page.status} | {$page.error?.message}</h2>
</div>