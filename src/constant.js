import * as dotenv from 'dotenv'
dotenv.config()

const APP_URL = process.env.APP_URL
const origin = ["http://localhost:5173"]
const PORT = process.env.PORT
const DBURL = process.env.DBURL
const JWT_SECRET = process.env.JWT_SECRET
const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET
const ACCESSTOKEN_EXPIRE = process.env.ACCESSTOKEN_EXPIRE
const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET
const REFRESHTOKEN_EXPIRE = process.env.REFRESHTOKEN_EXPIRE
const CLOUD_NAME = process.env.CLOUD_NAME
const CLOUD_API_KEY = process.env.CLOUD_API_KEY
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET



export { PORT, DBURL, JWT_SECRET, ACCESSTOKEN_EXPIRE, ACCESSTOKEN_SECRET, REFRESHTOKEN_EXPIRE, REFRESHTOKEN_SECRET,CLOUD_API_KEY,CLOUD_NAME,CLOUD_API_SECRET,origin,APP_URL }