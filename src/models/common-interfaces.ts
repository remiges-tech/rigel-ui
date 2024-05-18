export interface SchemaList{
    app:string,
    module:string,
    ver:number,
    description:string;
}

export interface SchemaDetails {
    app: string,
    module: string,
    ver: number,
    config?: string,
    description: string,
    fields: Field[]
}

export interface ConfigList{
    app:string,
    module:string,
    ver:number,
    config: string,
    description:string;
}
export interface ConfigDetails {
    app: string,
    module: string,
    ver: number,
    config?: string,
    description: string,
    values: Field[]
}

export interface Field {
    name: string,
    value?: any,
    type: string,
    description: string,
    constraints?: Constraints
}

export interface Constraints {
    min?: number,
    max?: number,
    enum?: []
}