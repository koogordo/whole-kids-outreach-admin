import { Image } from '../models/Image';
export interface Program {
  $id: string;
  title?: string;
  category?: string;
  description?: string;
  tagline?: string;
  featuredimg?: Image;
  images?: Image[];
  featured?: boolean;
  when?: string;
  forwho?: string;
  howtoreg?: string;
}
