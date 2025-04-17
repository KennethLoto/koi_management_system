import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Location {
    id: number;
    location: string;
}

interface Pond {
    id: number;
    pond_id: string;
    capacity: number;
    location?: Location;
}

export default function Show({ pond }: { pond: Pond }) {
    // Breadcrumbs defined inside the component where pond data is available
    const breadcrumbs = [
        { title: 'Ponds', href: '/ponds' },
        { title: `Pond ${pond.pond_id}`, href: `/ponds/${pond.id}` },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pond Details" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-bold">Pond Details</h2>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">#</TableHead>
                                        <TableHead>Pond ID</TableHead>
                                        <TableHead>Capacity</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">1</TableCell>
                                        <TableCell>{pond.pond_id}</TableCell>
                                        <TableCell>{pond.capacity}</TableCell>
                                        <TableCell>{pond.location?.location || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Link href={`/pondsInfo/waterLogs/${pond.id}`} as="button">
                                                <Button variant="link">Water Logs</Button>
                                            </Link>
                                            <Link href={`/pondsInfo/waterLogs/${pond.id}`} as="button">
                                                <Button variant="link">Maintenance Logs</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
