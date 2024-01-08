<script>
    import {Input} from "$lib/components/ui/input";
    import {Button, buttonVariants} from "$lib/components/ui/button";
    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
        DialogFooter
    } from "$lib/components/ui/dialog";
    import {Alert, AlertTitle, AlertDescription} from "$lib/components/ui/alert";
    import {AlertCircle} from "lucide-svelte";
    import {enhance} from "$app/forms";

    export let data;
    export let form;

    let search = '';
</script>

<h2 class="text-2xl hidden">Projects</h2>

<div class="flex justify-center">
    <div class="flex gap-3">
        <Input bind:value={search} class="md:w-80" placeholder="Search" />
        <Dialog>
            <DialogTrigger class={buttonVariants({variant: 'default'})}>
                Create Project
            </DialogTrigger>
            <DialogContent class="max-w-72 md:max-w-96">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>Create a new yata project</DialogDescription>
                </DialogHeader>
                {#if form?.error}
                    <Alert>
                        <AlertCircle class="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{form.error.message}</AlertDescription>
                    </Alert>
                {/if}
                <form method="post" use:enhance>
                    <div class="flex flex-col gap-3 mb-4 items-center">
                        <Input name="name" placeholder="Name" />
                        <Input name="description" placeholder="Description" />
                        <Input name="rate" placeholder="Rate" />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
</div>

<div class="flex justify-center mt-5">
    <div class="grid {data.projects.length > 2 ? "md:grid-cols-2 lg:grid-cols-3" : ""} gap-2">
        {#each data.projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || search === '') as project}
            <div class="shadow-sm bg-card border p-5 rounded flex items-center gap-5">
                <div class="flex flex-col gap-2">
                    <h2 class="text-2xl">{project.name}</h2>
                    <p class="text-gray-400">{project.description}</p>
                </div>
                <a href="/dashboard/projects/{project.id}">
                    <Button variant="outline">View Project</Button>
                </a>
            </div>
        {/each}
    </div>
</div>