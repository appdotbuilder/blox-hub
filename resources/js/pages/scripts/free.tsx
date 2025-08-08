import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Script {
    id: number;
    title: string;
    game_title: string;
    thumbnail_url: string | null;
    type: 'free' | 'premium';
    created_at: string;
}

interface PaginationData {
    current_page: number;
    last_page: number;
    data: Script[];
}

interface Props {
    scripts: PaginationData;
    search?: string;
    [key: string]: unknown;
}

export default function FreeScripts({ scripts, search }: Props) {
    const [searchQuery, setSearchQuery] = useState(search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/scripts/free', { search: searchQuery }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Free Roblox Scripts - BloxHub" />
            
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
                                <Link href="/scripts/free" className="text-white font-semibold">
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

                {/* Header */}
                <div className="py-12 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            🆓 Free Roblox Scripts
                        </h1>
                        <p className="text-xl text-purple-200 mb-8">
                            Discover amazing free scripts for your favorite Roblox games
                        </p>

                        {/* Search */}
                        <form onSubmit={handleSearch} className="max-w-md mx-auto">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search scripts or games..."
                                    className="flex-1 px-4 py-2 rounded-lg bg-purple-800/50 border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Scripts Grid */}
                <div className="py-8 px-4">
                    <div className="max-w-7xl mx-auto">
                        {scripts.data.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {scripts.data.map((script) => (
                                    <Card key={script.id} className="bg-emerald-900/30 border-emerald-700 backdrop-blur-sm hover:bg-emerald-900/40 transition-all">
                                        <CardHeader>
                                            <div className="aspect-video bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                                {script.thumbnail_url ? (
                                                    <img
                                                        src={script.thumbnail_url}
                                                        alt={script.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-white text-sm font-medium">{script.game_title}</span>
                                                )}
                                            </div>
                                            <CardTitle className="text-white text-lg">{script.title}</CardTitle>
                                            <CardDescription className="text-emerald-300">
                                                {script.game_title}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Link href={`/scripts/${script.id}`}>
                                                <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
                                                    📝 View Script
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-white mb-2">No scripts found</h3>
                                <p className="text-purple-300 mb-6">
                                    {search ? `No results for "${search}"` : 'No free scripts available yet'}
                                </p>
                                {search && (
                                    <Link href="/scripts/free">
                                        <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
                                            Clear Search
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* Pagination */}
                        {scripts.last_page > 1 && (
                            <div className="flex justify-center mt-8">
                                <div className="flex space-x-2">
                                    {Array.from({ length: scripts.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={`/scripts/free?page=${page}${search ? `&search=${search}` : ''}`}
                                        >
                                            <Button
                                                variant={page === scripts.current_page ? "default" : "outline"}
                                                className={page === scripts.current_page 
                                                    ? "bg-gradient-to-r from-emerald-500 to-green-500" 
                                                    : "border-emerald-600 text-emerald-300 hover:bg-emerald-800/50"
                                                }
                                            >
                                                {page}
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Want More Powerful Scripts? 🚀
                        </h2>
                        <p className="text-xl text-purple-200 mb-8">
                            Upgrade to premium and unlock advanced scripts with exclusive features!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/premium">
                                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-4">
                                    💎 Go Premium
                                </Button>
                            </Link>
                            <Link href="/get-free-key">
                                <Button size="lg" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-800/50 text-lg px-8 py-4">
                                    🔑 Get Free Key
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}