<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Emprunt extends Model
{
    protected $fillable = [
        'livre_id',
        'lecteur_id',
        'date_emprunt',
        'date_retour_prevue',
        'date_retour_reelle'
    ];

    public function livre()
    {
        return $this->belongsTo(Livre::class);
    }

    public function lecteur()
    {
        return $this->belongsTo(Lecteur::class);
    }
}
