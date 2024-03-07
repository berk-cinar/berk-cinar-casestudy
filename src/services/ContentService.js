import apiClient, { initialParams } from '../api/apiClient';

class ContentService {
        /**
         * @param {object} params
         */
        async get(params) {
                const { popular, trending, type } = params;
                let path = `${type}`;
                path += popular ? '/popular' : trending ? '/trending' : '';
                const response = await apiClient.get(path, { params: { ...initialParams } });

                if (response.status === 200) {
                        return response.data.results;
                } else {
                        return null;
                }
        }
        /**
         * @param {number} id 
         * @param {string} type
        */
        async getById(id, type) {
                const path = `${type}/${id}`;
                const response = await apiClient.get(path, { params: { ...initialParams } });

                if (response.status === 200) {
                        return response.data;
                } else {
                        return null;
                }
        }

}

const movieService = new ContentService();
export default movieService;
