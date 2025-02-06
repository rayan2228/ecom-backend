import * as dotenv from 'dotenv'
dotenv.config()

const APP_URL = process.env.APP_URL
const origin = ["http://localhost:5173"]
const PORT = process.env.PORT
const DBURL = process.env.DBURL
const REDIS_URL=process.env.REDIS_URL
const JWT_SECRET = process.env.JWT_SECRET
const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET
const ACCESSTOKEN_EXPIRE = process.env.ACCESSTOKEN_EXPIRE
const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET
const REFRESHTOKEN_EXPIRE = process.env.REFRESHTOKEN_EXPIRE
const CLOUD_NAME = process.env.CLOUD_NAME
const CLOUD_API_KEY = process.env.CLOUD_API_KEY
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET



export { ACCESSTOKEN_EXPIRE, ACCESSTOKEN_SECRET, APP_URL, CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME, DBURL, JWT_SECRET, origin, PORT, REDIS_URL, REFRESHTOKEN_EXPIRE, REFRESHTOKEN_SECRET }

