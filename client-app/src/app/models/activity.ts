export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

export interface IActivityFormProp extends Partial<IActivity>{
    time? : Date;
}

export class ActivityFormValues implements IActivityFormProp{
    id?: string = undefined;
    title: string = '';
    description: string = '';
    category: string = '';
    date?: Date = undefined;
    time?:Date = undefined;
    city: string ='';
    venue: string = '';
    
    constructor(init?:IActivityFormProp) {
        if(init && init.date){
            init.time = init.date
        }
        Object.assign(this, init)
        
    }
}