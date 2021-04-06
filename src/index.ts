import * as _fs from "fs";
import * as GIT from "isomorphic-git";

export const git = GIT;
/**
 * Get remote url of a git repo
 *
 * @public
 * @param dir - git repository directory
 * @param fs - defaults to node.fs, but we are isomorphic.
 */
export async function getRemoteOrigin(dir: string, fs = _fs): Promise<string> {
  return GIT.getConfig({ fs, dir, path: "remote.origin.url" });
}

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
export async function getCommitList(
  dir: string,
  depth = 10,
  fs = _fs
): Promise<
  {
    author: string;
    message: string;
    sha: string;
  }[]
> {
  const rawLogs = await GIT.log({ fs, dir, depth });
  return rawLogs.map((entry) => {
    /* istanbul ignore next */
    const author = entry.commit.author.name || entry.commit.author.email;
    return {
      author,
      message: entry.commit.message.split("\n")[0].slice(0, 78),
      sha: entry.oid.slice(0, 7),
    };
  });
}

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
export async function modList(
  dir: string,
  stagedOk = false,
  fs = _fs
): Promise<
  {
    filename: string;
    mod: string;
  }[]
> {
  const matrix = await GIT.statusMatrix({ fs, dir });
  const permissible = stagedOk ? ["unstaged"] : ["unstaged", "staged"];
  return matrix
    .map(statusMapper)
    .filter((x) => permissible.includes(x[1]))
    .map((x) => ({ filename: x[0], mod: x[2] }));
}

/**
 * @internal
 * @param dir - git repository directory
 * @param fs - defaults to node.fs, but we are isomorphic.
 */
export async function tagList(dir: string, fs = _fs): Promise<string[]> {
  return await GIT.listTags({ dir, fs });
}

/**
 * Convenience enum
 *
 * @internal
 */
export enum HeadStatus {
  ABSENT = 0,
  PRESENT = 1,
}
/**
 * Convenience enum
 * @internal
 */
export enum WorkDirStatus {
  ABSENT = 0,
  IDENTICAL = 1,
  DIFFERENT = 2,
}
/**
 * Convenience enum
 * @internal
 */
export enum StagetStatus {
  ABSENT = 0,
  IDENTICAL_HEAD = 1,
  IDENTICAL_WORKDIR = 2,
  DIFFERENT_WORKDIR = 3,
}

/**
 * Maps statusMatrix output to a simple form that we want. This function is testable
 * independent of isomorphic-git
 * @internal
 * @param param0 - element of array returned from statusMatrix
 * @return [dir, ]
 */
export function statusMapper([
  filename,
  headStatus,
  workDirStatus,
  stageStatus,
]: [string, HeadStatus, WorkDirStatus, StagetStatus]): [
  string,
  string,
  string
] {
  const status = [headStatus, workDirStatus, stageStatus].join(",");
  const description = {
    "1,1,1": "unmodified",
    "0,2,2": "added, staged",
    "1,2,2": "modified, staged",
    "1,0,0": "deleted, staged",
    "0,2,0": "new, untracked",
    "0,2,3": "added, staged, with unstaged changes",
    "1,2,1": "modified, unstaged",
    "1,2,3": "modified, staged, with unstaged changes",
    "1,0,1": "deleted, unstaged",
  };
  switch (status) {
    case "1,1,1": // unmodified
      return [filename, "unmodified", description[status]];
    case "0,2,2": // added, staged
    case "1,2,2": // modified, staged
    case "1,0,0": // deleted, staged
      return [filename, "staged", description[status]];
    case "0,2,0": // new, untracked
    case "0,2,3": // added, staged, with unstaged changes
    case "1,2,1": // modified, unstaged
    case "1,2,3": // modified, staged, with unstaged changes
    case "1,0,1": // deleted, unstaged
      return [filename, "unstaged", description[status]];
  }
}
