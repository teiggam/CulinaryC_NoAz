export interface WholeFood {
  results: Result[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface Result {
  id: number;
  name: string;
  image: string;
}
