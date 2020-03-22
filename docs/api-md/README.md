[@tufan-io/git-utils - v1.0.0](README.md) › [Globals](globals.md)

# @tufan-io/git-utils - v1.0.0

# @tufan/git-utils

[![Build status](https://tufan-io.github.io/git-utils/ci/badge/build.svg)](https://github.com/tufan-io/git-utils/actions)
![Coverage](https://tufan-io.github.io/git-utils/ci/badge/coverage.svg)

Convenience methods for working with git for tufan code-generation capabilities.
Uses `isomorphic-git`, to provide OS independence. Exremely useful for full featured
code generators.

tufan.cloud is a code generator and a registry system. All of which require
some git interactions. This is a simple wrapper around `isomorphic-git` that
exposes a few convenience functions to make these tasks easier.

As a proof of how good `isomorphic-git` is, this module is really a container
for one-liners with some data-transformation. In addition to providing convenience
wrappers for a few code-generation/code-management tasks, this module is really
a container to isolate the needed test cases.

## Usage

### Installation
```bash
npm install @tufan-io/git-utils
```

### API
Only implements convenience methods required for tufan-cli and friends.

[API Documentation](docs/api-md/globals.md)

### Activating Badges in README.md
We use github actions as our CI system. The badges are generated as part of the
build process into a [./.badges](./.badges) directory.

Since many of the tufan-io repos are private, we have to go through a few hoops
to expose these badges to the public internet without sacrificing security/privacy
of the code base.

We do this by exporting the ./.badges directory to an orphaned `gh-pages` branch.
This is accomplished in the [ci-build workflow](github/workflows/ci-build.yml)

For the badges to be visible to the internet however, currently, we require a
manual activation. This is accomplished *AFTER the first CI build has completed*,
on the [settings page](https://github.com/tufan-io/git-utils/settings)
find the "Github Pages", and under "Source", select the "gh-pages branch".

Once done, reloading the README file should display the build icons

## Development Tooling

- [Development tooling](docs/DevTools.md)
- [API Documentation](docs/api-md/globals.md)
- [CLOC reports](docs/cloc.md)
- [Changelog](docs/CHANGELOG.md)

## License

[Apache-2.0](LICENSE.md)

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](code-of-conduct.md). By participating in this project you agree to abide by its terms.

## Support

Bugs, PRs, comments, suggestions welcomed!
