<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Livre extends Model
{
    protected $fillable = [
        'titre',
        'auteur',
        'isbn',
        'annee_publication',
        'quantite_disponible',
        'disponible'
    ];

    public function emprunts(): HasMany
    {
        return $this->hasMany(Emprunt::class);
    }
}
