import assert from 'assert'
import request from 'supertest'
import dotenv from "dotenv"
import app from '../app.js';

dotenv.config()
const req = request(app)

describe('Auth', function () {
  describe('POST /auth/login', function () {
    it('should return token as string', async function () {
        this.timeout(0);
        await req.post("/auth/login")
        .send({
            username: process.env.TEST_USERNAME,
            password: process.env.TEST_PASSWORD
        })
        .expect(200).then((response)=> {
            assert.ok(typeof response.text == 'string')
        })
    });
  });

  describe('POST /auth/register', function () {
    it('should return token as string', async function () {
        let username = (Math.random() + 1).toString(36).substring(7);      
        let password = (Math.random() + 1).toString(36).substring(7);      

        this.timeout(0);
        await req.post("/auth/register")
        .send({
            username: username,
            password: password
        })
        .expect(200).then((response)=> {
            assert.ok(typeof response.text == 'string')
        })
    });
  });
});
