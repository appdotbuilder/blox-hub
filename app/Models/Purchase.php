<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Purchase
 *
 * @property int $id
 * @property int $user_id
 * @property int $premium_package_id
 * @property string|null $paypal_transaction_id
 * @property string $amount
 * @property string $status
 * @property array|null $paypal_response
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PremiumPackage $premiumPackage
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase query()
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase wherePaypalResponse($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase wherePaypalTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase wherePremiumPackageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase completed()
 * @method static \Database\Factories\PurchaseFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Purchase extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'premium_package_id',
        'paypal_transaction_id',
        'amount',
        'status',
        'paypal_response',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'paypal_response' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that made the purchase.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the premium package that was purchased.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function premiumPackage(): BelongsTo
    {
        return $this->belongsTo(PremiumPackage::class);
    }

    /**
     * Scope a query to only include completed purchases.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}