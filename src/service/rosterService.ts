import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RosterError } from '../errors/errors';
class RosterService {

    private baseUrl: string;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.baseUrl = `${ import.meta.env.VITE_APP_BASE_URL || ''}/${ import.meta.env.VITE_APP_VERSION }`;
        this.axiosInstance = axios.create({

            baseURL: this.baseUrl,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
              },                
            });
        this.axiosInstance.defaults.withCredentials = true;
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const storedToken = localStorage.getItem("bokToken");;
                if (storedToken) {
                    config.headers.Authorization = `Bearer ${storedToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        }

    private validateResponse(validation: AxiosResponse){
        return validation.status >= 200 &&  validation.status < 300;
    }

    public async getAllRosters(): Promise<any> {
        let response: AxiosResponse
        response = await this.axiosInstance.get('/rosters/Roster-Viewer');
        if (this.validateResponse(response)) {
            return response.data.raids;
        }
        throw new RosterError(response.status, response.data.message);
    }

    public async updateExistingRoster(){}

    public async getRankLimits(): Promise<string[]>{
        const response = await this.axiosInstance.get('/ranks')
        if (this.validateResponse(response)){
            return response.data.ranks;
        }
        throw new RosterError(response.status, response.data.message)
    }
}


const rosterService = new RosterService();

export { rosterService };