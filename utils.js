const moment = require("moment");
const XLSX = require("xlsx");



module.exports = {
  dataExtractor: async () => {
    try {
      const workbook = XLSX.readFile(`${__dirname}/indiaCovidNew.xlsx`);
      var data = [];
      var info = null;
      var sheet_name_lists = workbook.SheetNames;
      sheet_name_lists.forEach(function (y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};

        for (z in worksheet) {
          if (z[0] === "!") continue;

          var tt = 0;
          for (var i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
              tt = i;
              break;
            }
          }
          var col = z.substring(0, tt);
          var row = parseInt(z.substring(tt));
          var value = worksheet[z].v;

          if (row == 1 && value) {
            headers[col] = value;
            continue;
          }

          if (!data[row]) data[row] = {};
          data[row][headers[col]] = value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();

        info = data;
      });
      return info;
    } catch (e) {
      console.log(e, "error");
    }
  },

  newFormate: async (data) => {
    try {
      let newData = [];
      const countryObj = [
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
      let coutriesData = {};
      let formate = {};
      for (var i = 0; i < countryObj.length; i++) {
        const country = countryObj[i];
        coutriesData = {
          ...coutriesData,
          [country]:0
          //  {
            // Cured: 0,
            // Deaths: 0,
            // Confirmed: 0,
          // },
        };
      }

      for (var i = 0; i < data.length ; i++) {
        let k = 0;

        do {
          if (k != 0 && i<data.length) {
            i = i + 1;
          }
          if (data[i + 1] == undefined) {
            break;
          }
          k = k + 1;

          for (var j = 0; j < countryObj.length; j++) {
            const country = countryObj[j];
            if (countryObj[j] == data[i]["State/UnionTerritory"]) {
              // const dataCountry = {
              //   Cured: data[i].Cured,
              //   Deaths: data[i].Deaths,
              //   Confirmed: data[i].Confirmed,
              // };
              coutriesData = {
                ...coutriesData,
                [country]:data[i].Cured
                //  {
                //   ...dataCountry,
                // },
              };
            }
          }

          formate = {
            Sno: data[i].Sno,
            Date: data[i].Date,
            ...coutriesData,
          };

          if (data[i].Date != data[i + 1].Date) {
            newData.push(formate);

            break;
          }
        } while (data[i].Date == data[i + 1].Date);
      }

      return newData;
    } catch (e) {
      console.log(e, "error");
    }
  },
};
