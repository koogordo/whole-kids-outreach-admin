import { Image } from './Image';
export interface BoardMember {
  $id: string;
  fname: string;
  lname: string;
  position: number;
  occupation?: string;
  employer: string;
  image?: Image;
}
