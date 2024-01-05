import uploadPrediction from "@/lib/replicate/uploadPrediction";

export default async function POST(req, res) {
    console.log("🪝 incoming webhook!", req.body.id);
    const { prediction } = req.body;
    console.log(prediction);
    await uploadPrediction(prediction);
    res.end();
  } 