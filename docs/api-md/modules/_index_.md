[@tufan-io/git-utils - v1.1.0](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Enumerations

* [HeadStatus](../enums/_index_.headstatus.md)
* [StagetStatus](../enums/_index_.stagetstatus.md)
* [WorkDirStatus](../enums/_index_.workdirstatus.md)

### Variables

* [git](_index_.md#const-git)

### Functions

* [getCommitList](_index_.md#getcommitlist)
* [getRemoteOrigin](_index_.md#getremoteorigin)
* [modList](_index_.md#modlist)
* [statusMapper](_index_.md#statusmapper)
* [tagList](_index_.md#taglist)

## Variables

### `Const` git

• **git**: *"/Users/sramam/trial/poc/git-utils/node_modules/isomorphic-git/index"* = GIT

*Defined in [index.ts:4](https://github.com/tufan-io/git-utils/blob/e076e95/src/index.ts#L4)*

## Functions

###  getCommitList

▸ **getCommitList**(`dir`: string, `depth`: number, `fs`: "fs"): *Promise‹object[]›*

*Defined in [index.ts:27](https://github.com/tufan-io/git-utils/blob/e076e95/src/index.ts#L27)*

Similar to `git log --oneline`, meant to help select a recent commit to publish.
by default, fetches the last 10 commits.

TODO: Add capability to only return commits pushed to remote.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`dir` | string | - | git repository directory |
`depth` | number | 10 | number of commits to retrieve [default = 10] |
`fs` | "fs" | _fs | defaults to node.fs, but we are isomorphic.  |

**Returns:** *Promise‹object[]›*

___

###  getRemoteOrigin

▸ **getRemoteOrigin**(`dir`: string, `fs`: "fs"): *Promise‹string›*

*Defined in [index.ts:12](https://github.com/tufan-io/git-utils/blob/e076e95/src/index.ts#L12)*

Get remote url of a git repo

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`dir` | string | - | git repository directory |
`fs` | "fs" | _fs | defaults to node.fs, but we are isomorphic.  |

**Returns:** *Promise‹string›*

___

###  modList

▸ **modList**(`dir`: string, `stagedOk`: boolean, `fs`: "fs"): *Promise‹object[]›*

*Defined in [index.ts:67](https://github.com/tufan-io/git-utils/blob/e076e95/src/index.ts#L67)*

Given a git directory, an array of 2-tuples [filename, "modification state"]

In many code generation tasks, it's important to quickly detect if there are
any changes to the current git index. This is particularly useful to guarantee
that a generator will not overwrite user generated content. Depending on the
circumstance, it is sometimes acceptable for the modifications to be staged,
and sometimes not.

git's detection of modifications is kinda complex, making getting simple
mod/no-mod answers a bit convoluted. This function is a simple wrapper that
provides the simpler interface desired.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`dir` | string | - | a git repo root/sub directory - anything `git status` would accept |
`stagedOk` | boolean | false | whether staged modifications should be ignored, [default=false] |
`fs` | "fs" | _fs | for isomorphic usecases, defaults to node's fs.  |

**Returns:** *Promise‹object[]›*

___

###  statusMapper

▸ **statusMapper**(`__namedParameters`: [string, [HeadStatus](../enums/_index_.headstatus.md), [WorkDirStatus](../enums/_index_.workdirstatus.md), [StagetStatus](../enums/_index_.stagetstatus.md)]): *[string, string, string]*

*Defined in [index.ts:128](https://github.com/tufan-io/git-utils/blob/e076e95/src/index.ts#L128)*

Maps statusMatrix output to a simple form that we want. This function is testable
independent of isomorphic-git

**`internal`** 

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [string, [HeadStatus](../enums/_index_.headstatus.md), [WorkDirStatus](../enums/_index_.workdirstatus.md), [StagetStatus](../enums/_index_.stagetstatus.md)] |

**Returns:** *[string, string, string]*

___

###  tagList

▸ **tagList**(`dir`: any, `fs`: "fs"): *Promise‹string[]›*

*Defined in [index.ts:88](https://github.com/tufan-io/git-utils/blob/e076e95/src/index.ts#L88)*

**`internal`** 

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`dir` | any | - | git repository directory |
`fs` | "fs" | _fs | defaults to node.fs, but we are isomorphic.  |

**Returns:** *Promise‹string[]›*
