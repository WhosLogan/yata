<script>
import {Input} from "$lib/components/ui/input";
import {Button} from "$lib/components/ui/button";
import {enhance} from "$app/forms";
</script>

<div class="flex h-screen justify-center items-center">
    <div class="border-white border p-8 rounded-3xl">
        <h2 class="text-2xl mb-3 pl-3">Register</h2>
        <form method="post" class="flex space-y-3 flex-col" use:enhance>
            <Input class="md:w-72" name="username" type="test" placeholder="Username" required />
            <Input class="md:w-72" name="password" type="password" placeholder="Password" required />
            <Button type="submit">Register</Button>
        </form>
    </div>
</div>