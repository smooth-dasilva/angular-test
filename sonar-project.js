const sonarqubeScanner = require("sonarqube-scanner");
require('dotenv').config()

sonarqubeScanner({ 

    serverUrl: process.env.SONAR_HOST_URL,
    token: process.env.SONAR_MEMBER_TOKEN,
     
    options: {
        "sonar.sources":"src",
        "sonar.tests":"src/test.ts",
        "sonar.test.exclusions":"/src/test.ts",
        "sonar.test.inclusions":"/src/app/**/*.ts",
        "sonar.typescript.lcov.reportPaths":"coverage/lcov.info",
        "sonar.testExecutionReportPaths":"reports/ut_report.xml"
    },

 }, () => { 
    console.log("Scanner Shutdown")
});