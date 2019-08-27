import reduceWithValueKey from "@unction/reducewithvaluekey";
import reduceValues from "@unction/reducevalues";
import isPopulated from "@unction/ispopulated";
import isType from "@unction/istype";
import mapValues from "@unction/mapvalues";
import prepend from "@unction/prepend";
import append from "@unction/append";
import mergeRight from "@unction/mergeright";
import {join} from "ramda";
export default function flattenTree (delimiter) {
  return function flattenTreeDelimiter (recordTree) {
    return reduceValues((accumulated) => ([keys, value]) => mergeRight(accumulated)({
      [join(delimiter)(keys)]: value,
    }))({})(function flattenTreeDelimiterMapping (nested) {
      return reduceWithValueKey((accumulated) => (treeOrLeaf) => (key) => {
        if (isType("Object")(treeOrLeaf) && isPopulated(treeOrLeaf)) {
          return mergeRight(accumulated)(mapValues(([keys, leaf]) => append(leaf)([prepend(key)(keys)]))(flattenTreeDelimiterMapping(treeOrLeaf)));
        }

        return prepend([[key], treeOrLeaf])(accumulated);
      })([])(nested);
    }(recordTree));
  };
}
