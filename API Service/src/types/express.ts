export interface ParamsDictionary {
  [key: string]: string;
}

export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
