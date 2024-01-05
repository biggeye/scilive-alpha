import uploadPrediction from "@/lib/replicate/uploadPrediction";

export async function post(req, res) {
    console.log("🪝 incoming webhook!", req.body.id);
    const { prediction } = req.body;
    console.log(prediction);
    await uploadPrediction(prediction);
    res.end();
}
