// const express = require("express");
// const multer = require("multer");
// const { spawn } = require("child_process");
// const axios = require("axios");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// app.use(cors({ origin: "*" }));




// const upload = multer({ dest: "uploads/" });



// app.post("/upload", upload.single("palm"), async (req, res) => {
//   const imagePath = path.join(__dirname, req.file.path);

//   const python = spawn("python3", ["python/analyze_palm.py", imagePath]);

//   let features = "";
//   python.stdout.on("data", (data) => {
//     features += data.toString();
//   });

//   python.stderr.on("data", (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   python.on("close", async (code) => {
//     // Send to LLM (e.g., Mistral on OpenRouter)
//     const prompt = `Based on the palm features below, give a friendly palm reading:\n\n${features}`;

//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "mistralai/mistral-7b-instruct",
//         messages: [{ role: "user", content: prompt }],
//       },
//       {
//         headers: {
//           Authorization:
//             "Bearer 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",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const reading = response.data.choices[0].message.content;
//     res.json({ reading });
//   });
// });

// app.listen(5000, () => console.log("Server running on http://localhost:5000"));




const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const axios = require("axios");
const path = require("path");
const cors = require("cors");

const app = express();

// ✅ CORS Setup
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ["https://your-frontend-url.com"] // Update this with your actual frontend URL when deployed
      : ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🟢 Palm Reading Backend is running.");
});

// ✅ Multer for file upload
const upload = multer({ dest: "uploads/" });

// ✅ Palm image upload + OpenRouter LLM processing
app.post("/upload", upload.single("palm"), async (req, res) => {
  try {
    const imagePath = path.join(__dirname, req.file.path);

    const python = spawn("python", ["python/analyze_palm.py", imagePath]);

    let features = "";
    python.stdout.on("data", (data) => {
      features += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on("close", async () => {
      const prompt = `Based on the palm features below, give a friendly palm reading:\n\n${features}`;

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
        }
      );

      const reading = response.data.choices[0].message.content;
      res.json({ reading });
    });
  } catch (error) {
    console.error("Upload route error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Optional dynamic route example — placed *after* main routes
app.get("/id/:id", (req, res) => {
  res.send(`Your ID is ${req.params.id}`);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
