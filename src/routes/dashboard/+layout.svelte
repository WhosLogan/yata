<script>
import {Button} from "$lib/components/ui/button";
</script>

<div class="flex border p-3 pl-5 m-3 rounded-3xl items-center justify-between">
    <div>
        <a class="text-2xl" href="/dashboard">Yata</a>
    </div>
    <div>
        <a data-sveltekit-preload-data="false" href="/logout">
            <Button variant="outline">Logout</Button>
        </a>
    </div>
</div>

<slot />