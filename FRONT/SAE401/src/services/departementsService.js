import axios from 'axios';

// "code_dept": "01",
// "nom_dept": "Ain",
// "id_region": {
//     "id_region": 84,
//     "nom_region": "AUVERGNE-RHÔNE-ALPES"
// }



const departementsService = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getDepartements = (params) => {
    return departementsService.get('departements', { params });
};

export default departementsService;