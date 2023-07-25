const dayjs = require("dayjs")
const date = dayjs().format("YYYYMMDD")
const epa_url = `https://aqs.epa.gov/data/api/dailyData/bySite?email=test@aqs.api&key=test&param=44201&bdate=20170720&edate=20170720&state=37&county=183&site=0014`;
console.log(date)