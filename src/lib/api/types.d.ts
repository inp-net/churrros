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
    firstName: string;
    lastName: string;
    nickname: string;
    phone: string | null;
    pictureURL: string;
    admin: boolean;
}
//#endregion