export interface ICategoryList {
  _id: string;
  name: string;
  description: string;
  slug: string;
  parentId?: null | string;
}
