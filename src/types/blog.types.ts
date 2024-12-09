export type TBlog = {
    _id: string;
    title: string;
    metaDescription: string;
    content: string;
    category: {
      _id : string;
      name:string;
    };
    tags: string[];
    thumbnail: {
      fileId: string;
      name: string;
      url: string;
      thumbnailUrl: string;
      _id: string;
    };
    author: {
      _id: string;
      full_name: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  