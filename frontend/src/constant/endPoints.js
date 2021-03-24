const apiUrl = 'http://localhost:8098';

export const endPoints = {
    getFact: id => `${apiUrl}/facts/${id}`,
    putFact: id => `${apiUrl}/facts/${id}`,
    deleteFact: id => `${apiUrl}/facts/${id}`,
    postFact: `${apiUrl}/facts`,
    getFactsList: `${apiUrl}/facts`,

    login: `${apiUrl}/login`,
    registration: `${apiUrl}/registration`
};
