<?php

namespace App\Http\Controllers;

use App\Models\Lecteur;
use Illuminate\Http\Request;

class LecteurController extends Controller
{
    public function index()
    {
        $lecteurs = Lecteur::withCount('emprunts')->get();
        return response()->json($lecteurs);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:lecteurs,email',
            'telephone' => 'nullable|string|max:20'
        ]);

        $lecteur = Lecteur::create($validated);
        $lecteur->emprunts_count = 0;

        return response()->json($lecteur, 201);
    }

    public function show($id)
    {
        $lecteur = Lecteur::withCount('emprunts')->findOrFail($id);
        return response()->json($lecteur);
    }

    public function update(Request $request, $id)
    {
        $lecteur = Lecteur::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'prenom' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:lecteurs,email,' . $lecteur->id,
            'telephone' => 'nullable|string|max:20'
        ]);

        $lecteur->update($validated);
        $lecteur->loadCount('emprunts');
        
        return response()->json($lecteur);
    }

    public function destroy($id)
    {
        $lecteur = Lecteur::findOrFail($id);
        $lecteur->delete();
        return response()->json(null, 204);
    }
}