import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader>
                            {/* Title and Sub-description */}
                            <div className="text-center">
                                <h1 className="text-2xl font-bold">Utilities</h1>
                                <p className="text-muted-foreground mt-1 text-sm">
                                    Manage various system utilities such as user roles, settings, and more.
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent>
                            {/* Grid section */}
                            <div className="grid gap-4 md:grid-cols-3">
                                {/* Card 1 */}
                                <div className="border-sidebar-border/70 dark:border-sidebar-border flex flex-col gap-2 overflow-hidden rounded-xl border p-4">
                                    <h2 className="mb-2 text-lg font-semibold">User Utilities</h2>
                                    <Link href="userRoles" prefetch>
                                        <Button variant="outline" className="w-full">
                                            User Roles
                                        </Button>
                                    </Link>
                                </div>

                                <div className="border-sidebar-border/70 dark:border-sidebar-border flex flex-col gap-2 overflow-hidden rounded-xl border p-4">
                                    <h2 className="mb-2 text-lg font-semibold">Pond Utilities</h2>
                                    <Link href="locations" prefetch>
                                        <Button variant="outline" className="w-full">
                                            Locations
                                        </Button>
                                    </Link>
                                    <Link href="removalReasons" prefetch>
                                        <Button variant="outline" className="w-full">
                                            Removal Reason
                                        </Button>
                                    </Link>
                                </div>

                                <div className="border-sidebar-border/70 dark:border-sidebar-border flex flex-col gap-2 overflow-hidden rounded-xl border p-4">
                                    <h2 className="mb-2 text-lg font-semibold">Upcoming Utilities</h2>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
