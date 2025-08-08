<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SiteSetting
 *
 * @property int $id
 * @property string $key
 * @property string|null $value
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SiteSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SiteSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SiteSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|SiteSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SiteSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SiteSetting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SiteSetting whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SiteSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SiteSetting whereValue($value)
 * @method static \Database\Factories\SiteSettingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class SiteSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'key',
        'value',
        'type',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get a setting value by key.
     *
     * @param  string  $key
     * @param  mixed  $default
     * @return mixed
     */
    public static function get(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        
        if (!$setting) {
            return $default;
        }

        return match($setting->type) {
            'json' => json_decode($setting->value, true),
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            'number' => is_numeric($setting->value) ? $setting->value + 0 : $default,
            default => $setting->value,
        };
    }

    /**
     * Set a setting value.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @param  string  $type
     * @return void
     */
    public static function set(string $key, $value, string $type = 'text'): void
    {
        $processedValue = match($type) {
            'json' => json_encode($value),
            'boolean' => $value ? '1' : '0',
            default => (string) $value,
        };

        static::updateOrCreate(
            ['key' => $key],
            ['value' => $processedValue, 'type' => $type]
        );
    }
}