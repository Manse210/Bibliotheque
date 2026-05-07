<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use App\Models\Lecteur;
use App\Models\Emprunt;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $totalLivres = Livre::count();
        $lecteursActifs = Lecteur::count();
        $empruntsEnCours = Emprunt::whereNull('date_retour_reelle')->count();
        $retoursAujourdhui = Emprunt::whereDate('date_retour_reelle', Carbon::today())->count();

        $livresDisponiblesCount = Livre::where('disponible', true)->count();
        $livresDispoPercent = $totalLivres > 0 ? round(($livresDisponiblesCount / $totalLivres) * 100) : 0;
        
        $enCoursDePretPercent = $totalLivres > 0 ? round(($empruntsEnCours / $totalLivres) * 100) : 0;

        $empruntsEnRetard = Emprunt::whereNull('date_retour_reelle')
            ->whereDate('date_retour_prevue', '<', Carbon::today())
            ->count();
        $enRetardPercent = $totalLivres > 0 ? round(($empruntsEnRetard / $totalLivres) * 100) : 0;

        // Dernières activités (basées sur les emprunts récents)
        $latestEmprunts = Emprunt::with(['lecteur', 'livre'])
            ->orderBy('updated_at', 'desc')
            ->take(5)
            ->get();

        $activites = [];
        foreach ($latestEmprunts as $emprunt) {
            // Si la date_retour_reelle est remplie, on considère que l'action récente était un retour
            if ($emprunt->date_retour_reelle) {
                $activites[] = [
                    'title' => 'Livre "' . $emprunt->livre->titre . '" retourné',
                    'user' => $emprunt->lecteur->prenom . ' ' . $emprunt->lecteur->nom,
                    'time' => $emprunt->updated_at->diffForHumans(),
                    'type' => 'Retour',
                    'color' => 'text-green-600 bg-green-50'
                ];
            } else {
                $activites[] = [
                    'title' => 'Livre "' . $emprunt->livre->titre . '" emprunté',
                    'user' => $emprunt->lecteur->prenom . ' ' . $emprunt->lecteur->nom,
                    'time' => $emprunt->created_at->diffForHumans(),
                    'type' => 'Emprunt',
                    'color' => 'text-blue-600 bg-blue-50'
                ];
            }
        }

        return response()->json([
            'stats' => [
                'total_livres' => $totalLivres,
                'lecteurs_actifs' => $lecteursActifs,
                'emprunts_en_cours' => $empruntsEnCours,
                'retours_aujourdhui' => $retoursAujourdhui,
            ],
            'stock' => [
                'disponibles_percent' => $livresDispoPercent,
                'en_pret_percent' => $enCoursDePretPercent,
                'en_retard_percent' => $enRetardPercent,
            ],
            'activites' => $activites
        ]);
    }
}
