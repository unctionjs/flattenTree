import reduceWithValueKey from "@unction/reducewithvaluekey";
import reduceValues from "@unction/reducevalues";
import isPopulated from "@unction/ispopulated";
import isType from "@unction/istype";
import mapValues from "@unction/mapvalues";
import prepend from "@unction/prepend";
import append from "@unction/append";
import mergeRight from "@unction/mergeright";
import {join} from "ramda";
import {RecordType} from "./types";
import {TextType} from "./types";

export default function flattenTree<A, B> (delimiter: TextType) {
  return function flattenTreeDelimiter (recordTree: RecordType<A, B>) {
    return reduceValues(
      (accumulated: RecordType<A, B>) =>
        ([keys, value]: [Array<A>, B]) =>
          mergeRight(
            accumulated
          )({
            [join(delimiter)(keys)]: value,
          })
    )(
      {}
    )(
      function flattenTreeDelimiterMapping (nested) {
        return reduceWithValueKey(
          (accumulated: RecordType<A, B>) =>
            (treeOrLeaf: RecordType<A, B>) =>
              (key: A) => {
                if (isType("Object")(treeOrLeaf) && isPopulated(treeOrLeaf)) {
                  return mergeRight(
                    accumulated
                  )(
                    mapValues(
                      ([keys, leaf]: [Array<A>, B]) =>
                        append(
                          leaf
                        )(
                          [prepend(key)(keys)]
                        )
                    )(
                      flattenTreeDelimiterMapping(treeOrLeaf)
                    )
                  );
                }

                return prepend(
                  [[key], treeOrLeaf]
                )(
                  accumulated
                );
              }
        )(
          []
        )(
          nested
        );
      }(
        recordTree
      )
    );
  };
}
