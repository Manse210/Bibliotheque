<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function emprunts()
    {
        return $this->hasMany(Emprunt::class);
    }
}
