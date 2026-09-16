import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function run(cmd, cwd = rootDir) {
  console.log(`\x1b[36m> ${cmd}\x1b[0m`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

// 1. Read & increment package.json version
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const currentVersion = pkg.version === '0.0.0' ? '1.0.0' : pkg.version;
const versionParts = currentVersion.split('.').map(Number);
const newPatch = (versionParts[2] || 0) + 1;
const newVersion = `${versionParts[0] || 1}.${versionParts[1] || 0}.${newPatch}`;

// Check if a specific version was passed via CLI arg, e.g. `node scripts/build-apk.mjs 1.0.2`
const requestedVersion = process.argv[2] && /^\d+\.\d+\.\d+$/.test(process.argv[2]) 
  ? process.argv[2] 
  : newVersion;

pkg.version = requestedVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`\x1b[32m✔ Incremented version in package.json to v${requestedVersion}\x1b[0m`);

// 2. Update android/app/build.gradle (versionCode and versionName)
const gradlePath = path.join(rootDir, 'android', 'app', 'build.gradle');
let gradleContent = fs.readFileSync(gradlePath, 'utf8');

// Find current versionCode
const versionCodeMatch = gradleContent.match(/versionCode\s+(\d+)/);
const currentCode = versionCodeMatch ? parseInt(versionCodeMatch[1], 10) : 1;
const newCode = currentCode + 1;

gradleContent = gradleContent.replace(/versionCode\s+\d+/, `versionCode ${newCode}`);
gradleContent = gradleContent.replace(/versionName\s+["'][^"']+["']/, `versionName "${requestedVersion}"`);
fs.writeFileSync(gradlePath, gradleContent);
console.log(`\x1b[32m✔ Updated android/app/build.gradle: versionCode ${newCode}, versionName "${requestedVersion}"\x1b[0m`);

// 3. Build web app and sync Capacitor
console.log('\x1b[34m📦 Building production web bundle...\x1b[0m');
run('npm run build');

console.log('\x1b[34m⚡ Syncing with Capacitor Android platform...\x1b[0m');
run('npx cap sync android');

// 4. Assemble Android Debug APK
console.log('\x1b[34m🔨 Compiling Android APK with Gradle...\x1b[0m');
run('./gradlew assembleDebug', path.join(rootDir, 'android'));

// 5. Copy and name the APK correctly with the version number
const sourceApk = path.join(rootDir, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
const targetApkName = `AroggyaGram-v${requestedVersion}.apk`;
const targetApkPath = path.join(rootDir, targetApkName);
const latestApkPath = path.join(rootDir, 'AroggyaGram-latest.apk');

fs.copyFileSync(sourceApk, targetApkPath);
fs.copyFileSync(sourceApk, latestApkPath);

// Remove older named APKs to keep the root directory clean
const rootFiles = fs.readdirSync(rootDir);
for (const file of rootFiles) {
  if (file.startsWith('AroggyaGram-v') && file.endsWith('.apk') && file !== targetApkName) {
    fs.unlinkSync(path.join(rootDir, file));
    console.log(`🗑 Removed previous build: ${file}`);
  }
}

const stats = fs.statSync(targetApkPath);
const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

console.log('\n\x1b[32m=======================================================');
console.log(`🎉 Successfully built ${targetApkName} (${sizeMb} MB)`);
console.log(`📁 Path: ${targetApkPath}`);
console.log(`📁 Also updated alias: AroggyaGram-latest.apk`);
console.log('=======================================================\x1b[0m\n');
