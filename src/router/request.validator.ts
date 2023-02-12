import { EmailData } from "../types/email.data";

export class RequestValidator{

    public static validate(data: EmailData): boolean{
        
        if(!data) return false;
        if(!(data?.to)) return false;
        if(!(data?.text)) return false;
        if(!(data?.subject)) return false;

        return true;

    }

};