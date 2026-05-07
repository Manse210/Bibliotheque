<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Livre;
use App\Models\Lecteur;
use App\Models\Emprunt;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BibliothequeSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Emprunt::truncate();
        Lecteur::truncate();
        Livre::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Lecteurs
        $lecteurs = [
            ['nom' => 'Diallo', 'prenom' => 'Moussa', 'email' => 'moussa.diallo@email.com', 'telephone' => '771234567'],
            ['nom' => 'Sow', 'prenom' => 'Fatou', 'email' => 'fatou.sow@email.com', 'telephone' => '781234567'],
            ['nom' => 'Ndiaye', 'prenom' => 'Abdou', 'email' => 'abdou.ndiaye@email.com', 'telephone' => '761234567'],
            ['nom' => 'Gueye', 'prenom' => 'Awa', 'email' => 'awa.gueye@email.com', 'telephone' => '701234567'],
            ['nom' => 'Fall', 'prenom' => 'Ibrahima', 'email' => 'ibrahima.fall@email.com', 'telephone' => '751234567'],
        ];

        $lecteurIds = [];
        foreach ($lecteurs as $l) {
            $lecteurIds[] = Lecteur::create($l)->id;
        }

        // Livres (Catalogues)
        $livres = [
            ['titre' => 'Le Ventre de l\'Atlantique', 'auteur' => 'Fatou Diome', 'isbn' => '9782253108561', 'annee_publication' => 2003, 'quantite_disponible' => 5],
            ['titre' => 'Une si longue lettre', 'auteur' => 'Mariama Bâ', 'isbn' => '9782842612891', 'annee_publication' => 1979, 'quantite_disponible' => 3],
            ['titre' => 'Les Bouts de bois de Dieu', 'auteur' => 'Ousmane Sembène', 'isbn' => '9782266003310', 'annee_publication' => 1960, 'quantite_disponible' => 10],
            ['titre' => 'L\'Alchimiste', 'auteur' => 'Paulo Coelho', 'isbn' => '9782290004443', 'annee_publication' => 1988, 'quantite_disponible' => 7],
            ['titre' => 'Petit Pays', 'auteur' => 'Gaël Faye', 'isbn' => '9782246857334', 'annee_publication' => 2016, 'quantite_disponible' => 4],
            ['titre' => 'L\'Étranger', 'auteur' => 'Albert Camus', 'isbn' => '9782070360024', 'annee_publication' => 1942, 'quantite_disponible' => 8],
            ['titre' => 'L\'Enfant noir', 'auteur' => 'Camara Laye', 'isbn' => '9782266171569', 'annee_publication' => 1953, 'quantite_disponible' => 6],
            ['titre' => 'Sous l\'orage', 'auteur' => 'Seydou Badian', 'isbn' => '9782708705380', 'annee_publication' => 1957, 'quantite_disponible' => 5],
            ['titre' => 'Crépuscule des temps anciens', 'auteur' => 'Nazi Boni', 'isbn' => '9782708701023', 'annee_publication' => 1962, 'quantite_disponible' => 3],
            ['titre' => 'L\'Aventure ambiguë', 'auteur' => 'Cheikh Hamidou Kane', 'isbn' => '9782264036933', 'annee_publication' => 1961, 'quantite_disponible' => 9],
        ];

        $livreIds = [];
        foreach ($livres as $v) {
            $v['disponible'] = true;
            $livreIds[] = Livre::create($v)->id;
        }

        // Emprunts aléatoires
        for ($i = 0; $i < 10; $i++) {
            $dateEmprunt = Carbon::now()->subDays(rand(1, 30));
            $dateRetourPrevue = (clone $dateEmprunt)->addDays(14);
            $retourne = rand(0, 1);
            
            Emprunt::create([
                'livre_id' => $livreIds[array_rand($livreIds)],
                'lecteur_id' => $lecteurIds[array_rand($lecteurIds)],
                'date_emprunt' => $dateEmprunt,
                'date_retour_prevue' => $dateRetourPrevue,
                'date_retour_reelle' => $retourne ? (clone $dateEmprunt)->addDays(rand(5, 15)) : null,
            ]);
        }
    }
}
