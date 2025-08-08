import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Stats {
    total_users: number;
    premium_users: number;
    total_scripts: number;
    premium_scripts: number;
    free_scripts: number;
    active_keys: number;
    total_revenue: string;
    recent_purchases: Purchase[];
}

interface Purchase {
    id: number;
    amount: string;
    created_at: string;
    user?: {
        name: string;
    };
    premium_package?: {
        name: string;
    };
}

interface Props {
    stats: Stats;
    [key: string]: unknown;
}

export default function AdminDashboard({ stats }: Props) {
    return (
        <>
            <Head title="Admin Dashboard - BloxHub" />
            
            <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950">
                {/* Navigation */}
                <nav className="bg-purple-900/50 backdrop-blur-sm border-b border-purple-700/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">BH</span>
                                    </div>
                                    <span className="text-white font-bold text-xl">BloxHub Admin</span>
                                </Link>
                            </div>
                            
                            <div className="hidden md:flex items-center space-x-6">
                                <Link href="/admin" className="text-white font-semibold">
                                    Dashboard
                                </Link>
                                <Link href="/admin/scripts" className="text-purple-100 hover:text-white transition-colors">
                                    Scripts
                                </Link>
                                <Link href="/admin/settings" className="text-purple-100 hover:text-white transition-colors">
                                    Settings
                                </Link>
                                <Link href="/dashboard" className="text-purple-100 hover:text-white transition-colors">
                                    User Dashboard
                                </Link>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link 
                                    href="/logout" 
                                    method="post" 
                                    as="button"
                                >
                                    <Button variant="ghost" className="text-purple-100 hover:text-white hover:bg-purple-800">
                                        Logout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                👑 Admin Dashboard
                            </h1>
                            <p className="text-xl text-purple-200">
                                Manage your BloxHub platform from here
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <Card className="bg-blue-900/30 border-blue-700 backdrop-blur-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-blue-300 text-sm font-medium">Total Users</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-white">{stats.total_users}</div>
                                    <div className="text-blue-300 text-sm">
                                        {stats.premium_users} premium users
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-emerald-900/30 border-emerald-700 backdrop-blur-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-emerald-300 text-sm font-medium">Scripts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-white">{stats.total_scripts}</div>
                                    <div className="text-emerald-300 text-sm">
                                        {stats.premium_scripts} premium, {stats.free_scripts} free
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-purple-900/30 border-purple-700 backdrop-blur-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-purple-300 text-sm font-medium">Active Keys</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-white">{stats.active_keys}</div>
                                    <div className="text-purple-300 text-sm">
                                        Premium keys in use
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-green-900/30 border-green-700 backdrop-blur-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-green-300 text-sm font-medium">Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-white">${stats.total_revenue}</div>
                                    <div className="text-green-300 text-sm">
                                        Total earnings
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            <Card className="bg-purple-900/30 border-purple-700 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        📝 Script Management
                                    </CardTitle>
                                    <CardDescription className="text-purple-300">
                                        Create, edit, and manage scripts
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Link href="/admin/scripts">
                                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                            View All Scripts
                                        </Button>
                                    </Link>
                                    <Link href="/admin/scripts/create">
                                        <Button variant="outline" className="w-full border-purple-600 text-purple-300 hover:bg-purple-800/50">
                                            Add New Script
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card className="bg-blue-900/30 border-blue-700 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        ⚙️ Site Settings
                                    </CardTitle>
                                    <CardDescription className="text-blue-300">
                                        Configure platform settings
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Link href="/admin/settings">
                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                                            Site Configuration
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className="w-full border-blue-600 text-blue-300 hover:bg-blue-800/50">
                                        PayPal Settings
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="bg-emerald-900/30 border-emerald-700 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        👥 User Management
                                    </CardTitle>
                                    <CardDescription className="text-emerald-300">
                                        View and manage users
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
                                        View Users
                                    </Button>
                                    <Button variant="outline" className="w-full border-emerald-600 text-emerald-300 hover:bg-emerald-800/50">
                                        Premium Users
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <Card className="bg-gray-900/30 border-gray-700 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">📊 Recent Purchases</CardTitle>
                                <CardDescription className="text-gray-300">
                                    Latest premium package purchases
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {stats.recent_purchases.length > 0 ? (
                                    <div className="space-y-4">
                                        {stats.recent_purchases.map((purchase: Purchase, index: number) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-purple-800/20 rounded-lg">
                                                <div>
                                                    <div className="text-white font-medium">{purchase.user?.name || 'Unknown User'}</div>
                                                    <div className="text-gray-300 text-sm">{purchase.premium_package?.name || 'Unknown Package'}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-green-400 font-semibold">${purchase.amount}</div>
                                                    <div className="text-gray-400 text-sm">
                                                        {new Date(purchase.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">💰</div>
                                        <div className="text-gray-300">No recent purchases</div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}