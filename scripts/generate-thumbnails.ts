import sharp from "sharp";
import fs from "fs";
import path from "path";

// Configuration
const services = [
  "braid", "dreadlock", "manicure", "pedicure", "haircut",
  "ghanaWeaving", "hairTreatment", "weaveOn", "wigInstallation", "wigVentilation",
  "makeUp", "massageChair", "piercing", "lash", "training"
];

const inputDir = path.join(process.cwd(), "public", "services");
const thumbDir = path.join(inputDir, "thumbnails");

// Ensure thumbnails directory exists
if (!fs.existsSync(thumbDir)) {
  fs.mkdirSync(thumbDir);
}

async function generateThumbnails() {
  for (const service of services) {
    const servicePath = path.join(inputDir, service);
    const serviceThumbPath = path.join(thumbDir, service);

    if (!fs.existsSync(serviceThumbPath)) {
      fs.mkdirSync(serviceThumbPath, { recursive: true });
    }

    const files = fs.readdirSync(servicePath).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    for (const file of files) {
      const inputFile = path.join(servicePath, file);
      const outputFile = path.join(serviceThumbPath, file.replace(/\.(jpg|jpeg|png)$/, ".webp"));

      // Only create thumbnail if it doesn't exist
      if (!fs.existsSync(outputFile)) {
        await sharp(inputFile)
          .resize(160, 160) // Adjust size as needed
          .webp({ quality: 75 })
          .toFile(outputFile);
        console.log(`Generated thumbnail for ${file}`);
      }
    }
  }
}

generateThumbnails()
  .then(() => console.log("All thumbnails generated!"))
  .catch(err => console.error("Thumbnail generation failed:", err));
