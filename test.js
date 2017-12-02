/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-magic-numbers */
import {test} from "tap"

import flattenTree from "./index"

test(({same, end}) => {
  same(
    flattenTree("-")(
      {
        aria: {role: "navigation"},
        data: {
          profile: {
            name: "Kurtis Rainbolt-Greene",
            age: 24,
          },
          metadata: {interval: "10s"},
          location: "http://api.example.com/profiles/24",
          payload: {},
          points: [1, 2, 3],
        },
      }
    ),
    {
      "data-profile-name": "Kurtis Rainbolt-Greene",
      "data-profile-age": 24,
      "data-metadata-interval": "10s",
      "data-location": "http://api.example.com/profiles/24",
      "data-payload": {},
      "data-points": [1, 2, 3],
      "aria-role": "navigation",
    }
  )

  end()
})
