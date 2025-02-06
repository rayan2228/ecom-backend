import Redis from "ioredis";
import { REDIS_URL } from "../constant.js";

export const connectRedis = () => {
  try {
    const client = new Redis(REDIS_URL);
    console.log("Redis connected successfully");
    return client;
  } catch (error) {
    console.log("Redis error", error);
  }
};

