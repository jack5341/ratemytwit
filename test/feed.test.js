import assert from 'assert'
import request from 'supertest'
import app from '../app.js';

const req = request(app)

const res = await req.post("/auth/login").send({
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD
})

let tweet = (Math.random() + 1).toString(36).substring(50);
let description = (Math.random() + 1).toString(36).substring(280);

const token = res.text

describe('Feed', function () {

    describe('GET /api/feed', function () {
        it('should return an object', async function () {
            req.get("/api/feed")
                .set('Authorization', 'Bearer ' + token) //set header for this test
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200).then((response) => {
                    assert.ok(typeof response.body == "object")
                })
        });
    });

    //   describe('PUT', function () {
    //     it('should return a boolean', function () {
    //       assert.equal([1, 2, 3].indexOf(4), -1);
    //     });
    //   });

    describe('POST /api/feed', function () {
        it('should return an object', function () {
            req.post("/api/feed")
                .send({
                    description: description,
                    tweet: tweet,
                    ownerId: token
                })
                .expect("Content-Type", "application/json")
                .expect(200).then((response) => {
                    assert.ok(typeof response.body == "object")
                })
        });
    });

    //   describe('DELETE', function () {
    //     it('should return a boolean', function () {
    //       assert.equal([1, 2, 3].indexOf(4), -1);
    //     });
    //   });
});