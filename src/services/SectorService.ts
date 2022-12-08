import axios from 'axios';
import {AppResponse, AxiosAppResponse} from "../models/Response";
import {Sector} from "../models/Sector";
import { Util } from '../utils/Util';
import {UserInvolvedSectorsData} from "../models/UserInvolvedSectorsForm";
import {InvolvedSectors} from "../models/InvolvedSectors";

export class SectorService {

    public static async getSectors(): Promise<AppResponse<Sector[]>> {
        const res = await axios.get<void, AxiosAppResponse<Sector[]>>(Util.apiPublicUrl('sectors'));
        return res.data;
    }

    public static async addInvolvedSectors(userInvolvedSectorsData: UserInvolvedSectorsData): Promise<AppResponse<InvolvedSectors>> {
        const ep = Util.apiPublicUrl('involved-sectors');
        const res = await axios.post<UserInvolvedSectorsData, AxiosAppResponse<InvolvedSectors>>(ep, userInvolvedSectorsData);
        return res.data;
    }

    public static async getInvolvedSectors(): Promise<AppResponse<InvolvedSectors[]>> {
        const res = await axios.get<void, AxiosAppResponse<InvolvedSectors[]>>(Util.apiPublicUrl('all-involved-sectors'));
        return res.data;
    }

    public static async getInvolvedSectorById(id: string): Promise<AppResponse<InvolvedSectors>> {
        const ep = Util.apiPublicUrl(`involved-sector-by/${id}`);
        const res = await axios.get<Partial<any>, AxiosAppResponse<InvolvedSectors>>(ep);
        return res.data;
    }

}
