function Texte({ analysisType }) {
    return (
        <div className="flex-1 flex flex-col bg-[#152033] border-2 border-[#233348] text-white rounded-2xl shadow-lg p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 top-0 bg-[#152033] py-2">{analysisType}</h2>
            <div className="space-y-6 text-left">
                <section>
                    <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">1. Dynamique Démographique : Le Grand Écart</h3>
                    <p>On observe deux visages très différents de la France :</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Les pôles d'attractivité :</strong> L'Occitanie (O), l'Auvergne-Rhône-Alpes (ARA) et l'Île-de-France (IDF) affichent les plus forts taux d'accroissement (entre 36 % et 54 % en cumulé sur les données fournies). L'Occitanie se distingue particulièrement par une croissance explosive.</li>
                        <li><strong>Les régions en déclin ou stagnation :</strong> La Bourgogne Franche-Comté (BFC), le Grand Est (GE) et la Normandie (N) montrent des signes de fragilité avec un accroissement négatif ou proche de zéro. La BFC perd notamment des habitants régulièrement sur les trois relevés.</li>
                        <li><strong>Le cas particulier de la Guyane :</strong> Avec 41 % de sa population ayant moins de 20 ans (contre environ 22 % en métropole), la Guyane est la région la plus jeune. C'est une dynamique démographique unique qui explique ses besoins massifs en infrastructures.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">2. Emploi : Une amélioration généralisée</h3>
                    <p>La donnée la plus frappante est la baisse du chômage partout en France entre 2021 et 2023.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Les records de baisse :</strong> La Guyane (-6,9 points) et la Martinique (-5,62 points) enregistrent des chutes spectaculaires du chômage.</li>
                        <li><strong>Le plein emploi relatif :</strong> La Bretagne (B), les Pays de la Loire (L) et l'Auvergne-Rhône-Alpes (ARA) sont les "bons élèves" avec des taux passant sous la barre des 6 %, se rapprochant du plein emploi technique.</li>
                        <li><strong>La persistance du chômage élevé :</strong> Malgré les baisses, les Outre-mer (Guadeloupe à 19,30 % et Réunion à 17,10 %) ainsi que les Hauts-de-France (HDF) et PACA restent bien au-dessus de la moyenne nationale.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">3. Précarité et Pauvreté : Un lien complexe</h3>
                    <p>La baisse du chômage n'entraîne pas toujours une baisse équivalente de la pauvreté.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Stabilité de la pauvreté :</strong> Dans des régions comme l'ARA ou la Bretagne, la pauvreté reste stable ou augmente très légèrement malgré la baisse du chômage. Cela suggère une augmentation des "travailleurs pauvres".</li>
                        <li><strong>Les régions "riches" mais précaires :</strong> L'Île-de-France a un chômage modéré (6,94 %) mais un taux de pauvreté assez élevé (15,39 %), lié au coût de la vie très important.</li>
                        <li><strong>Les contrastes territoriaux :</strong> La Réunion et la Martinique, bien qu'en progrès, affichent des taux de pauvreté records (respectivement 35,6 % et 26,7 %), soulignant des fractures sociales structurelles.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">4. Vieillissement de la population</h3>
                    <p>Le "papy-boom" est visible dans les chiffres de la population de plus de 60 ans :</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Les régions "Seniors" :</strong> La Nouvelle-Aquitaine (NA) et l'Occitanie (O) dépassent les 32 % de population de plus de 60 ans. Ces régions doivent déjà adapter leurs services (santé, logement, transports).</li>
                        <li><strong>La jeunesse des DROM :</strong> À l'inverse, la Guyane (9 %) et la Réunion (18-19 %) restent très "jeunes", ce qui déplace l'enjeu vers l'éducation et l'insertion professionnelle des moins de 20 ans.</li>
                    </ul>
                </section>
            </div>
        </div>
    )
};

export default Texte;