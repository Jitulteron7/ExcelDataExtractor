const xl = require("excel4node");
const wb = new xl.Workbook();
const ws = wb.addWorksheet("Worksheet Name");

module.exports = {
  saveAsExel: async (data) => {
    const headingColumnNames = [
      "Sno",
      "Date",
      "Andhra Pradesh",
      "Andaman and Nicobar Islands",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Lakshadweep",
      "Ladakh",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telengana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
    ];
    
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });
    
    let rowIndex = 2;
    data.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
          if(typeof(record[columnName])==="string"){
            ws.cell(rowIndex, columnIndex++).string((record[columnName]))
          }else if(typeof(record[columnName])==="number") {
            ws.cell(rowIndex, columnIndex++).number((record[columnName]))
          }   
      });
      rowIndex++;
    });
    wb.write("CuredCase.xlsx");
    return true
  },
};
