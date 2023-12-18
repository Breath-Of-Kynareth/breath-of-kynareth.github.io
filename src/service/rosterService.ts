import axios, { AxiosInstance } from 'axios';
import  { ExistingRaid, NewRaid } from '../models/raid'
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

    public async createNewRoster(roster: Raid){

    }

    public async getAllRosters(): Promise<any> {
        const response = await this.axiosInstance.get('/rosters/Roster-Viewer');
        return response.data.raids;
    }

    public async updateExistingRoster(){}
}


const rosterService = new RosterService();

export { rosterService };