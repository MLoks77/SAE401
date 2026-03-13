// https://stackoverflow.com/questions/36996698/how-do-i-lowercase-any-string-and-then-capitalize-only-the-first-letter-of-the-w
export function capitalfirstletter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const Metriques = [
    { type: "Nombre de logements", value: "nb_logements", isPourcent: "non" },
    { type: "Taux de logements sociaux", value: "taux_logements_sociaux", isPourcent: "oui" },
    { type: "Taux de logements vacants", value: "taux_logements_vacants", isPourcent: "oui" },
    { type: "Nombre d'habitants", value: "nb_habitants", isPourcent: "non" },
    { type: "Accroissement population", value: "accroissement", isPourcent: "oui" },
    { type: "Population moins de 20 ans", value: "pop_moins_20ans", isPourcent: "oui" },
    { type: "Population plus de 60 ans", value: "pop_plus_60ans", isPourcent: "oui" },
    { type: "Taux de chomage", value: "taux_chomage", isPourcent: "oui" },
    { type: "Taux de pauvreté", value: "taux_pauvrete", isPourcent: "oui" },
];

export const getEtapeClassName = (isUnlocked) => {
    const classes = "p-4 rounded-lg transition-all duration-500";
    if (!isUnlocked) {
        return `${classes} bg-[#111822]/80 opacity-30 pointer-events-none grayscale`;
    }
    return `${classes} bg-[#111822]`;
};