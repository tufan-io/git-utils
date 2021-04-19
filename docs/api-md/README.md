[@tufan-io/git-utils - v1.1.5](README.md) › [Globals](globals.md)

# @tufan-io/git-utils - v1.1.5

# @tufan/git-utils

[![action-ci](https://github.com/tufan-io/git-utils/workflows/action-ci/badge.svg)](https://github.com/tufan-io/git-utils/actions)

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
# set registry config
npm config set @tufan-io:registry https://npm.pkg.github.com/tufan-io

# install the package
npm install @tufan-io/git-utils
```

### API
Only implements convenience methods required for tufan-cli and friends.

[API Documentation](docs/api-md/globals.md)

## Development Tooling
- [Development tooling](docs/DevTools.md)
- [API Documentation](docs/api-md/globals.md)
- [CLOC reports](docs/cloc.md)
- [TODOS](docs/TODOs.md)
- [Changelog](CHANGELOG.md)
- [Security](SECURITY.md)

## License
[Apache-2.0](LICENSE.md)

## Code of Conduct
This project is released with a [Contributor Code of Conduct](code-of-conduct.md).
By participating, you agree to abide by its terms.

## Support
Bugs, PRs, comments, suggestions welcomed!
