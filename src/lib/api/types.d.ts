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