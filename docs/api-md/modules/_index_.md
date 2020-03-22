[@tufan-io/git-utils](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Enumerations

* [HeadStatus](../enums/_index_.headstatus.md)
* [StagetStatus](../enums/_index_.stagetstatus.md)
* [WorkDirStatus](../enums/_index_.workdirstatus.md)

### Functions

* [getCommitList](_index_.md#getcommitlist)
* [getRemoteOrigin](_index_.md#getremoteorigin)
* [modList](_index_.md#modlist)
* [statusMapper](_index_.md#statusmapper)
* [tagList](_index_.md#taglist)

## Functions

###  getCommitList

▸ **getCommitList**(`dir`: string, `depth`: number, `fs`: "fs"): *Promise‹object[]›*

*Defined in [index.ts:26](https://github.com/tufan-io/git-utils/blob/master/src/index.ts#L26)*

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

▸ **getRemoteOrigin**(`dir`: string, `fs`: "fs"): *Promise‹any›*

*Defined in [index.ts:11](https://github.com/tufan-io/git-utils/blob/master/src/index.ts#L11)*

Get remote url of a git repo

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`dir` | string | - | git repository directory |
`fs` | "fs" | _fs | defaults to node.fs, but we are isomorphic.  |

**Returns:** *Promise‹any›*

___

###  modList

▸ **modList**(`dir`: string, `stagedOk`: boolean, `fs`: "fs"): *Promise‹string[][]›*

*Defined in [index.ts:54](https://github.com/tufan-io/git-utils/blob/master/src/index.ts#L54)*

In many code generation tasks, it's important to quickly detect if there are
any changes to the current git index. Sometimes, it's necessary to detect
unstaged changes - to prevent overwriting user initiated changes for example.

git's detection of modifications is kinda complex, making getting simple
mod/no-mod answers a bit convoluted. This function is a simple wrapper that
provides the simpler interface desired.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`dir` | string | - | a git repo root/sub directory - anything `git status` would accept |
`stagedOk` | boolean | false | whether staged modifications should be ignored, [default=false] |
`fs` | "fs" | _fs | for isomorphic usecases, defaults to node's fs.  |

**Returns:** *Promise‹string[][]›*

___

###  statusMapper

▸ **statusMapper**(`__namedParameters`: [string, [HeadStatus](../enums/_index_.headstatus.md), [WorkDirStatus](../enums/_index_.workdirstatus.md), [StagetStatus](../enums/_index_.stagetstatus.md)]): *string[]*

*Defined in [index.ts:106](https://github.com/tufan-io/git-utils/blob/master/src/index.ts#L106)*

Maps statusMatrix output to a simple form that we want. This function is testable
independent of isomorphic-git

**`internal`** 

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [string, [HeadStatus](../enums/_index_.headstatus.md), [WorkDirStatus](../enums/_index_.workdirstatus.md), [StagetStatus](../enums/_index_.stagetstatus.md)] |

**Returns:** *string[]*

___

###  tagList

▸ **tagList**(`dir`: any, `fs`: "fs"): *Promise‹string[]›*

*Defined in [index.ts:67](https://github.com/tufan-io/git-utils/blob/master/src/index.ts#L67)*

**`internal`** 

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`dir` | any | - | git repository directory |
`fs` | "fs" | _fs | defaults to node.fs, but we are isomorphic.  |

**Returns:** *Promise‹string[]›*
