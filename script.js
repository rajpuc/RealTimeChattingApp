const fs = require("fs");

function convertImageToBase64(imagePath) {
  try {
    const image = fs.readFileSync(imagePath); // Read the image file
    const base64String = `data:image/jpeg;base64,${image.toString("base64")}`; // Convert to Base64

    console.log("✅ Base64 Image:\n", base64String); // Log Base64 to console
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Example Usage:
const imagePath = "G:/JOB RESOURCES/RajeshImg.jpg"; // Your image file path
convertImageToBase64(imagePath);
