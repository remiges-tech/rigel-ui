export const schemaListModel = {
    data: {
        type: 'array',
        isRequired: true, 
        nestedData: {
            app: { type: 'string', isRequired: true },
            module: { type: 'string', isRequired: true },
            ver: { type: 'number', isRequired: true },
            description: { type: 'string', isRequired: true }
        }
    },
    something: { type: 'string', isRequired: true }
}

export const schemaDetailsModel = {
    app: { type: 'string', isRequired: true },
    module: { type: 'string', isRequired: true },
    ver: { type: 'number', isRequired: true },
    fields: {
        type: 'array', isRequired: true, nestedData: {
            name: { type: 'string', isRequired: false },
            type: { type: 'string', isRequired: true },
            description: { type: 'string', isRequired: true },
            constraints: { type: 'string', isRequired: false },
        }
    },
    description: { type: 'string', isRequired: true },
}

export const configListmodel = {
    configurations : {
        type: "array",
        isRequired: true, 
        nestedData: {
            app: { type: 'string', isRequired: true },
            module: { type: 'string', isRequired: true },
            ver: { type: 'number', isRequired: true },
            config: { type: 'string', isRequired: true },
            description: { type: 'string', isRequired: false }
        }
    }
}

export const schemaModel = {
    type: "object",
    properties: {
        app: { type: "string" },
        module: { type: "string" },
        ver: { type: "integer" },
        description: { type: "string" }
    },
    required: ["app", "module", "ver", "description"]
}