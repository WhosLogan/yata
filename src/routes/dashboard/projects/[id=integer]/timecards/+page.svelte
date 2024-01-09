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
</script>

<div class="flex flex-col items-center">
    <div class="flex w-full justify-center gap-3 mb-4">
        <Input class="w-7/12" placeholder="Search" />
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
            <TableRow>
                <TableCell class="font-medium">00001</TableCell>
                <TableCell>{new Date(Date.now()).toLocaleString('en-US', { timeZone: 'UTC' })}</TableCell>
                <TableCell>{new Date(Date.now()).toLocaleString('en-US', { timeZone: 'UTC' })}</TableCell>
                <TableCell>Short description of work</TableCell>
                <TableCell>15</TableCell>
                <TableCell class="text-right">$250.00</TableCell>
            </TableRow>
        </TableBody>
    </Table>
</div>