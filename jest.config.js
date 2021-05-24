// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: false,

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        "/assets/",
    ],

    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
        // Mock out css modules
        "\\.(css|less|scss|styl)$": "<rootDir>/src/__mocks__/styleMock.js",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/src/__mocks__/fileMock.js",
    },

    // Use this configuration option to add custom reporters to Jest
    reporters: ["default"],

    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

    // The glob patterns Jest uses to detect test files
    testMatch: [
        "**/__tests__/**/*.js?(x)",
        "**/?(*.)+(spec|test).js?(x)",
        "**/components/**/?(_)test?(s).js?(x)",
    ],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ["/node_modules/", "/cypress/"],

    // The regexp pattern or array of patterns that Jest uses to detect test files
    // testRegex: [],

    // This option allows the use of a custom results processor
    // testResultsProcessor: null,

    // This option allows use of a custom test runner
    // testRunner: "jasmine2",

    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    testURL: "http://localhost",

    // A map from regular expressions to paths to transformers
    transform: {
        "\\.(js|jsx)$": ["babel-jest", { configFile: "./.babelrc_jest" }],
    },
}
