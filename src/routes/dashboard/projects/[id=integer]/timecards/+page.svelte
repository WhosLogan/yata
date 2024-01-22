<script>
import {
    Table,
    TableCaption,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell } from "$lib/components/ui/table";
import {Input} from "$lib/components/ui/input";
import {Button} from "$lib/components/ui/button";

    export let data;
    let searchTerm = '';
</script>

<div class="flex flex-col items-center">
    <div class="flex w-full justify-center gap-3 mb-4">
        <Input class="w-7/12" placeholder="Search" bind:value={searchTerm} />
        <Button variant="outline">Create Card</Button>
    </div>
    <Table>
        <TableCaption>A list of your recent time cards.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead class="w-[100px]">ID</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Description</TableHead>
                <TableHead class="">Hours</TableHead>
                <TableHead class="text-right">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {#each data.timeCards.filter(c => c.description.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') as card}
                <TableRow>
                    <TableCell class="font-medium">{card.id}</TableCell>
                    <TableCell>{new Date(card.start).toLocaleString('en-US')}</TableCell>
                    <TableCell>{new Date(card.end).toLocaleString('en-US')}</TableCell>
                    <TableCell>{card.description}</TableCell>
                    <TableCell>{(Math.abs(card.end-card.start) / 360000).toFixed(3)}</TableCell>
                    <TableCell class="text-right">${((Math.abs(card.end-card.start) / 360000) * data.project.rate).toFixed(2)}</TableCell>
                </TableRow>
            {/each}
        </TableBody>
    </Table>
</div>