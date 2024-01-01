export interface SchemaList{
    app:string,
    module:string,
    version:number,
    description:string;
}

export interface SchemaDetails {
    appName: string,
    moduleName: string,
    versionNumber: number,
    configName?: string,
    description: string,
    values: Field[]
}

export interface Field {
    name: string,
    value?: any,
    type: string,
    description: string
}