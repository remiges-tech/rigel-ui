export interface ConfigListInterface {
    id:number,
    schemaName: string,
    schemaVersion: number,
    configName: string,
    description: string,
    values: ConfigValuesInterface[]
}

export interface ConfigValuesInterface {
    field: string,
    type: string,
    value: any
}