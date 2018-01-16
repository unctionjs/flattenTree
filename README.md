# @unction/flattenTree

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> StringType => RecordTreeType => RecordType

Takes a tree and creates a single object where the root keys are conjoined nested keys.

``` javascript
flattenTree(
  "-"
)(
  {
    data: {
      profile: {
        name: "Kurtis Rainbolt-Greene",
        age: 24,
      },
      metadata: {
        interval: "10s",
      },
      location: "http://api.example.com/profiles/24",
    }
  }
)
```

Would return:

``` javascript
{
  "data-profile-name": "Kurtis Rainbolt-Greene",
  "data-profile-age": 24,
  "data-metadata-interval": "10s",
  "data-location": "http://api.example.com/profiles/24"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square
