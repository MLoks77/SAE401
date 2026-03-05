import axios from 'axios';

const departementsService = axios.create({
    baseURL: 'https://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getDepartements = (code_dept, nom_dept, id_region) => {
    return departementsService.get('departements', {
        params: {
            code_dept: code_dept,
            nom_dept: nom_dept,
            id_region: id_region
        }
    });
};

export default departementsService;