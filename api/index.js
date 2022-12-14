//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const httpServer = require('./src/socketIO');
const { loadAllModelsInDB } = require('./src/controllers/loadData.js');
const { conn, Bike } = require('./src/db.js');


// Syncing all the models at once.

conn.sync({ force: false }).then(async () => {
  httpServer.listen(process.env.PORT || 3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const bikes = await Bike.findAll()
    bikes.length ? null : loadAllModelsInDB();
  });
});
