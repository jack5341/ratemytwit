// import assert from 'assert'
// import request from 'supertest'
// import app from '../app.js';

// const req = request(app)

// describe('Feed', function () {

//   describe('GET', function () {
//     it('should return an array or null', function () {
//       req.get("/api/feed")
//         .expect("Content-Type", "application/json")
//         .expect(200).end((err, res) => {
//           if (err) throw err;
//         })
//     });
//   });

//   describe('PUT', function () {
//     it('should return a boolean', function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });

//   describe('POST', function () {
//     it('should return an user object', function () {
//       req.post("/api/feed")
//         .send({
//           description: "test",
//           tweet: "test",
//           ownerId: null
//         })
//         .expect("Content-Type", "application/json")
//         .expect(200)
//         .end((err, res) => {
//           if (err) throw err;
//         })
//     });
//   });

//   describe('DELETE', function () {
//     it('should return a boolean', function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
