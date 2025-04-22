import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, CornerDownRight, VenusAndMars } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Utilities',
        href: '/utilities',
    },
    {
        title: 'Koi Utilities',
        href: '/utilities/kois',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pond Utilities" />
            <div className="container mx-auto p-4">
                <Card className="border shadow-none">
                    <CardHeader>
                        <div className="space-y-1">
                            <h1 className="text-xl font-semibold">Koi Utilities</h1>
                            <p className="text-muted-foreground text-sm">‣ Manage koi-related utilities and configurations.</p>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {/* UserRoles */}
                            <Link href="userUtilities/userRoles" className="group">
                                <Card className="group-hover:border-primary h-full transition-all duration-200 hover:shadow-sm">
                                    <CardContent className="flex h-full flex-col p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <VenusAndMars className="text-primary h-6 w-6" />
                                            <ChevronRight className="text-muted-foreground h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium">Gender</h3>
                                            <p className="text-muted-foreground mt-1 text-sm">‣ Manage kois gender.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* Add New Utility (Placeholder) */}
                            <Card className="bg-muted/50 h-full border">
                                <CardContent className="flex h-full flex-col p-6">
                                    <div className="mb-4">
                                        <CornerDownRight className="text-muted-foreground h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-muted-foreground text-lg font-medium">New Utilities</h3>
                                        <p className="text-muted-foreground mt-1 text-sm">‣ Coming soon</p>
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
