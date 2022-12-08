import {environment} from '../environment/environment'

export class Util {

    public static apiPublicUrl(path: string) {
        return environment.api_url + '/api/public/' + path;
    }

    public static apiAuthUrl(path: string) {
        return environment.api_url + '/api/auth/' + path;
    }

    public static trimText = (text: string | number, removeAll = false): string => {
        if (removeAll) {
            return text.toString().replace(/\s+/g, '').trim();
        } else {
            return text.toString().replace(/ +/g, ' ').trim();
        }
    }

}
