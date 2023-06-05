export type Task = {
    _id: string;
    title: string;
    description: string;
    owner: string;
    tag: [];
    created_at: Date;
}