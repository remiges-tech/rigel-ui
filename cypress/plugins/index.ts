// import * as XLSX from "xlsx";
// import * as path from "path";

// // Path to your test results Excel file
// const excelPath = path.join(__dirname, "..", "fixtures", "test_results.xlsx");

// export default (on: any) => {
//   // Register the task to write to Excel
//   on("task", {
//     writeExcel({ testCaseName, status, message }: { testCaseName: string; status: string; message: string }) {
//       try {
//         // Read the existing Excel file
//         const workbook = XLSX.readFile(excelPath);
//         const sheetName = workbook.SheetNames[0]; // Assuming you're working with the first sheet
//         const sheet = workbook.Sheets[sheetName];

//         // Find the last row to append the data
//         const jsonData = XLSX.utils.sheet_to_json(sheet);
//         const row = jsonData.length + 2; // +2 to account for Excel's row index starting at 1

//         // Add the new test result to the sheet
//         const newData = [[testCaseName, status, message]];
//         XLSX.utils.sheet_add_aoa(sheet, newData, { origin: `A${row}` });

//         // Save the updated workbook
//         XLSX.writeFile(workbook, excelPath);

//         return null; // Return null to indicate task completion
//       } catch (error) {
//         console.error("Error writing to Excel:", error);
//         return null; // Return null even in case of an error
//       }
//     },
//   });
// };


// import * as path from "path";
// import * as ExcelJS from "exceljs";  // Import exceljs

// // Path to your test results Excel file
// const excelPath = path.join(__dirname, "..", "fixtures", "test_results.xlsx");

// export default (on: any) => {
//   // Register a custom task to handle Excel writing
//   on("task", {
//     async writeExcel({ testCaseName, status, message }: { testCaseName: string; status: string; message: string }) {
//       try {
//         // Create a new workbook instance
//         const workbook = new ExcelJS.Workbook();
//         await workbook.xlsx.readFile(excelPath);
//         const worksheet = workbook.getWorksheet(1); // Select the first worksheet (0 index)

//         // Find the first empty row to append new data
//         const rowCount = worksheet!.actualRowCount + 1;

//         // Insert new row with data (test case result)
//         const row = worksheet!.getRow(rowCount);
//         row.getCell(1).value = testCaseName; // Test Case Name
//         row.getCell(2).value = status; // Status (Passed/Failed)
//         row.getCell(3).value = message; // Message
//         row.commit();

//         // Write back to the Excel file
//         await workbook.xlsx.writeFile(excelPath);
//         return null;  // Return null to indicate task completion
//       } catch (error) {
//         console.error("Error writing to Excel:", error);
//         return null; // Return null even in case of an error
//       }
//     },
//   });
// };

import * as path from "path";
import * as ExcelJS from "exceljs"; 

const excelPath = path.join(__dirname, "..", "fixtures", "test_results.xlsx");

export default (on: any) => {
  on("task", {
    async writeExcel({
      testCaseName,
      status,
      message,
      timestamp,
      responseTime,
      expectedStatusCode,
      actualStatusCode,
      flag,
    }: {
      testCaseName: string;
      status: string;
      message: string;
      timestamp: string;
      responseTime: number;
      expectedStatusCode: number;
      actualStatusCode: number;
      flag: string;
    }) {
      try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(excelPath);
        const worksheet = workbook.getWorksheet(1);

        // Find the first empty row to append data
        const rowCount = worksheet!.actualRowCount + 1;
        const row = worksheet!.getRow(rowCount);

        // Insert structured data into respective columns
        row.getCell(1).value = rowCount - 1; // Auto-increment Serial Number
        row.getCell(2).value = testCaseName;
        row.getCell(3).value = status;
        row.getCell(4).value = message;
        row.getCell(5).value = timestamp;
        row.getCell(6).value = `${responseTime} ms`;
        row.getCell(7).value = expectedStatusCode;
        row.getCell(8).value = actualStatusCode;
        row.getCell(9).value = flag;

        for (let col = 1; col <= 9; col++) {
          row.getCell(col).alignment = { horizontal: "center" };
        }

        row.commit();

        // Save the updated workbook
        await workbook.xlsx.writeFile(excelPath);
        return null;
      } catch (error) {
        console.error("Error writing to Excel:", error);
        return null;
      }
    },
  });
};

