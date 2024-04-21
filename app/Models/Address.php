<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'address', 'number', 'zip_code', 'complement', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
