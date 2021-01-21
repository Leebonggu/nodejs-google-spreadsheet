const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('Your Key');
const doc = new GoogleSpreadsheet('Your Sheet');

async function authGoogleSheet() {
  try {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    console.log('success');
  } catch(e) {
    console.log('auth error', e);
  }
}

async function isIncludeSheet(info) {
  try {
    let newSheet;
    let result;
    const sheet = doc.sheetsByIndex;
    const month = new Date().getMonth() + 1;
    const sheetNameList = sheet.map(e => e.title);
    if (!sheetNameList.includes(`${month}`)) {
      newSheet = await doc.addSheet({
        headerValues: [ 'date',	'name', 'email', 'phone', 'suject']
      });
      newSheet.updateProperties({
        title: `${month}`,
      })
    }

    if (newSheet) {
      newSheet.addRow({
        ...info
      });
      result = await newSheet.getRows();
    } else {
      const currentSheet = sheet[sheet.length - 1];
      currentSheet.addRow({
        ...info
      });
      result = await currentSheet.getRows();
    }
    return result;
  } catch(e) {
    console.log(e)
  }
}

module.exports = (async (inf) => {
  await authGoogleSheet();
  await isIncludeSheet(info);
});

