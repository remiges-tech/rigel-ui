export interface SchemaList {
  app: string;
  module: string;
  ver: number;
  description: string;
  something: string;
}

export interface SchemaDetails {
  app: string;
  module: string;
  ver: number;
  config?: string;
  description: string;
  fields: Field[];
}

export interface ConfigList {
  app: string;
  module: string;
  ver: number;
  config: string;
  description: string;
}
export interface ConfigDetails {
  app: string;
  module: string;
  ver: number;
  config?: string;
  description: string;
  values: Field[];
}

export interface HistoryDetails {
  app: string;
  module: string;
  ver: number;
  config: string;
  name: string;
  value: number;
  description: string;
  hist: History[];
}

export interface History {
  who: string;
  when: string; 
  val: string; 
}

export interface Field {
  name: string;
  value?: any;
  type: string;
  description: string;
  impactAlert: string;
  constraints?: Constraints;
}

export interface Constraints {
  min?: number;
  max?: number;
  enum?: [];
}

export interface ValueChangeInterface {
  isValueChange: boolean;
  index: number | null;
  configData: Field | undefined;
}
