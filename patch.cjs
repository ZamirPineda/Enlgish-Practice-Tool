const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.pnpm = pkg.pnpm || {};
pkg.pnpm.overrides = pkg.pnpm.overrides || {};

pkg.pnpm.overrides['picomatch@<2.3.2'] = '2.3.2';
pkg.pnpm.overrides['picomatch@>=4.0.0 <4.0.4'] = '4.0.4';
pkg.pnpm.overrides['happy-dom@>=15.10.0 <=20.8.7'] = '20.8.8';

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), 'utf8');
