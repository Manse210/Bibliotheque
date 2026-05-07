<?php

namespace App\Http\Controllers;

use App\Models\Emprunt;
use App\Models\Livre;
use Illuminate\Http\Request;
use Carbon\Carbon;

class EmpruntController extends Controller
{
    // Récupérer tous les emprunts
    public function index()
    {
        $emprunts = Emprunt::with(['lecteur', 'livre'])->get();
        return response()->json($emprunts);
    }

    // Créer un nouvel emprunt
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lecteur_id' => 'required|exists:lecteurs,id',
            'livre_id' => 'required|exists:livres,id',
            'date_emprunt' => 'required|date',
            'date_retour_prevue' => 'required|date|after:date_emprunt'
        ]);

        // Vérifier si le livre est disponible
        $livre = Livre::find($validated['livre_id']);
        if (!$livre->disponible) {
            return response()->json([
                'message' => 'Ce livre n\'est pas disponible'
            ], 400);
        }

        $emprunt = Emprunt::create($validated);
        
        // Marquer le livre comme indisponible
        $livre->update(['disponible' => false]);

        return response()->json($emprunt->load(['lecteur', 'livre']), 201);
    }

    // Afficher un emprunt spécifique
    public function show($id)
    {
        $emprunt = Emprunt::with(['lecteur', 'livre'])->findOrFail($id);
        return response()->json($emprunt);
    }

    // Mettre à jour un emprunt
    public function update(Request $request, $id)
    {
        $emprunt = Emprunt::findOrFail($id);
        
        $validated = $request->validate([
            'date_retour_prevue' => 'sometimes|date|after:date_emprunt',
            'lecteur_id' => 'sometimes|exists:lecteurs,id',
            'livre_id' => 'sometimes|exists:livres,id'
        ]);

        $emprunt->update($validated);
        return response()->json($emprunt->load(['lecteur', 'livre']));
    }

    // Marquer un emprunt comme retourné
    public function retour($id)
    {
        $emprunt = Emprunt::findOrFail($id);
        
        if ($emprunt->date_retour_reelle) {
            return response()->json([
                'message' => 'Ce livre a déjà été retourné'
            ], 400);
        }
        
        $emprunt->update([
            'date_retour_reelle' => Carbon::now()
        ]);
        
        // Marquer le livre comme disponible
        $emprunt->livre->update(['disponible' => true]);
        
        return response()->json($emprunt);
    }

    // Supprimer un emprunt
    public function destroy($id)
    {
        $emprunt = Emprunt::findOrFail($id);
        
        // Si l'emprunt n'a pas été retourné, rendre le livre disponible
        if (!$emprunt->date_retour_reelle) {
            $emprunt->livre->update(['disponible' => true]);
        }
        
        $emprunt->delete();
        return response()->json(null, 204);
    }
}