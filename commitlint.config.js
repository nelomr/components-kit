module.exports = { 
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (commit) => commit.toLowerCase().startsWith('wip'),
    (commit) => commit.toLowerCase().startsWith('publish'),
  ],
};
