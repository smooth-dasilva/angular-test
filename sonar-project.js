const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner( { 
    serverUrl: "http://localhost:9000",
    token: "1ef9b3a0a85028975b45fb2bd9330da78e7db00c",
    
    options: {
        "sonar.sources":"src",
        "sonar.tests":"src",
        "sonar.exclusions":"**/node_modules/**",
        "sonar.test.inclusions":"**/*.spec.ts",
        "sonar.typescript.lcov.reportPaths":"coverage/lcov.info",
        "sonar.testExecutionReportPaths":"reports/ut_report.xml"
    }

 } , () => { 
    console.log("scanner shutdown")
}  )