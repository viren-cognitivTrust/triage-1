# Critical Vuln Lab

This app is intentionally insecure and contains multiple critical vulnerabilities.

## Run

```bash
npm install
npm start
```

## Semgrep scan

```bash
semgrep scan --config p/default critical-vuln-lab/src --json --output critical-vuln-lab/semgrep-results.json
```

Do not deploy this application.