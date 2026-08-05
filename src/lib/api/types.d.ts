//#region Auth
export type SessionToken = {
    token: string;
    expiresAt: Date;
}
//#endregion

//#region Events
export type Event = {
    id: string;
    slug: string;
    title: string;
    description: string;
    startsAt: Date | null;
    location: string;
    pictureURL: string;
}
//#endregion

//#region Users
export type User = {
    uid: string;
    email: string;
    fullName: string;
    nickname: string;
    phone: string | null;
    pictureURL: string;
    admin: boolean;
}

//TODO : Trouver un meilleur nom mdr, en gros c'est un user avec moins d'infos juste les permissions
export type LightUser = {
    uid: string;
    admin: boolean;
    firstName: string;
    lastName: string;
    pictureURL: string;
}
//#endregion