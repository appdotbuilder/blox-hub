import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Script {
    id: number;
    title: string;
    game_title: string;
    thumbnail_url: string | null;
    type: 'free' | 'premium';
}

interface PremiumPackage {
    id: number;
    name: string;
    duration_days: number;
    price: string;
    description: string | null;
}

interface Props {
    featuredPremiumScripts: Script[];
    featuredFreeScripts: Script[];
    premiumPackages: PremiumPackage[];
    [key: string]: unknown;
}

export default function Welcome({ featuredPremiumScripts, featuredFreeScripts, premiumPackages }: Props) {
    return (
        <>
            <Head title="BloxHub - Premium Roblox Scripts" />
            
            {/* Dark Purple Theme */}
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
                                <Link href="/premium" className="text-purple-100 hover:text-white transition-colors">
                                    Go Premium
                                </Link>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link href="/login">
                                    <Button variant="ghost" className="text-purple-100 hover:text-white hover:bg-purple-800">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="py-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            🚀 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                BloxHub
                            </span> 🎮
                        </h1>
                        <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-2xl mx-auto">
                            The ultimate destination for premium Roblox scripts. Unlock powerful exploits, auto-farms, and game-breaking features!
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/get-free-key">
                                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-lg px-8 py-4">
                                    🔑 Get Free Key
                                </Button>
                            </Link>
                            <Link href="/premium">
                                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-4">
                                    💎 Buy Premium
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Featured Premium Scripts */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                ⭐ Featured Premium Scripts
                            </h2>
                            <p className="text-purple-200 text-lg">
                                Unlock these powerful scripts with premium access
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {featuredPremiumScripts.map((script) => (
                                <Card key={script.id} className="bg-purple-900/30 border-purple-700 backdrop-blur-sm hover:bg-purple-900/40 transition-all">
                                    <CardHeader>
                                        <div className="aspect-video bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mb-4 flex items-center justify-center">
                                            {script.thumbnail_url ? (
                                                <img
                                                    src={script.thumbnail_url}
                                                    alt={script.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <span className="text-white text-sm">{script.game_title}</span>
                                            )}
                                        </div>
                                        <CardTitle className="text-white">{script.title}</CardTitle>
                                        <CardDescription className="text-purple-300">
                                            {script.game_title}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href={`/scripts/${script.id}`}>
                                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                                View Script
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Free Scripts */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                🆓 Featured Free Scripts
                            </h2>
                            <p className="text-purple-200 text-lg">
                                Try these free scripts to get started
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {featuredFreeScripts.map((script) => (
                                <Card key={script.id} className="bg-emerald-900/30 border-emerald-700 backdrop-blur-sm hover:bg-emerald-900/40 transition-all">
                                    <CardHeader>
                                        <div className="aspect-video bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg mb-4 flex items-center justify-center">
                                            {script.thumbnail_url ? (
                                                <img
                                                    src={script.thumbnail_url}
                                                    alt={script.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <span className="text-white text-sm">{script.game_title}</span>
                                            )}
                                        </div>
                                        <CardTitle className="text-white">{script.title}</CardTitle>
                                        <CardDescription className="text-emerald-300">
                                            {script.game_title}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href={`/scripts/${script.id}`}>
                                            <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
                                                View Script
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Premium Packages */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                💎 Premium Packages
                            </h2>
                            <p className="text-purple-200 text-lg">
                                Choose the perfect package for your needs
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {premiumPackages.map((pkg) => (
                                <Card key={pkg.id} className="bg-gradient-to-b from-purple-900/50 to-pink-900/50 border-purple-600 backdrop-blur-sm hover:scale-105 transition-all">
                                    <CardHeader className="text-center">
                                        <CardTitle className="text-2xl text-white">{pkg.name}</CardTitle>
                                        <CardDescription className="text-purple-300">
                                            {pkg.description}
                                        </CardDescription>
                                        <div className="py-4">
                                            <div className="text-4xl font-bold text-white">${pkg.price}</div>
                                            <div className="text-purple-300">for {pkg.duration_days} days</div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 mb-6 text-purple-200">
                                            <div className="flex items-center">
                                                <span className="text-green-400 mr-2">✓</span>
                                                Unlimited script downloads
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-green-400 mr-2">✓</span>
                                                10 premium keys per purchase
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-green-400 mr-2">✓</span>
                                                Ad-free experience
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-green-400 mr-2">✓</span>
                                                Discord premium role
                                            </div>
                                        </div>
                                        
                                        <Link href="/premium">
                                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg">
                                                Choose Plan
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-purple-950/50 border-t border-purple-700/50 py-12 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="mb-8">
                            <Link href="/" className="inline-flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">BH</span>
                                </div>
                                <span className="text-white font-bold text-2xl">BloxHub</span>
                            </Link>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            <div>
                                <h4 className="text-white font-semibold mb-4">Scripts</h4>
                                <div className="space-y-2">
                                    <Link href="/scripts/free" className="block text-purple-300 hover:text-white transition-colors">
                                        Free Scripts
                                    </Link>
                                    <Link href="/scripts/premium" className="block text-purple-300 hover:text-white transition-colors">
                                        Premium Scripts
                                    </Link>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-white font-semibold mb-4">Premium</h4>
                                <div className="space-y-2">
                                    <Link href="/premium" className="block text-purple-300 hover:text-white transition-colors">
                                        Go Premium
                                    </Link>
                                    <Link href="/get-free-key" className="block text-purple-300 hover:text-white transition-colors">
                                        Get Free Key
                                    </Link>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-white font-semibold mb-4">Account</h4>
                                <div className="space-y-2">
                                    <Link href="/login" className="block text-purple-300 hover:text-white transition-colors">
                                        Login
                                    </Link>
                                    <Link href="/register" className="block text-purple-300 hover:text-white transition-colors">
                                        Register
                                    </Link>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-white font-semibold mb-4">Support</h4>
                                <div className="space-y-2">
                                    <a href="#" className="block text-purple-300 hover:text-white transition-colors">
                                        Discord Server
                                    </a>
                                    <a href="#" className="block text-purple-300 hover:text-white transition-colors">
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-purple-700/50 pt-8">
                            <p className="text-purple-300">
                                © 2024 BloxHub. All rights reserved. 🚀 Built for the Roblox community.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}