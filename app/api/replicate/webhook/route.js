
export default async function handler(req, res) {
    console.log("🪝 incoming webhook!", req.body.id);
    const prediction = req.body;
    await saveToMyDatabase(prediction);
    await sendSlackNotification(prediction);
    res.end();
  }