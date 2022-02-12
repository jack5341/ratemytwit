import dotenv from "dotenv"

dotenv.config()

export const CONSTANTS = {
    SIGN_TOKEN: "nedim",
    DB_STRING: process.env.DB_CONNECT
}