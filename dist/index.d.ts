/// <reference types="node" />
import * as _fs from "fs";
import * as GIT from "isomorphic-git";
export declare const git: typeof GIT;
/**
 * Get remote url of a git repo
 *
 * @public
 * @param dir - git repository directory
 * @param fs - defaults to node.fs, but we are isomorphic.
 */
export declare function getRemoteOrigin(dir: string, fs?: typeof _fs): Promise<string>;
/**
 * Similar to `git log --oneline`, meant to help select a recent commit to publish.
 * by default, fetches the last 10 commits.
 *
 * TODO: Add capability to only return commits pushed to remote.
 *
 * @public
 * @param dir - git repository directory
 * @param depth - number of commits to retrieve [default = 10]
 * @param fs - defaults to node.fs, but we are isomorphic.
 */
export declare function getCommitList(dir: string, depth?: number, fs?: typeof _fs): Promise<{
    author: string;
    message: string;
    sha: string;
}[]>;
/**
 * Given a git directory, an array of 2-tuples [filename, "modification state"]
 *
 * In many code generation tasks, it's important to quickly detect if there are
 * any changes to the current git index. This is particularly useful to guarantee
 * that a generator will not overwrite user generated content. Depending on the
 * circumstance, it is sometimes acceptable for the modifications to be staged,
 * and sometimes not.
 *
 * git's detection of modifications is kinda complex, making getting simple
 * mod/no-mod answers a bit convoluted. This function is a simple wrapper that
 * provides the simpler interface desired.
 *
 * @public
 *
 * @param dir - a git repo root/sub directory - anything `git status` would accept
 * @param stagedOk - whether staged modifications should be ignored, [default=false]
 * @param fs - for isomorphic usecases, defaults to node's fs.
 */
export declare function modList(dir: string, stagedOk?: boolean, fs?: typeof _fs): Promise<{
    filename: string;
    mod: string;
}[]>;
/**
 * @internal
 * @param dir - git repository directory
 * @param fs - defaults to node.fs, but we are isomorphic.
 */
export declare function tagList(dir: any, fs?: typeof _fs): Promise<string[]>;
/**
 * Convenience enum
 *
 * @internal
 */
export declare enum HeadStatus {
    ABSENT = 0,
    PRESENT = 1
}
/**
 * Convenience enum
 * @internal
 */
export declare enum WorkDirStatus {
    ABSENT = 0,
    IDENTICAL = 1,
    DIFFERENT = 2
}
/**
 * Convenience enum
 * @internal
 */
export declare enum StagetStatus {
    ABSENT = 0,
    IDENTICAL_HEAD = 1,
    IDENTICAL_WORKDIR = 2,
    DIFFERENT_WORKDIR = 3
}
/**
 * Maps statusMatrix output to a simple form that we want. This function is testable
 * independent of isomorphic-git
 * @internal
 * @param param0 - element of array returned from statusMatrix
 * @return [dir, ]
 */
export declare function statusMapper([filename, headStatus, workDirStatus, stageStatus,]: [string, HeadStatus, WorkDirStatus, StagetStatus]): [string, string, string];
