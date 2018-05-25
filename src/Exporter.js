import Formatter from 'fast-submission2csv';
import XLS from 'xlsx';

let Exporter = class {
  static async to({ output, options, data, formioForm, translations, language }) {
    let exportedFile;

    switch (output.toLowerCase()) {
      case 'csv':
        let file = await Exporter.csv({
          data,
          formioForm,
          translations,
          language
        });

        exportedFile = file.csv;
        break;
      case 'json':
        let jsonFile = await Exporter.format({
          data,
          formioForm,
          translations,
          language
        });

        exportedFile = JSON.stringify(jsonFile.data);

        break;
      default:
        let aoa = await Formatter.csv({
          data: data,
          formioForm,
          translations,
          language,
          options: {
            rawArray: true
          }
        });

        let ws = XLS.utils.aoa_to_sheet(aoa.result);
        let workbook = XLS.utils.book_new();

        XLS.utils.book_append_sheet(workbook, ws, 'Sheet1');

        let wopts = { bookType: output, bookSST: false, type: 'array' };

        exportedFile = XLS.write(workbook, wopts);
        break;
    }
    return exportedFile;
  }
};

export default Exporter;
