export enum CONSTANTS {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  SCHEMA_API = '/schema',
  CONFIG_API = '/config',
  CONFIG_ADD = '01',
  CONFIG_VIEW = '02'
};

export const DT_OPTIONS = {
  pagingType: "full_numbers",
  pageLength: 5,
  lengthMenu: [5, 10, 25],
  processing: true,
  language:{
    searchPlaceholder: 'Search here...'
  }
}

export const TYPE_OPTION = ['Integer', 'String', 'Boolean', 'Number']