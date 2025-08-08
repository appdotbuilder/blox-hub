import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
    name: string;
    email: string;
    role: 'admin' | 'premium' | 'free';
    premium_expires_at?: string;
}

interface Props {
    auth: {
        user: User;
    };
    [key: string]: unknown;
}

export default function Dashboard({ auth }: Props) {
    const { user } = auth;
    const isPremium = user.role === 'premium';
    const isAdmin = user.role === 'admin';

    return (
        <>
            <Head title="Dashboard - BloxHub" />
            
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
                                    <span className="text-white font-bold text-xl">BloxHub</span>
                                </Link>
                            </div>
                            
                            <div className="hidden md:flex items-center space-x-6">
                                <Link href="/" className="text-purple-100 hover:text-white transition-colors">
                                    Home
                                </Link>
                                <Link href="/scripts/free" className="text-purple-100 hover:text-white transition-colors">
                                    Free Scripts
                                </Link>
                                <Link href="/scripts/premium" className="text-purple-100 hover:text-white transition-colors">
                                    Premium Scripts
                                </Link>
                                <Link href="/get-free-key" className="text-purple-100 hover:text-white transition-colors">
                                    Get Free Key
                                </Link>
                                <Link href="/dashboard" className="text-white font-semibold">
                                    Dashboard
                                </Link>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-purple-200">Hello, {user.name}!</span>
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
                    <div className="max-w-4xl mx-auto">
                        {/* Welcome Section */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Welcome to your Dashboard! 👋
                            </h1>
                            <p className="text-xl text-purple-200">
                                {isPremium ? (
                                    <>💎 You have premium access! Enjoy unlimited scripts.</>
                                ) : (
                                    <>🆓 You're on the free plan. Upgrade to premium for more features!</>
                                )}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Account Status */}
                            <Card className="bg-purple-900/30 border-purple-700 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        {isPremium ? '💎' : '👤'} Account Status
                                    </CardTitle>
                                    <CardDescription className="text-purple-300">
                                        Your current account information
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-purple-300">Name:</span>
                                            <span className="text-white">{user.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-purple-300">Email:</span>
                                            <span className="text-white">{user.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-purple-300">Plan:</span>
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                isPremium ? 'bg-purple-600 text-white' : 
                                                isAdmin ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'
                                            }`}>
                                                {isAdmin ? '👑 ADMIN' : isPremium ? '💎 PREMIUM' : '🆓 FREE'}
                                            </span>
                                        </div>
                                        {isPremium && user.premium_expires_at && (
                                            <div className="flex justify-between">
                                                <span className="text-purple-300">Expires:</span>
                                                <span className="text-white">
                                                    {new Date(user.premium_expires_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="bg-emerald-900/30 border-emerald-700 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-white">🚀 Quick Actions</CardTitle>
                                    <CardDescription className="text-emerald-300">
                                        Get started with these popular actions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Link href="/scripts/free">
                                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white">
                                            🆓 Browse Free Scripts
                                        </Button>
                                    </Link>
                                    
                                    {isPremium ? (
                                        <Link href="/scripts/premium">
                                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                                                💎 Browse Premium Scripts
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href="/premium">
                                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                                                💎 Upgrade to Premium
                                            </Button>
                                        </Link>
                                    )}
                                    
                                    <Link href="/get-free-key">
                                        <Button variant="outline" className="w-full border-emerald-600 text-emerald-300 hover:bg-emerald-800/50">
                                            🔑 Get Free Key
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Premium Benefits */}
                            {!isPremium && (
                                <Card className="md:col-span-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-600 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-white text-center">💎 Upgrade to Premium</CardTitle>
                                        <CardDescription className="text-purple-300 text-center">
                                            Unlock powerful features and premium scripts
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-3xl mb-2">⚡</div>
                                                <h4 className="text-white font-semibold mb-1">Instant Access</h4>
                                                <p className="text-purple-300 text-sm">No ads, no waiting time</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl mb-2">🔐</div>
                                                <h4 className="text-white font-semibold mb-1">10 Premium Keys</h4>
                                                <p className="text-purple-300 text-sm">Get 10 keys per purchase</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl mb-2">🎯</div>
                                                <h4 className="text-white font-semibold mb-1">Exclusive Scripts</h4>
                                                <p className="text-purple-300 text-sm">Access premium-only content</p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <Link href="/premium">
                                                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-4">
                                                    💎 Go Premium Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Admin Panel Access */}
                            {isAdmin && (
                                <Card className="md:col-span-2 bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-600 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-white text-center">👑 Admin Panel</CardTitle>
                                        <CardDescription className="text-red-300 text-center">
                                            Manage scripts, users, and site settings
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-3xl mb-2">📝</div>
                                                <h4 className="text-white font-semibold mb-1">Script Management</h4>
                                                <p className="text-red-300 text-sm">Create and manage scripts</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl mb-2">👥</div>
                                                <h4 className="text-white font-semibold mb-1">User Management</h4>
                                                <p className="text-red-300 text-sm">View and manage users</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl mb-2">⚙️</div>
                                                <h4 className="text-white font-semibold mb-1">Site Settings</h4>
                                                <p className="text-red-300 text-sm">Configure platform settings</p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <Link href="/admin">
                                                <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-lg px-8 py-4">
                                                    👑 Access Admin Panel
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}