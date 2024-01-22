<script>
import {Input} from "$lib/components/ui/input";
import {Button} from "$lib/components/ui/button";
import {enhance} from "$app/forms";
import {Card, CardTitle, CardHeader, CardDescription, CardContent} from "$lib/components/ui/card";
import {Alert, AlertDescription, AlertTitle} from "$lib/components/ui/alert";
import {AlertCircle} from "lucide-svelte";

export let form;

</script>

<div class="flex flex-col h-screen justify-center items-center space-y-3">
    {#if form?.error}
        <Alert class="max-w-80">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {form.error.message}
            </AlertDescription>
        </Alert>
    {/if}
    <Card>
        <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Start tracking your time today!</CardDescription>
        </CardHeader>
        <CardContent>
            <form method="post" class="flex space-y-6 flex-col" use:enhance>
                <Input class="md:w-72" name="username" type="test" placeholder="Username" required />
                <Input class="md:w-72" name="password" type="password" placeholder="Password" required />
                <Button type="submit">Register</Button>
            </form>
            <div class="mt-4">
                <a class="text-sm text-zinc-400 hover:text-zinc-500" href="/login">
                    Already have an account?
                </a>
            </div>
        </CardContent>
    </Card>
</div>