<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\PremiumPackage
 *
 * @property int $id
 * @property string $name
 * @property int $duration_days
 * @property string $price
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Purchase[] $purchases
 * @property-read int|null $purchases_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage query()
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage whereDurationDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PremiumPackage active()
 * @method static \Database\Factories\PremiumPackageFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PremiumPackage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'duration_days',
        'price',
        'description',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'duration_days' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the purchases for this package.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    /**
     * Scope a query to only include active packages.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}