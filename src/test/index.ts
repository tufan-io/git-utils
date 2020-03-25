
import test from "ava";
import * as fs from "fs-extra";
import * as git from "isomorphic-git";
import * as http from "isomorphic-git/http/node";
import { getCommitList, getRemoteOrigin, modList, statusMapper, tagList } from "..";

test.before(async (t: any) => {
  const dir = `${__dirname}/../../.tmp/delay`;
  const url = `https://github.com/sindresorhus/delay.git`;
  await fs.remove(dir);
  await fs.ensureDir(dir);
  await git.clone({ fs, http, dir, url });
  t.context = { dir };
});

test(`statusMapper`, async (t) => {
  const fixtures = [
    ["a.txt", 0, 2, 0], // new, untracked
    ["b.txt", 0, 2, 2], // added, staged
    ["c.txt", 0, 2, 3], // added, staged, with unstaged changes
    ["d.txt", 1, 1, 1], // unmodified
    ["e.txt", 1, 2, 1], // modified, unstaged
    ["f.txt", 1, 2, 2], // modified, staged
    ["g.txt", 1, 2, 3], // modified, staged, with unstaged changes
    ["h.txt", 1, 0, 1], // deleted, unstaged
    ["i.txt", 1, 0, 0], // deleted, staged
  ];
  const result = fixtures.map(statusMapper);
  t.snapshot(result);
});

test(`getRemoteOrigin`, async (t) => {
  const { dir } = t.context as any;
  const url = await getRemoteOrigin(dir);
  t.snapshot(url);
});

test(`modList`, async (t) => {
  const { dir } = t.context as any;
  // tslint:disable-next-line: tsr-detect-non-literal-fs-filename
  await fs.writeFile(
    `${dir}/unstaged-file-test.txt`,
    `File created for test. Can be deleted`,
    `utf8`,
  );
  const result = [
    await modList(dir),
    await modList(dir, true),
  ];
  t.snapshot(result);
});

test(`getCommitList`, async (t) => {
  const { dir } = t.context as any;
  const mods = await getCommitList(dir);
  t.is(mods.length, 10);
});

test(`tagList`, async (t) => {
  const { dir } = t.context as any;
  const tags = await tagList(dir);
  t.true(13 <= tags.length); // 13 at the time of test creation
});
