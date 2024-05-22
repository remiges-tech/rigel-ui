export let schemaListModel = {
    app: { type: 'string', isRequired: true },
    module: { type: 'string', isRequired: true },
    ver: { type: 'number', isRequired: true },
    description: { type: 'string', isRequired: true },
}

export let schemaDetailsModel = {
    app: {type:'string', isRequired: true},
    module: {type:'string', isRequired: true},
    ver: {type:'number', isRequired: true},
    fields: {type:'array', isRequired: true, nestedData: {
        name: {type:'string', isRequired: true},
        type: {type:'string', isRequired: true},
        description: {type:'string', isRequired: true},
        constraints: {type:'string', isRequired: false},    
    }},
    description: { type: 'string', isRequired: true },
}