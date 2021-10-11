/* eslint-disable */
const packageJsonPath = './package.json'
const packageJson = require(packageJsonPath)
const fs = require('fs-extra')

;(async () => {
  await fs.remove(`./shared`)
  packageJson.dependencies['shared'] = 'link:../shared'
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
})()
