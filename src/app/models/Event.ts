import { Image } from '../models/Image';
export interface Event {
    id?: string;
    title: string;
    start: string;
    end: string;
    tagline?: string;
    description: string;
    image?: Image;
    url?: string;
    active?: boolean;
    attachments?: any[];
    createdAt?: Date;
    lastEdited?: Date;
}
