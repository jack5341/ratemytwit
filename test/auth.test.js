import assert from 'assert'
import request from 'supertest'
import app from '../app.js';

const req = request(app)

describe('Login', function () {
  describe('should return an string (token)', function () {
    it('should return token as string', async function () {
        this.timeout(0);
        await req.post("/auth/login")
        .send({
            username: "jack5341",
            password: "1234567"
        })
        .expect(200).then((response)=> {
            console.log(response);
            assert.ok(typeof response.text == 'string')
        })
    });
  });
});
