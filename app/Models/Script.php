<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Script
 *
 * @property int $id
 * @property string $title
 * @property string $game_title
 * @property string|null $thumbnail_url
 * @property string $script_code
 * @property string $type
 * @property bool $is_featured
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Script newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Script newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Script query()
 * @method static \Illuminate\Database\Eloquent\Builder|Script whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Script whereGameTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Script whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Script whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Script whereScriptCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Script whereThumbnailUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Script whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Script whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Script whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Script free()
 * @method static \Illuminate\Database\Eloquent\Builder|Script premium()
 * @method static \Illuminate\Database\Eloquent\Builder|Script featured()
 * @method static \Database\Factories\ScriptFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Script extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'game_title',
        'thumbnail_url',
        'script_code',
        'type',
        'is_featured',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include free scripts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFree($query)
    {
        return $query->where('type', 'free');
    }

    /**
     * Scope a query to only include premium scripts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePremium($query)
    {
        return $query->where('type', 'premium');
    }

    /**
     * Scope a query to only include featured scripts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}