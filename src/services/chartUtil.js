import _ from 'lodash'
export function GetMax(data, prop) {
  var arr = data;
  if (prop) {
    arr = _.map(data, prop)
  }
  return Math.max.apply(this, arr);
}
