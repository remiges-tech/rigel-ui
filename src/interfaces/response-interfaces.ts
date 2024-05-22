import { ConfigDetails, ConfigList, SchemaDetails, SchemaList } from "./common-interfaces";

export interface SchemaListResp {
    data : SchemaList[]
    status: string;
    statucCode: string;
    message: any;
}

export interface SchemaDetailResp {
    data : SchemaDetails
    status: string;
    statucCode: string;
    message: any;
}

export interface ConfigListResp {
    data : {
        configurations: ConfigList[]
    }
    status: string;
    statucCode: string;
    message: any;
}

export interface ConfigDetailResp {
    data : ConfigDetails
    status: string;
    statucCode: string;
    message: any;
}

export interface ConfigSetResp {
    data: string;
    status: string;
    statucCode: string;
    message: any;
}