import Formatter from 'fast-submission2csv';
import XLS from 'xlsx';

let Exporter = class {
  static async to({ output, options, data, formioForm, translations, language }) {
    let aoa = await Formatter.csv({
      output: 'csv',
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

    let wbout = XLS.write(workbook, wopts);

    return wbout;
  }
};

export default Exporter;
