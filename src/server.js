const express = require("express");
const app = express();
const OpenAI = require("./OpenAI.js");

app.use(express.json());

app.post("/api/leadership", async (req, res) => {
  const companyName = req.body.companyName;
  if (!companyName) {
    return res.status(400).send({ error: "Company name is required" });
  }

  try {
    const leadershipInfo = await OpenAI.searchInternetForInformation(
      `Leadership of ${companyName}`,
    );
    res.send({ leadershipInfo });
  } catch (error) {
    res.status(500).send({ error: "Error retrieving leadership information" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
