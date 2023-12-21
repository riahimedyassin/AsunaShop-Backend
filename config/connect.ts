import mongoose = require("mongoose");

export const connectToDB = async (url: string) => {
  try {
    const connected = await mongoose.connect(url);
    if (connected) console.log('[SERVER] : Connected Successfully to DB'); 
  } catch (error) {
    throw error;
  }
};
