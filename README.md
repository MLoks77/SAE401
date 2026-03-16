# SAE 401


### Languages

Cette SAE fut réalisé avec :

<ul>
  <li>Symfony</li>
  <li>React</li>
  <li>TailwindCSS</li>
</ul>

### Dépendances

### INSTALLER LES DEPENDANCES :

```bash
npm install
```

# Dans le cas où vous souhaitez installé un par un
## INSTALLER LES DEPENDANCES BACK

<ul>
<li>Nelmios Cors Bundle</li>

```bash
composer require nelmio/cors-bundle
```
</ul>

## INSTALLER LES DEPENDANCES FRONT

<ul>
<li>Axios</li>

```bash
npm install axios
```

<li>Chart.js</li>

```bash
npm install chart.js
```

<li>Chartjs-plugin-datalabels</li>
<li>https://www.npmjs.com/package/chartjs-plugin-datalabels</li><br>

```bash
npm install chartjs-plugin-datalabels 
```

<li>react-router-dom</li>

```bash
npm install react-router-dom
```

</ul>

## Comment lancer le projet

<p> Lancer dans une fenêtre du back </p>

```bash
symfony serve
```

<p> Lancer dans une fenêtre du front </p>

```bash
npm run dev
```
## BDD

la base de donnée est disponible dans le back, dans le fichier data


## Comment utiliser l'API

<p> L'API est accessible à l'adresse http://localhost:8000/api/ </p>

<ul>
    <li>
        api/logements
    </li>
    <li>
        api/departements
    </li>
  <li>
        api/regions
  </li>
  <li>
        api/population
    </li>
</ul>

# Problème Certificat

<p>Suivant les utilisateurs, l'API peut être accessible via http ou https.</p>
<p>Si vous rencontrez des problèmes avec le certificat, modifiez le texte de l'api dans le front dans les dossiers services</p>
<p>Voici les fichiers à modifier :</p>
<ul>
    <li>
        src/services/departementsService.js
    </li>
    <li>
        src/services/logementsService.js
    </li>
    <li>
        src/services/populationService.js
    </li>
    <li>
        src/services/regionsService.js
    </li>
</ul>

<p>Mettez http://localhost:8000/api si vous avez des problèmes avec le certificat</p>
<p>Mettez https://localhost:8000/api si vous n'avez pas de problèmes avec le certificat</p>
