<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Lecteur extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone'
    ];

    public function emprunts(): HasMany
    {
        return $this->hasMany(Emprunt::class);
    }

    public function livres(): BelongsToMany
    {
        return $this->belongsToMany(Livre::class, 'emprunts')
                    ->withPivot('date_emprunt', 'date_retour_prevue', 'date_retour_reelle')
                    ->withTimestamps();
    }
}
