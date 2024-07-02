import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  try {
    await mongooseConnect();
    res.status(200).json({ message: 'Connection successful' });
  } catch (error) {
    res.status(500).json({ message: 'Connection failed', error: error.message });
  }
}
