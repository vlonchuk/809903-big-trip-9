const COLUMN_SORT_TYPE = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

const columns = [
  {
    name: `day`,
    showedByEvent: true,
  },
  {
    name: `event`,
    sortable: true,
    active: true,
  },
  {
    name: `time`,
    sortable: true,
    active: false,
  },
  {
    name: `price`,
    sortable: true,
    active: false
  },
  {
    name: `offers`,
  }
];

export {COLUMN_SORT_TYPE};
export default columns;
