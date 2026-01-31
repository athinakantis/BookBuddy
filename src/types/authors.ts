export interface Author {
  id: string;
  name: string;
}

export interface GetAuthorsData {
  authors: {
    items: Author[];
    totalCount: number;
  };
}
