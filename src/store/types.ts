export interface PostsListProps {
  items: {
    id: number;
    title: string;
    content: string;
    lat: string;
    long: string;
    image_url: string;
    created_at: string;
    updated_at: string;
  }[];
  //onDeletePost: (id: string) => void;
}

export interface CityPost {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}
