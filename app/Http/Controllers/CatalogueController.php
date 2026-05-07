<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use Illuminate\Http\Request;

class CatalogueController extends Controller
{
    public function index()
    {
        $livres = Livre::orderBy('created_at', 'desc')->get();
        
        // Ajout du statut virtuel attendu par le frontend
        $livres = $livres->map(function ($livre) {
            $livre->statut = $livre->quantite_disponible > 0 ? 'Disponible' : 'Indisponible';
            return $livre;
        });
        
        return response()->json($livres);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'auteur' => 'required|string|max:255',
            'isbn' => 'nullable|string|unique:livres,isbn|max:20',
            'annee_publication' => 'nullable|integer',
            'quantite_disponible' => 'nullable|integer|min:0'
        ]);

        if (!isset($validated['quantite_disponible'])) {
            $validated['quantite_disponible'] = 1;
        }

        $livre = Livre::create($validated);
        $livre->statut = $livre->quantite_disponible > 0 ? 'Disponible' : 'Indisponible';

        return response()->json($livre, 201);
    }
}
