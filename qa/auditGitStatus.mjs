import { execSync } from "node:child_process";
import fs from "node:fs";

function git(cmd) {
  try {
    return execSync(cmd, { encoding: "utf-8", maxBuffer: 50 * 1024 * 1024 });
  } catch (err) {
    return (err.stdout || "") + "\n" + (err.stderr || "");
  }
}

// 1. Git branch and commit counts
const currentBranch = git("git branch --show-current").trim();
const totalCommitsOnHead = parseInt(git("git rev-list --count HEAD").trim(), 10);
const commitLog30 = git("git log --oneline --decorate -30");
const commitLogAll50 = git("git log --oneline --all --decorate -50");

// 2. Diff stats
const diffStatUnstaged = git("git diff --stat");
const diffNumstatUnstaged = git("git diff --numstat");
const diffStatStaged = git("git diff --cached --stat");
const diffNumstatStaged = git("git diff --cached --numstat");
const diffHeadMinus1 = git("git diff HEAD~1 HEAD --stat");

// 3. Status short and ls-files
const statusShort = git("git status --short");
const statusShortLines = statusShort.split("\n").filter(Boolean);
const lsFiles = git("git ls-files").split("\n").filter(Boolean);

// Breakdown of status lines
const stagedFiles = [];
const unstagedModifiedFiles = [];
const untrackedFiles = [];

for (const line of statusShortLines) {
  const indexStatus = line.slice(0, 1);
  const workTreeStatus = line.slice(1, 2);
  const filePath = line.slice(3).trim().replace(/^"|"$/g, "");

  if (indexStatus !== " " && indexStatus !== "?") {
    stagedFiles.push({ path: filePath, status: indexStatus });
  }
  if (workTreeStatus !== " " && workTreeStatus !== "?") {
    unstagedModifiedFiles.push({ path: filePath, status: workTreeStatus });
  }
  if (indexStatus === "?" && workTreeStatus === "?") {
    untrackedFiles.push(filePath);
  }
}

// Categorize staged files
const stagedChromeProfile = stagedFiles.filter((f) => f.path.startsWith("qa/.chrome-qa-profile-polish/"));
const stagedScreenshots = stagedFiles.filter((f) => f.path.startsWith("qa/detail_page_screenshots/"));
const stagedQaScripts = stagedFiles.filter((f) => f.path.startsWith("qa/") && !f.path.startsWith("qa/.chrome-qa-profile-polish/") && !f.path.startsWith("qa/detail_page_screenshots/"));
const stagedSourceCode = stagedFiles.filter((f) => !f.path.startsWith("qa/"));

// Categorize untracked files
const untrackedChromeProfile = untrackedFiles.filter((p) => p.startsWith("qa/.chrome-qa-profile-polish/"));
const untrackedScreenshots = untrackedFiles.filter((p) => p.startsWith("qa/detail_page_screenshots/"));
const untrackedQaScripts = untrackedFiles.filter((p) => p.startsWith("qa/") && !p.startsWith("qa/.chrome-qa-profile-polish/") && !p.startsWith("qa/detail_page_screenshots/"));
const untrackedSourceCode = untrackedFiles.filter((p) => !p.startsWith("qa/"));

// Calculate lines added/removed from staged numstat
let stagedLinesAdded = 0;
let stagedLinesRemoved = 0;
let stagedSourceLinesAdded = 0;
let stagedSourceLinesRemoved = 0;

for (const line of diffNumstatStaged.split("\n").filter(Boolean)) {
  const [added, removed, file] = line.split("\t");
  const a = parseInt(added, 10) || 0;
  const r = parseInt(removed, 10) || 0;
  stagedLinesAdded += a;
  stagedLinesRemoved += r;
  if (!file.startsWith("qa/")) {
    stagedSourceLinesAdded += a;
    stagedSourceLinesRemoved += r;
  }
}

// Calculate lines added/removed from unstaged numstat
let unstagedLinesAdded = 0;
let unstagedLinesRemoved = 0;
let unstagedSourceLinesAdded = 0;
let unstagedSourceLinesRemoved = 0;

for (const line of diffNumstatUnstaged.split("\n").filter(Boolean)) {
  const [added, removed, file] = line.split("\t");
  const a = parseInt(added, 10) || 0;
  const r = parseInt(removed, 10) || 0;
  unstagedLinesAdded += a;
  unstagedLinesRemoved += r;
  if (!file.startsWith("qa/")) {
    unstagedSourceLinesAdded += a;
    unstagedSourceLinesRemoved += r;
  }
}

const auditSummary = {
  currentBranch,
  totalCommitsOnHead,
  headCommit: git("git rev-parse HEAD").trim(),
  headCommitSubject: git("git log -1 --format=%s").trim(),
  remoteTrackingBranch: git("git rev-parse --abbrev-ref --symbolic-full-name @{u}").trim(),
  uncommittedCommitsOnCurrentBranch: git("git log origin/feature-online-courses..HEAD --oneline").trim(),
  counts: {
    totalTrackedFiles: lsFiles.length,
    totalStatusLines: statusShortLines.length,
    stagedFilesCount: stagedFiles.length,
    stagedChromeProfileCount: stagedChromeProfile.length,
    stagedScreenshotsCount: stagedScreenshots.length,
    stagedQaScriptsAndReportsCount: stagedQaScripts.length,
    stagedSourceFilesCount: stagedSourceCode.length,
    unstagedModifiedCount: unstagedModifiedFiles.length,
    untrackedFilesCount: untrackedFiles.length,
    untrackedChromeProfileCount: untrackedChromeProfile.length,
    untrackedScreenshotsCount: untrackedScreenshots.length,
    untrackedQaScriptsCount: untrackedQaScripts.length,
    untrackedSourceFilesCount: untrackedSourceCode.length,
  },
  lines: {
    stagedTotal: { added: stagedLinesAdded, removed: stagedLinesRemoved },
    stagedSourceOnly: { added: stagedSourceLinesAdded, removed: stagedSourceLinesRemoved },
    unstagedTotal: { added: unstagedLinesAdded, removed: unstagedLinesRemoved },
    unstagedSourceOnly: { added: unstagedSourceLinesAdded, removed: unstagedSourceLinesRemoved },
  },
  stagedSourceFiles: stagedSourceCode,
  unstagedModifiedFiles,
};

fs.writeFileSync("qa/git-audit-raw-summary.json", JSON.stringify(auditSummary, null, 2));
console.log("GIT AUDIT SUMMARY:", JSON.stringify(auditSummary, null, 2));
