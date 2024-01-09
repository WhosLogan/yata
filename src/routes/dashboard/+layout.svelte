<script>
import {Button} from "$lib/components/ui/button";
import {page} from "$app/stores";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent} from "$lib/components/ui/dropdown-menu";
import {Menu} from "lucide-svelte";

const projectsNav = [
    {
        name: "Overview",
        href: "overview"
    },
    {
        name: "TimeCards",
        href: "timecards"
    },
    {
        name: "Settings",
        href: "settings"
    }
]

let baseurl = "";

$: baseurl = `/dashboard/projects/${$page.url.pathname.split('/')[3]}`;
</script>

<div class="flex border p-3 pl-5 m-3 mb-5 rounded-3xl items-center justify-between">
    <div>
        <a class="text-2xl" href="/dashboard">Yata</a>
    </div>

    {#if $page.url.pathname.startsWith('/dashboard/projects')}
        <div class="hidden md:flex gap-2">
            {#each projectsNav as link}
                <a href="{baseurl}/{link.href}">
                    <Button variant={$page.url.pathname.endsWith(link.href) ? "secondary" : "ghost"}>
                        {link.name}
                    </Button>
                </a>
            {/each}
        </div>

        <div class="md:hidden ml-6">
            <DropdownMenu>
                <DropdownMenuTrigger asChild let:builder>
                    <Button variant="ghost" builders={[builder]}>
                        <Menu className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {#each projectsNav as link}
                        <DropdownMenuItem>
                            <a href="{baseurl}/{link.href}">
                                <Button variant="ghost">
                                    {link.name}
                                </Button>
                            </a>
                        </DropdownMenuItem>
                    {/each}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    {/if}

    <div>
        <a data-sveltekit-preload-data="false" href="/logout">
            <Button variant="outline">Logout</Button>
        </a>
    </div>
</div>

<slot />