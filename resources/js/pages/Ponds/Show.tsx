import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Location {
    id: number;
    location: string;
}

interface WaterLog {
    id: number;
    updated_at: string;
    notes: string;
    user_id: string;
    user?: {
        id: string;
        name: string;
    };
}

interface Pond {
    id: number;
    pond_id: string;
    capacity: number;
    location?: Location;
    latest_water_log?: WaterLog;
}

export default function Show({ pond }: { pond: Pond }) {
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
                                            <Link href={`/pondsInfo/maintenanceLogs/${pond.id}`} as="button">
                                                <Button variant="link">Maintenance Logs</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {/* Latest Logs Section - Side by Side */}
                            <div className="pt-10">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Latest Logs</h3>
                                </div>

                                <div className="relative overflow-x-auto">
                                    <div className="inline-flex w-full space-x-4 pb-2" style={{ minWidth: 'max-content' }}>
                                        {/* Water Log Table - Left Side */}
                                        <div className="w-1/2 min-w-[400px]">
                                            <div className="p-4 pb-2">
                                                <h2 className="text-md font-bold">Water Log</h2>
                                            </div>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>#</TableHead>
                                                        <TableHead>Date</TableHead>
                                                        <TableHead>Recorder By</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {pond.latest_water_log ? (
                                                        <TableRow>
                                                            <TableCell>1</TableCell>
                                                            <TableCell className="whitespace-nowrap">
                                                                {new Date(pond.latest_water_log.updated_at)
                                                                    .toLocaleString('en-US', {
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                        year: 'numeric',
                                                                        hour: 'numeric',
                                                                        minute: '2-digit',
                                                                        hour12: true,
                                                                    })
                                                                    .replace(' at', ' @')
                                                                    .replace('AM', 'am')
                                                                    .replace('PM', 'pm')}
                                                            </TableCell>
                                                            <TableCell>{pond.latest_water_log.user?.name || 'N/A'}</TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell colSpan={5} className="py-4 text-center">
                                                                <div className="flex flex-col items-center space-y-2">
                                                                    <p className="text-muted-foreground">No water logs available.</p>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-full w-px self-stretch bg-gray-300"></div>

                                        {/* Maintenance Log Table - Right Side */}
                                        <div className="w-1/2 min-w-[400px]">
                                            <div className="flex items-center justify-between p-4 pb-2">
                                                <h2 className="text-md font-bold">Maintenance Log</h2>
                                            </div>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Date</TableHead>
                                                        <TableHead>Type</TableHead>
                                                        <TableHead>Action</TableHead>
                                                        <TableHead>Status</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell colSpan={4} className="py-4 text-center">
                                                            <p className="text-muted-foreground">No maintenance logs</p>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
