/**
 * @description: 
 * @author: zs
 * @Date: 2020-07-13 10:47:55
 * @LastEditTime 2021-03-02 17:33:31
 * @LastEditors ronffy
 */

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  'js',
  'ts',
  'tsx',
  'json',
  'jsx',
];

const resolveModule = (filePath, resolveFn = resolveApp) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );
  const appDirectory = fs.realpathSync(process.cwd());
  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  appDirectory,
  resolveApp,
  resolveModule,

  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  appEntry: resolveModule('src/index'),
  appDist: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.ejs'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  appNodeModules: resolveApp('node_modules'),
};
