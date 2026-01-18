import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

// __dirname ES modüllerde olmadığı için manuel oluşturuyoruz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ayarlar
const PUBLIC_DIR = path.join(__dirname, "../../public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const OPTIMIZED_DIR = path.join(IMAGES_DIR, "optimized");
const TARGET_WIDTHS = [320, 480, 640, 800, 960, 1200]; // More granular resolutions
const QUALITY = 80;

// İzin verilen resim uzantıları
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

async function optimizeImages() {
  console.log("🖼️  Resim optimizasyon işlemi başlatılıyor...");

  // Images klasöründeki dosyaları oku
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error("❌ Images klasörü bulunamadı!");
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);

  // Sadece resim dosyalarını filtrele, 'optimized' klasörünü ve diğer alt klasörleri atla
  const imageFiles = files.filter((file) => {
    const filePath = path.join(IMAGES_DIR, file);
    if (fs.statSync(filePath).isDirectory()) return false;

    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });

  console.log(`🔍 Toplam ${imageFiles.length} ana resim bulundu.`);

  // İşleme başla
  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const width of TARGET_WIDTHS) {
    const widthDir = path.join(OPTIMIZED_DIR, width.toString());

    // Klasör yoksa oluştur
    if (!fs.existsSync(widthDir)) {
      fs.mkdirSync(widthDir, { recursive: true });
      console.log(`📁 Klasör oluşturuldu: ${width}px`);
    }

    for (const file of imageFiles) {
      const inputPath = path.join(IMAGES_DIR, file);
      const outputPath = path.join(widthDir, file);

      // Eğer optimized resim zaten varsa ve kaynak dosya daha yeni değilse atla (incremental build)
      if (fs.existsSync(outputPath)) {
        const inputStat = fs.statSync(inputPath);
        const outputStat = fs.statSync(outputPath);

        if (outputStat.mtime > inputStat.mtime) {
          skippedCount++;
          continue;
        }
      }

      try {
        const ext = path.extname(file).toLowerCase();
        let sharpInstance = sharp(inputPath)
          .rotate() // EXIF orientation'a göre otomatik döndür
          .resize(width, null, {
            // Genişlik sabit, yükseklik orantılı
            withoutEnlargement: true, // Eğer resim zaten küçükse büyütme
          });

        // Format'a göre doğru encoder kullan
        if (ext === ".png") {
          sharpInstance = sharpInstance.png({ quality: QUALITY });
        } else if (ext === ".webp") {
          sharpInstance = sharpInstance.webp({ quality: QUALITY });
        } else {
          sharpInstance = sharpInstance.jpeg({
            quality: QUALITY,
            mozjpeg: true,
          });
        }

        await sharpInstance.toFile(outputPath);
        console.log(`✅ [${width}px] Oluşturuldu: ${file}`);
        processedCount++;
      } catch (error) {
        console.error(`❌ Hata (${file} - ${width}px):`, error.message);
        errorCount++;
      }
    }
  }

  console.log("\n📊 Özet:");
  console.log(`   - İşlenen: ${processedCount}`);
  console.log(`   - Atlanan (Zaten güncel): ${skippedCount}`);
  console.log(`   - Hatalı: ${errorCount}`);
  console.log("✨ İşlem tamamlandı!");
}

optimizeImages();
