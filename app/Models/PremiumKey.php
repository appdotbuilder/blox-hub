<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\PremiumKey
 *
 * @property int $id
 * @property int $user_id
 * @property string $key
 * @property \Illuminate\Support\Carbon $expires_at
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey query()
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey active()
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumKey expired()
 * @method static \Database\Factories\PremiumKeyFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PremiumKey extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'key',
        'expires_at',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'expires_at' => 'datetime',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the premium key.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include active keys.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)->where('expires_at', '>', now());
    }

    /**
     * Scope a query to only include expired keys.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeExpired($query)
    {
        return $query->where('expires_at', '<=', now());
    }

    /**
     * Check if the key is currently active.
     *
     * @return bool
     */
    public function isCurrentlyActive(): bool
    {
        return $this->is_active && $this->expires_at->isFuture();
    }
}