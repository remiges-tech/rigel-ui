// export function logTestResult(
//   testCaseName: string,
//   status: string,
//   message: string,
//   responseTime: number,
//   expectedStatusCode: number,
//   actualStatusCode: number
// ) {
//   const timestamp = new Date().toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//   }).replace(",", "");
//   const flag = status === "Passed" ? "✅" : "❌";

//   cy.task("writeExcel", {
//     testCaseName,
//     status,
//     message,
//     timestamp,
//     responseTime,
//     expectedStatusCode,
//     actualStatusCode,
//     flag,
//   });
// }

export function logTestResult(
  testCaseName: string,
  status: string,
  message: string,
  responseTime: number,
  expectedStatusCode: number,
  actualStatusCode: number
) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  }).replace(",", "");

  // ✅ Passed if status code is 200, ❌ Failed otherwise
  const flag = status === "Passed" ? "✅" : "❌";

  cy.task("writeExcel", {
    testCaseName,
    status,
    message,
    timestamp,
    responseTime,
    expectedStatusCode,
    actualStatusCode,
    flag,
  });
}

