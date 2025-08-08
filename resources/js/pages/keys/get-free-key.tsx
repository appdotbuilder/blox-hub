import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GetFreeKey() {
    const [countdown, setCountdown] = useState(30);
    const [isAdVisible, setIsAdVisible] = useState(true);
    const [key, setKey] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (countdown > 0 && isAdVisible) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && isAdVisible) {
            setIsAdVisible(false);
        }
    }, [countdown, isAdVisible]);

    const fetchKey = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(route('keys.store'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            const data = await response.json();

            if (data.success) {
                setKey(data.key);
            } else {
                setError(data.message || 'Failed to fetch key');
            }
        } catch {
            setError('An error occurred while fetching the key');
        } finally {
            setIsLoading(false);
        }
    };

    const copyKey = () => {
        if (key) {
            navigator.clipboard.writeText(key);
            // You could show a toast notification here
        }
    };

    return (
        <>
            <Head title="Get Free Key - BloxHub" />
            
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
                                <Link href="/get-free-key" className="text-white font-semibold">
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

                {/* Main Content */}
                <div className="py-12 px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                🔑 Get Your Free Key
                            </h1>
                            <p className="text-xl text-purple-200">
                                Watch the ad and get your free access key
                            </p>
                        </div>

                        <Card className="bg-purple-900/30 border-purple-700 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white text-center">
                                    {isAdVisible ? '📺 Advertisement' : key ? '🎉 Your Free Key' : '⚡ Ready to Generate'}
                                </CardTitle>
                                <CardDescription className="text-purple-300 text-center">
                                    {isAdVisible 
                                        ? 'Please wait for the ad to finish before getting your key'
                                        : key 
                                        ? 'Copy your free key below and use it to access free scripts'
                                        : 'Click the button below to generate your free key'
                                    }
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="text-center">
                                {isAdVisible ? (
                                    <div className="space-y-6">
                                        {/* Ad Placeholder */}
                                        <div className="aspect-video bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                                            <div className="text-center">
                                                <div className="text-4xl mb-4">📺</div>
                                                <div className="text-white text-lg font-semibold">Advertisement</div>
                                                <div className="text-gray-300">This is where the 30-second ad would play</div>
                                            </div>
                                        </div>
                                        
                                        {/* Countdown */}
                                        <div className="bg-purple-800/50 rounded-lg p-6">
                                            <div className="text-3xl font-bold text-white mb-2">{countdown}</div>
                                            <div className="text-purple-300">seconds remaining</div>
                                            <div className="w-full bg-purple-700/50 rounded-full h-2 mt-4">
                                                <div 
                                                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                                                    style={{ width: `${((30 - countdown) / 30) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : key ? (
                                    <div className="space-y-6">
                                        {/* Key Display */}
                                        <div className="bg-emerald-900/30 border-2 border-emerald-600 rounded-lg p-6">
                                            <div className="text-emerald-300 text-sm mb-2">Your Free Key:</div>
                                            <div className="bg-black/50 rounded p-4 font-mono text-emerald-400 text-lg break-all">
                                                {key}
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-4">
                                            <Button
                                                onClick={copyKey}
                                                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                                            >
                                                📋 Copy Key
                                            </Button>
                                            <Link href="/scripts/free" className="flex-1">
                                                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                                    🚀 Use Key
                                                </Button>
                                            </Link>
                                        </div>
                                        
                                        <div className="text-sm text-purple-300 bg-purple-800/30 rounded-lg p-4">
                                            <div className="font-semibold mb-1">How to use your key:</div>
                                            <ol className="list-decimal list-inside space-y-1">
                                                <li>Copy the key above</li>
                                                <li>Go to any free script page</li>
                                                <li>Paste the key when prompted</li>
                                                <li>Enjoy your free script access!</li>
                                            </ol>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="text-6xl">🎯</div>
                                        <div className="text-white text-lg">
                                            The ad has finished! You can now generate your free key.
                                        </div>
                                        
                                        {error && (
                                            <div className="bg-red-900/30 border border-red-600 rounded-lg p-4 text-red-300">
                                                {error}
                                            </div>
                                        )}
                                        
                                        <Button
                                            onClick={fetchKey}
                                            disabled={isLoading}
                                            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 disabled:opacity-50"
                                        >
                                            {isLoading ? '⏳ Generating...' : '🔑 Generate Free Key'}
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Info Section */}
                        {!key && (
                            <div className="mt-8 text-center">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Why Premium? 💎
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-purple-800/30 rounded-lg p-4">
                                        <div className="text-purple-300">
                                            <div className="font-semibold mb-2">Free Keys</div>
                                            <div className="text-sm space-y-1">
                                                <div>• 30-second ad wait</div>
                                                <div>• Limited time access</div>
                                                <div>• Basic scripts only</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-lg p-4 border border-purple-500">
                                        <div className="text-white">
                                            <div className="font-semibold mb-2">Premium Keys</div>
                                            <div className="text-sm space-y-1">
                                                <div>• No ads, instant access</div>
                                                <div>• 10 keys per purchase</div>
                                                <div>• All premium scripts</div>
                                                <div>• Discord premium role</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <Link href="/premium" className="inline-block mt-6">
                                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3">
                                        💎 Upgrade to Premium
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}