import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

// __dirname ES modüllerde olmadığı için manuel oluşturuyoruz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ayarlar
const PUBLIC_DIR = path.join(__dirname, "../public");
const THUMBNAILS_DIR = path.join(PUBLIC_DIR, "thumbnails");
const TARGET_WIDTH = 400; // Thumbnail genişliği
const QUALITY = 80;

// İzin verilen resim uzantıları
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

async function generateThumbnails() {
  console.log("🖼️  Thumbnail oluşturma işlemi başlatılıyor...");

  // Thumbnails klasörü yoksa oluştur
  if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
    console.log("📁 Thumbnails klasörü oluşturuldu.");
  }

  // Public klasöründeki dosyaları oku
  const files = fs.readdirSync(PUBLIC_DIR);

  // Sadece resim dosyalarını filtrele
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });

  console.log(`🔍 Toplam ${imageFiles.length} resim bulundu.`);

  // İşleme başla
  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const outputPath = path.join(THUMBNAILS_DIR, file);

    // Eğer thumbnail zaten varsa ve kaynak dosya daha yeni değilse atla (incremental build)
    if (fs.existsSync(outputPath)) {
      const inputStat = fs.statSync(inputPath);
      const outputStat = fs.statSync(outputPath);

      if (outputStat.mtime > inputStat.mtime) {
        // console.log(`⏭️  Atlandı (Güncel): ${file}`);
        skippedCount++;
        continue;
      }
    }

    try {
      await sharp(inputPath)
        .resize(TARGET_WIDTH, null, {
          // Genişlik sabit, yükseklik orantılı
          withoutEnlargement: true, // Eğer resim zaten küçükse büyütme
        })
        .jpeg({ quality: QUALITY, mozjpeg: true }) // Hepsini JPEG'e çevirebiliriz ya da formatı koruyabiliriz.
        // Ancak tutarlılık için ve sharp varsayılanı olarak,
        // formatı inputa göre otomatik de yapabiliriz .toFile(outputPath) diyerek.
        // Burada .toFile ile uzantıya göre otomatik format algılatacağız.
        // Ama kalite ayarı için explicit olmak gerekebilir.
        // Şimdilik basitçe resize edip kaydediyoruz, sharp uzantıdan anlar.
        .toFile(outputPath);

      console.log(`✅ Oluşturuldu: ${file}`);
      processedCount++;
    } catch (error) {
      console.error(`❌ Hata (${file}):`, error.message);
      errorCount++;
    }
  }

  console.log("\n📊 Özet:");
  console.log(`   - İşlenen: ${processedCount}`);
  console.log(`   - Atlanan (Zaten güncel): ${skippedCount}`);
  console.log(`   - Hatalı: ${errorCount}`);
  console.log("✨ İşlem tamamlandı!");
}

generateThumbnails();
