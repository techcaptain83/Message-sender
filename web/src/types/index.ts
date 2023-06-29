export interface ILink {
    name: string;
    href: string;
    icon: any
    current?: boolean
}


export interface IPerson {
    firstName: string;
    lastName: string;
    email: string;
    joinedAt: string;
    phoneNumber:string;
}

export interface ICall {
    from: IPerson
    to: IPerson
    callDuration: string;
    startedAt: Date;
    status: 'ongoing' |'ended';
}

export interface IOrder{
    orderedBy: IPerson;
    orderedAt: Date;
    status: 'pending' | 'completed' | 'cancelled';
}