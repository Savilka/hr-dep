//Тип, описывающий здание
export interface IBuilding {
    Id: string;
    Name: string;
    Rooms: ICabinet[];
}

//Тип, описыващий кабинет
export interface ICabinet {
    Id: string;
    Name: string;
}

//Тип, описыващий список заявок в АХО
export interface IAAERequest {
    Text: string;
    Building: string;
    Cabinet: string;
    HasFiles: true;
    ID: string;
    Status: string;
    CreationDate: Date;
}

//Тип, описыващий тип заявки в отдел кадров
export interface IType {
    ID: string;
    Name: string;
}

//Тип, описыващий список заявок в отдел кадров
export interface IRequest {
    CreationDate: Date;
    TypeID: string;
    Status: string;
    Note: string;
    id: string;
}