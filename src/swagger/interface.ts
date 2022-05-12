interface SwaggerArgument {
  in: 'query' | 'cookie' | 'path' | 'header';
  type: string;
  name: string;
  example?: any;
  description?: string;
  required?: boolean;
}

interface SwaggerOper {
  summary: string;
  description?: string;
}

interface SwaggerRes {
  description?: string;
  type?: any;
  status?: number;
}

interface SwaggerBody {
  required?: boolean;
  default?: any;
  example?: any;
}

export type SwaggerOperation = Record<string, SwaggerOper>;
export type SwaggerParam = Record<string, SwaggerArgument>;
export type SwaggerQuery = Record<string, SwaggerArgument>;
export type SwaggerResponse = Record<string, Record<string, SwaggerRes>>;
export type SwaggerProperty = Record<string, SwaggerBody>;
