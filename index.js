import reduceWithValueKey from "@unction/reducewithvaluekey"
import reduceValues from "@unction/reducevalues"
import isPopulated from "@unction/ispopulated"
import isType from "@unction/istype"
import mapValues from "@unction/mapvalues"
import prepend from "@unction/prepend"
import append from "@unction/append"
import mergeRight from "@unction/mergeright"
import {join} from "ramda"

export default function flattenTree (delimiter: StringType): UnaryFunctionType {
  return function flattenTreeDelimiter (recordTree: RecordTreeType): RecordType {
    return reduceValues(
      (accumulated: RecordType): UnaryFunctionType =>
        ([keys, value]: Array<ValueType>): RecordType =>
          mergeRight(
            accumulated
          )(
            {[join(delimiter)(keys)]: value}
          )
    )(
      {}
    )(
      (
        function flattenTreeDelimiterMapping (nested: RecordType): RecordType {
          return reduceWithValueKey(
            (accumulated: RecordType): UnaryFunctionType =>
              (treeOrLeaf: ValueType): UnaryFunctionType =>
                (key: KeyType): RecordType => {
                  if (isType("Object")(treeOrLeaf) && isPopulated(treeOrLeaf)) {
                    return mergeRight(
                      accumulated
                    )(
                      mapValues(
                        ([keys, leaf]: [Array<KeyType>, ValueType]): [Array<KeyType>, ValueType] =>
                          append(leaf)([prepend(key)(keys)])
                      )(
                        flattenTreeDelimiterMapping(treeOrLeaf)
                      )
                    )
                  }

                  return prepend([[key], treeOrLeaf])(accumulated)
                }
          )(
            []
          )(
            nested
          )
        }
      )(
        recordTree
      )
    )
  }
}
