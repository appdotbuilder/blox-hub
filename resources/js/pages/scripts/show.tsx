import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Script {
    id: number;
    title: string;
    game_title: string;
    thumbnail_url: string | null;
    script_code: string;
    type: 'free' | 'premium';
    created_at: string;
}

interface Props {
    script: Script;
    [key: string]: unknown;
}

export default function ShowScript({ script }: Props) {
    const [copied, setCopied] = useState(false);

    const copyScript = () => {
        navigator.clipboard.writeText(script.script_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isPremium = script.type === 'premium';

    return (
        <>
            <Head title={`${script.title} - BloxHub`} />
            
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

                {/* Back Button */}
                <div className="py-4 px-4">
                    <div className="max-w-4xl mx-auto">
                        <Link 
                            href={isPremium ? '/scripts/premium' : '/scripts/free'}
                            className="inline-flex items-center text-purple-300 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to {isPremium ? 'Premium' : 'Free'} Scripts
                        </Link>
                    </div>
                </div>

                {/* Script Details */}
                <div className="py-8 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Script Info */}
                            <div className="lg:col-span-1">
                                <Card className={`${isPremium ? 'bg-purple-900/30 border-purple-700' : 'bg-emerald-900/30 border-emerald-700'} backdrop-blur-sm`}>
                                    <CardHeader>
                                        <div className={`aspect-video ${isPremium ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-emerald-600 to-green-600'} rounded-lg mb-4 flex items-center justify-center overflow-hidden`}>
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
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${isPremium ? 'bg-purple-600 text-white' : 'bg-emerald-600 text-white'}`}>
                                                {isPremium ? '💎 PREMIUM' : '🆓 FREE'}
                                            </span>
                                        </div>
                                        <CardTitle className="text-white text-xl">{script.title}</CardTitle>
                                        <CardDescription className={isPremium ? 'text-purple-300' : 'text-emerald-300'}>
                                            {script.game_title}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="text-sm">
                                                <span className="text-purple-300">Type:</span>
                                                <span className="text-white ml-2 capitalize">{script.type}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="text-purple-300">Game:</span>
                                                <span className="text-white ml-2">{script.game_title}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="text-purple-300">Added:</span>
                                                <span className="text-white ml-2">
                                                    {new Date(script.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {isPremium && (
                                            <div className="mt-6 p-4 bg-purple-800/30 rounded-lg">
                                                <h4 className="text-white font-semibold mb-2">🔐 Premium Script</h4>
                                                <p className="text-purple-300 text-sm mb-3">
                                                    This script requires premium access. Get instant access with no ads!
                                                </p>
                                                <Link href="/premium">
                                                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                                        💎 Upgrade to Premium
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Script Code */}
                            <div className="lg:col-span-2">
                                <Card className={`${isPremium ? 'bg-purple-900/30 border-purple-700' : 'bg-emerald-900/30 border-emerald-700'} backdrop-blur-sm`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-white">📝 Script Code</CardTitle>
                                            <Button
                                                onClick={copyScript}
                                                className={`${isPremium ? 'bg-purple-600 hover:bg-purple-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
                                            >
                                                {copied ? '✅ Copied!' : '📋 Copy Script'}
                                            </Button>
                                        </div>
                                        <CardDescription className={isPremium ? 'text-purple-300' : 'text-emerald-300'}>
                                            Copy this code and paste it into your Roblox executor
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="code-block bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto scrollbar-purple">
                                            <pre className="text-emerald-400 whitespace-pre-wrap break-words">
                                                {script.script_code}
                                            </pre>
                                        </div>

                                        {/* Usage Instructions */}
                                        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                                            <h4 className="text-white font-semibold mb-3">🚀 How to Use</h4>
                                            <ol className="text-blue-200 text-sm space-y-2 list-decimal list-inside">
                                                <li>Copy the script code above</li>
                                                <li>Open your favorite Roblox executor (Synapse X, KRNL, etc.)</li>
                                                <li>Paste the code into the executor</li>
                                                <li>Join {script.game_title} on Roblox</li>
                                                <li>Execute the script and enjoy!</li>
                                            </ol>
                                        </div>

                                        {/* Warning */}
                                        <div className="mt-4 p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                                            <h4 className="text-red-300 font-semibold mb-2">⚠️ Important Notice</h4>
                                            <p className="text-red-200 text-sm">
                                                Use scripts responsibly. BloxHub is not responsible for any account actions taken by Roblox. 
                                                Always use scripts at your own risk and consider the game's terms of service.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Scripts CTA */}
                <div className="py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Looking for More Scripts? 🔍
                        </h2>
                        <p className="text-xl text-purple-200 mb-8">
                            Discover more amazing scripts for {script.game_title} and other popular games
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/scripts/free">
                                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-lg px-8 py-4">
                                    🆓 Browse Free Scripts
                                </Button>
                            </Link>
                            {!isPremium && (
                                <Link href="/scripts/premium">
                                    <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-4">
                                        💎 View Premium Scripts
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}