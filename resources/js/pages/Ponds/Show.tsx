import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { CalendarClock, Droplet, MapPinned, User, Wrench } from 'lucide-react';

interface Location {
    id: number;
    location: string;
}
interface WaterLog {
    id: number;
    updated_at: string;
    user?: { name: string };
}
interface MaintenanceLog {
    id: number;
    updated_at: string;
    user?: { name: string };
}
interface Pond {
    id: number;
    pond_id: string;
    capacity: number;
    location?: Location;
    latest_water_log?: WaterLog;
    latest_maintenance_log?: MaintenanceLog;
}

export default function Show({ pond }: { pond: Pond }) {
    const breadcrumbs = [
        { title: 'Pond Management', href: '/ponds' },
        { title: `Pond ${pond.pond_id}`, href: `/ponds/${pond.id}` },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pond Details" />
            <div className="container mx-auto p-4">
                {/* Outer Card */}
                <Card>
                    {/* Overall Title with Actions */}
                    <CardHeader>
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-col gap-1">
                                <CardTitle className="text-lg font-semibold">Pond Details</CardTitle>
                                <p className="text-muted-foreground text-sm">Pond ID: {pond.pond_id}</p>
                            </div>
                            <div className="flex gap-2">
                                <Link href={`/pondsInfo/waterLogs/${pond.id}`} as="button">
                                    <Button variant="secondary">
                                        <Droplet /> Water Logs
                                    </Button>
                                </Link>
                                <Link href={`/pondsInfo/maintenanceLogs/${pond.id}`} as="button">
                                    <Button variant="secondary">
                                        <Wrench /> Maintenance Logs
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Pond Details Section */}
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col gap-1">
                                    <CardTitle className="text-base font-semibold">Pond Details</CardTitle>
                                    <p className="text-muted-foreground text-xs">Basic information about this pond</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Pond ID</TableHead>
                                            <TableHead>Capacity</TableHead>
                                            <TableHead>Location</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{pond.pond_id}</TableCell>
                                            <TableCell>{pond.capacity}</TableCell>
                                            <TableCell className="flex items-center gap-2">
                                                <MapPinned size={14} />
                                                <span>{pond.location?.location || 'N/A'}</span>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Latest Logs Section */}
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col gap-1">
                                    <CardTitle className="text-base font-semibold">Latest Logs</CardTitle>
                                    <p className="text-muted-foreground text-xs">Most recent water and maintenance entries</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
                                    {/* Water Log */}
                                    <div className="p-4 md:pr-6">
                                        <div className="mb-2 flex items-center gap-2 font-medium">
                                            <Droplet size={16} />
                                            <span>Latest Water Log</span>
                                        </div>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Added By</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {pond.latest_water_log ? (
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <CalendarClock size={14} />
                                                                <span>{new Date(pond.latest_water_log.updated_at).toLocaleString()}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="flex items-center gap-2">
                                                            <User size={14} />
                                                            <span>{pond.latest_water_log.user?.name || 'N/A'}</span>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={2} className="text-muted-foreground py-4 text-center">
                                                            No water logs available.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* Maintenance Log */}
                                    <div className="p-4 md:pl-6">
                                        <div className="mb-2 flex items-center gap-2 font-medium">
                                            <Wrench size={16} />
                                            <span>Latest Maintenance Log</span>
                                        </div>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Added By</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {pond.latest_maintenance_log ? (
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <CalendarClock size={14} />
                                                                <span>{new Date(pond.latest_maintenance_log.updated_at).toLocaleString()}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="flex items-center gap-2">
                                                            <User size={14} />
                                                            <span>{pond.latest_maintenance_log.user?.name || 'N/A'}</span>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={2} className="text-muted-foreground py-4 text-center">
                                                            No maintenance logs available.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
