import dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  uri:
    process.env.MONGOURL ||
    "mongodb+srv://sudeepbhattarai1792:d0ICAoLMDsmsgP5K@hackademia.anr9l.mongodb.net/?retryWrites=true&w=majority&appName=Hackademia",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
