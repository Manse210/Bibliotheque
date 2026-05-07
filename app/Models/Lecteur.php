<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecteur extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone'
    ];

    public function emprunts()
    {
        return $this->hasMany(Emprunt::class);
    }
}
