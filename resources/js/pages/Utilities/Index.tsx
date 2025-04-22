import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, CloudSnow, FileText, Fish, Users, Wrench } from 'lucide-react';

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
            <div className="container mx-auto p-4">
                <Card className="border shadow-none">
                    <CardHeader>
                        <div className="space-y-1">
                            <h1 className="text-xl font-semibold">Utilities</h1>
                            <p className="text-muted-foreground text-sm">‣ Manage various utilities.</p>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {/* User Utilities Card */}
                            <Link href="/utilities/userUtilities" className="group">
                                <Card className="group-hover:border-primary h-full transition-all duration-200 group-hover:shadow-sm">
                                    <CardContent className="flex h-full flex-col p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <Users className="text-primary h-6 w-6" />
                                            <ChevronRight className="text-muted-foreground h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium">User Utilities</h3>
                                            <p className="text-muted-foreground mt-1 text-sm">Manage user roles and permissions.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* Pond Utilities Card */}
                            <Link href="/utilities/pondUtilities" className="group">
                                <Card className="group-hover:border-primary h-full transition-all duration-200 group-hover:shadow-sm">
                                    <CardContent className="flex h-full flex-col p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <CloudSnow className="text-primary h-6 w-6" />
                                            <ChevronRight className="text-muted-foreground h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium">Pond Utilities</h3>
                                            <p className="text-muted-foreground mt-1 text-sm">Manage pond locations, actions, and removal reasons.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* Koi Utilities Card */}
                            <Link href="/utilities/koiUtilities" className="group">
                                <Card className="group-hover:border-primary h-full transition-all duration-200 group-hover:shadow-sm">
                                    <CardContent className="flex h-full flex-col p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <Fish className="text-primary h-6 w-6" />
                                            <ChevronRight className="text-muted-foreground h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium">Koi Utilities</h3>
                                            <p className="text-muted-foreground mt-1 text-sm">Manage gender and breed of kois.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* System Utilities Card (Upcoming) */}
                            <Card className="bg-muted/50 h-full border">
                                <CardContent className="flex h-full flex-col p-6">
                                    <div className="mb-4">
                                        <Wrench className="text-muted-foreground h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-muted-foreground text-lg font-medium">System Utilities</h3>
                                        <p className="text-muted-foreground mt-1 text-sm">Coming soon</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Reporting Utilities Card (Upcoming) */}
                            <Card className="bg-muted/50 h-full border">
                                <CardContent className="flex h-full flex-col p-6">
                                    <div className="mb-4">
                                        <FileText className="text-muted-foreground h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-muted-foreground text-lg font-medium">Reporting</h3>
                                        <p className="text-muted-foreground mt-1 text-sm">Coming soon</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
