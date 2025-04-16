import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CloudRain, CornerDownRight, ListChecks, MapPin, Settings2, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Utilities',
        href: '/utilities',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Utilities" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card className="border shadow-none">
                        <CardHeader>
                            <div className="space-y-1 text-center">
                                <h1 className="text-2xl font-semibold">Utilities</h1>
                                <p className="text-sm">Manage various system utilities such as user roles, settings, and more.</p>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                {/* User Utilities */}
                                <Card className="border">
                                    <div className="space-y-4 p-4">
                                        <div className="flex items-center gap-3">
                                            <Users className="h-5 w-5" />
                                            <h2 className="text-base font-medium">User Utilities</h2>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link href="userRoles" prefetch>
                                                <Button variant="outline" className="h-20 w-40 flex-col gap-1 p-2">
                                                    <Settings2 className="h-7 w-7" />
                                                    <span className="text-sm">User Roles</span>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>

                                {/* Pond Utilities */}
                                <Card className="border">
                                    <div className="space-y-4 p-4">
                                        <div className="flex items-center gap-3">
                                            <CloudRain className="h-5 w-5" />
                                            <h2 className="text-base font-medium">Pond Utilities</h2>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link href="locations" prefetch>
                                                <Button variant="outline" className="h-20 w-full flex-col gap-1 p-2">
                                                    <MapPin className="h-7 w-7" />
                                                    <span className="text-sm">Locations</span>
                                                </Button>
                                            </Link>
                                            <Link href="removalReasons" prefetch>
                                                <Button variant="outline" className="h-20 w-full flex-col gap-1 p-2">
                                                    <ListChecks className="h-7 w-7" />
                                                    <span className="text-sm">Removal Reasons</span>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>

                                {/* Upcoming Utilities */}
                                <Card className="border">
                                    <div className="space-y-4 p-4">
                                        <div className="flex items-center gap-3">
                                            <CornerDownRight className="h-5 w-5" />
                                            <h2 className="text-base font-medium">Upcoming</h2>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="flex h-20 w-40 items-center justify-center rounded-md border p-2">
                                                <p className="text-center text-xs">More utilities coming soon</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
