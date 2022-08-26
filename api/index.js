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
const server = require('./src/app.js');
const { loadUsersInDB, loadBikesInDB, loadBookingsInDB } = require('./src/data/loadData.js');
const { conn } = require('./src/db.js');
const jsonUser = require('./src/data/users.json')
const jsonBike = require('./src/data/bikes.json')
const jsonBooking = require('./src/data/bookings.json')


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    // console.log('%s listening at 3001'); // eslint-disable-line no-console
    // loadUsersInDB(jsonUser)
    // console.log('Users loaded ok to DB'); // eslint-disable-line no-console
    // loadBikesInDB(jsonBike)
    // console.log('Bikes loaded ok to DB'); // eslint-disable-line no-console
    // loadBookingsInDB(jsonBooking)
    // console.log('Bookings loaded ok to DB'); // eslint-disable-line no-console
  });
});
