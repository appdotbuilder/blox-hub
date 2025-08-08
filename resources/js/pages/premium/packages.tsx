import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PremiumPackage {
    id: number;
    name: string;
    duration_days: number;
    price: string;
    description: string | null;
}

interface Props {
    packages: PremiumPackage[];
    [key: string]: unknown;
}

export default function PremiumPackages({ packages }: Props) {
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [email, setEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePurchase = (packageId: number) => {
        if (!email) {
            alert('Please enter your email address');
            return;
        }

        setIsProcessing(true);
        router.post('/premium', { email, package_id: packageId }, {
            onFinish: () => setIsProcessing(false),
        });
    };

    return (
        <>
            <Head title="Premium Packages - BloxHub" />
            
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
                                <Link href="/premium" className="text-white font-semibold">
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
                <div className="py-12 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            💎 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Go Premium
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-purple-200 mb-8">
                            Unlock unlimited access to powerful Roblox scripts and premium features
                        </p>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="py-8 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-6">🚀 Premium Benefits</h2>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            <div className="bg-purple-800/30 rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="text-white font-semibold mb-2">Instant Access</h3>
                                <p className="text-purple-300 text-sm">No ads, no waiting. Get your keys instantly</p>
                            </div>
                            <div className="bg-purple-800/30 rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">🔐</div>
                                <h3 className="text-white font-semibold mb-2">10 Premium Keys</h3>
                                <p className="text-purple-300 text-sm">Get 10 keys with every purchase for maximum value</p>
                            </div>
                            <div className="bg-purple-800/30 rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-white font-semibold mb-2">Exclusive Scripts</h3>
                                <p className="text-purple-300 text-sm">Access to premium-only scripts with advanced features</p>
                            </div>
                            <div className="bg-purple-800/30 rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">👑</div>
                                <h3 className="text-white font-semibold mb-2">Discord Role</h3>
                                <p className="text-purple-300 text-sm">Get premium role and access to VIP channels</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Packages */}
                <div className="py-8 px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Package</h2>
                            <p className="text-purple-200">All packages include the same premium features</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {packages.map((pkg, index) => (
                                <Card 
                                    key={pkg.id} 
                                    className={`relative overflow-hidden transition-all ${
                                        index === 1 
                                            ? 'bg-gradient-to-b from-purple-900/70 to-pink-900/70 border-purple-500 scale-105' 
                                            : 'bg-gradient-to-b from-purple-900/50 to-pink-900/50 border-purple-600 hover:scale-105'
                                    }`}
                                >
                                    {index === 1 && (
                                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold">
                                            🔥 MOST POPULAR
                                        </div>
                                    )}
                                    <CardHeader className={`text-center ${index === 1 ? 'pt-12' : ''}`}>
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
                                                10 Premium Keys
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-green-400 mr-2">✓</span>
                                                Unlimited Downloads
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-green-400 mr-2">✓</span>
                                                No Ads Experience
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-green-400 mr-2">✓</span>
                                                Discord Premium Role
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-green-400 mr-2">✓</span>
                                                24/7 Support Access
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-green-400 mr-2">✓</span>
                                                Email Key Delivery
                                            </div>
                                        </div>
                                        
                                        <Button 
                                            onClick={() => setSelectedPackage(pkg.id)}
                                            className={`w-full text-white text-lg ${
                                                index === 1
                                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                                            }`}
                                        >
                                            Select Package
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Purchase Form */}
                        {selectedPackage && (
                            <Card className="bg-purple-900/30 border-purple-700 backdrop-blur-sm max-w-md mx-auto">
                                <CardHeader>
                                    <CardTitle className="text-white text-center">Complete Your Purchase</CardTitle>
                                    <CardDescription className="text-purple-300 text-center">
                                        Enter your email to proceed to payment
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-purple-200 text-sm font-medium mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="w-full px-3 py-2 bg-purple-800/50 border border-purple-600 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() => setSelectedPackage(null)}
                                                className="flex-1 border-purple-600 text-purple-300 hover:bg-purple-800/50"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() => handlePurchase(selectedPackage)}
                                                disabled={isProcessing || !email}
                                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                                            >
                                                {isProcessing ? '⏳ Processing...' : '💳 Proceed to Payment'}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white text-center mb-12">❓ Frequently Asked Questions</h2>
                        
                        <div className="space-y-6">
                            <div className="bg-purple-900/30 rounded-lg p-6">
                                <h3 className="text-white font-semibold mb-2">How do I use my premium keys?</h3>
                                <p className="text-purple-300">After purchase, you'll receive 10 premium keys via email. Use these keys to access any premium script on our platform.</p>
                            </div>
                            
                            <div className="bg-purple-900/30 rounded-lg p-6">
                                <h3 className="text-white font-semibold mb-2">What happens when my premium expires?</h3>
                                <p className="text-purple-300">You'll lose access to premium scripts, but any keys you still have will remain valid until you use them.</p>
                            </div>
                            
                            <div className="bg-purple-900/30 rounded-lg p-6">
                                <h3 className="text-white font-semibold mb-2">Can I share my premium keys?</h3>
                                <p className="text-purple-300">Keys are tied to your account, but you can use them on multiple devices. Sharing keys may result in account suspension.</p>
                            </div>
                            
                            <div className="bg-purple-900/30 rounded-lg p-6">
                                <h3 className="text-white font-semibold mb-2">Do you offer refunds?</h3>
                                <p className="text-purple-300">We offer refunds within 24 hours of purchase if no keys have been used. Contact support for assistance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}