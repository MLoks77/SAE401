function Texte({ analysisType }) {

    const Regionale = () => (
        <>
            <section>
                <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">1. La dynamique démographique : le grand écart</h3>
                <p>Le pays se divise nettement en deux blocs : les régions attractives et les régions stagnantes.</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li><strong>Les régions dominantes :</strong> L'Occitanie avec 50 % d'accroissement et l'Auvergne Rhône-Alpes à 39 % dominent largement. Elles attirent massivement, ce qui se traduit par une hausse constante du nombre de logements.</li>
                    <li><strong>Les régions en retrait :</strong> La Bourgogne Franche-Comté, le Grand Est et la Martinique affichent des taux négatifs. C'est un signal d'alerte indiquant que ces régions perdent de l'attractivité ou font face à un solde naturel négatif.</li>
                    <li><strong>Le cas particulier de la Guyane :</strong> Avec 41 % de sa population ayant moins de 20 ans, la Guyane est dans une catégorie à part. C'est un défi colossal pour les infrastructures scolaires et le logement, alors que la population de plus de 60 ans n'y représente que 9 %.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">2. Le logement : entre tension et vacances</h3>
                <p>Le parc de logements ne suit pas toujours la courbe de la population.</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li><strong>La concentration sociale :</strong> L'Île-de-France détient le record du taux de logements sociaux (26 %), ce qui est cohérent avec sa densité. À l'inverse, l'Occitanie et la Corse sont sous la barre des 10 %, ce qui crée une véritable tension immobilière pour les foyers les plus fragiles, dans des régions pourtant très prisées.</li>
                    <li><strong>Le paradoxe des logements vacants :</strong> La Guadeloupe et la Martinique affichent 15 % de logements vacants, un pourcentage significatif. Cela s'explique souvent par l'insalubrité, l'indivision ou le départ massif des jeunes vers la métropole, laissant des parcs immobiliers à l'abandon malgré un besoin de logement social.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">3. Économie : le chômage recule mais la pauvreté reste inchangée</h3>
                <p>L'analyse montre une tendance nationale : le chômage baisse partout, mais la pauvreté est maintenu.</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li><strong>Le succès des Outre-mer :</strong> La Guyane et la Martinique enregistrent des baisses de chômage spectaculaires (respectivement -6,9 % et -5,62 %). C'est le signe d'une reprise économique forte ou d'une politique d'insertion efficace sur ces deux années.</li>
                    <li><strong>Le plein emploi relatif :</strong> La Bretagne et les Pays de la Loire descendent sous les 6 % de chômage. Ce sont les régions les plus stables économiquement.</li>
                    <li><strong>La rigidité de la pauvreté :</strong> Malgré la baisse du chômage, les taux de pauvreté ne chutent pas de la même manière. La Réunion reste à un niveau critique de 35,6 %. En Auvergne Rhône-Alpes, la pauvreté a même tendance à augmenter très légèrement (12,5 % à 12,53 %), suggérant que les nouveaux emplois créés ne suffisent pas toujours à sortir les travailleurs de la précarité.</li>
                </ul>
            </section>
        </>
    );
    const Globale = () => (
        <>
            <section>
                <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">1. Le paradoxe de l'attractivité : grandir sans loger</h3>
                <p>Le premier constat est le décalage entre le dynamisme démographique et la capacité d'accueil sociale.</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li><strong>Les terres promises :</strong> L'Occitanie (50 % d'accroissement) et l'Auvergne-Rhône-Alpes (39 %) attirent massivement. Pourtant, elles affichent des taux de logements sociaux parmi les plus bas (moins de 10 % pour l'Occitanie).</li>
                    <li><strong>La tension immobilière :</strong> Dans ces régions, la construction de logements, qui augmente d'environ 1 % par an, ne suit pas le rythme de l'accroissement de la population. Cela crée une situation où se loger devient un luxe, malgré un taux de logements vacants qui reste stable autour de 9 %.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">2. Le découplage social : plus de travail mais autant de pauvreté</h3>
                <p>C'est la liaison de donnée la plus surprenante : la baisse du chômage n'est pas le remède miracle contre la pauvreté.</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li><strong>L'emploi en progression :</strong> Le chômage a reculé partout, avec des chutes historiques en Guyane (-6,9 points) et en Martinique (-5,6 %).</li>
                    <li><strong>La pauvreté résistante :</strong> Malgré ce dynamisme, le taux de pauvreté reste inchangé. À la Réunion, il stagne à 35,6 % malgré une baisse du chômage. En métropole (Auvergne Rhône-Alpes ou Bretagne), le taux de pauvreté a même tendance à stagner ou monter très légèrement. Donc, cela suggère l'émergence d'une précarité laborieuse (travailleurs pauvres) ou d'une déconnexion entre la création d'emplois et les profils des populations les plus fragiles.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">3. La fracture générationnelle : deux France face au futur</h3>
                <p>L'analyse des tranches d'âge révèle une société à deux vitesses.</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li><strong>La France âgée :</strong> En Nouvelle-Aquitaine et en Occitanie, plus d'un habitant sur trois a plus de 60 ans. Ces régions doivent transformer leur parc de logements pour l'adapter au vieillissement.</li>
                    <li><strong>La France jeune :</strong> La Guyane (41 % de moins de 20 ans) et la Réunion (29 %) sont les moteurs de la jeunesse française. Leurs besoins ne sont pas dans les EHPAD, mais dans les écoles et les logement sociaux (dont les taux augmentent en Guyane, passant de 23,6 % à 26 %).</li>
                </ul>
            </section>
        </>
    );

    return (
        <div className="flex-1 flex flex-col bg-[#152033] border-2 border-[#233348] text-white rounded-2xl shadow-lg p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 top-0 bg-[#152033] py-2">{analysisType}</h2>
            <div className="space-y-6 text-left">
                {analysisType === 'Analyse globale' ? <Globale /> : <Regionale />}
            </div>
        </div>
    )
};

export default Texte;