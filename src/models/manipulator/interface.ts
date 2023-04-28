export interface IManipulator {
  _id: string;
  name: string;
  nameKana: string;
  email: string;
  photos: Photo[];
  status: string;
}

interface Photo {
  type: string;
  url: string;
  objectKey: string;
}
