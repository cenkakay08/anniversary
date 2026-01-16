#!/usr/bin/env node

/**
 * LED/Neon SVG Generator
 *
 * Converts raster images (PNG/JPG) to animated SVG with neon glow effects.
 * Uses stroke-dasharray/stroke-dashoffset for line-drawing animation.
 *
 * Usage:
 *   node generate-led-svg.js <input> <output> [options]
 *
 * Example:
 *   node generate-led-svg.js input.png output.svg --glow-strength 15 --animation-duration 3
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Command } from "commander";
import sharp from "sharp";
import potrace from "potrace";
import { optimize } from "svgo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// Configuration Defaults
// ============================================================================

const DEFAULT_CONFIG = {
  // Tracing options
  threshold: 128, // 0-255: threshold for black/white conversion
  turdSize: 2, // Suppress speckles up to this size
  turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
  optCurve: true, // Optimize curves
  optTolerance: 0.2, // Curve optimization tolerance

  // Visual options
  strokeColor: "#00ffff", // Cyan neon color
  strokeWidth: 2,
  glowStrength: 10, // Blur radius for glow effect
  glowOpacity: 0.8,
  backgroundColor: "transparent", // or "#0a0a0a" for dark background

  // Animation options
  animationDuration: 2.5, // Seconds for full line draw
  animationDelay: 0, // Delay before animation starts
  animationEasing: "ease-in-out",
  loopAnimation: true,

  // Image preprocessing
  invert: false, // Invert colors before tracing
  blur: 0, // Gaussian blur to smooth edges (0 = disabled)
  contrast: 1.0, // Contrast adjustment (1.0 = no change)

  // Output options
  outputWidth: null, // null = keep original aspect ratio
  outputHeight: null,
  optimizeSvg: true, // Run SVGO optimization
};

// ============================================================================
// CLI Setup
// ============================================================================

const program = new Command();

program
  .name("generate-led-svg")
  .description("Convert images to animated neon/LED line-drawing SVGs")
  .version("1.0.0")
  .argument("<input>", "Input image file (PNG, JPG, JPEG, WebP)")
  .argument("<output>", "Output SVG file path")
  .option("-t, --threshold <number>", "Black/white threshold (0-255)", "128")
  .option("-c, --stroke-color <color>", "Stroke color (hex)", "#00ffff")
  .option("-w, --stroke-width <number>", "Stroke width in pixels", "2")
  .option("-g, --glow-strength <number>", "Glow blur radius", "10")
  .option("-d, --animation-duration <seconds>", "Animation duration", "2.5")
  .option("--animation-delay <seconds>", "Animation delay", "0")
  .option("--no-loop", "Disable animation loop")
  .option("--invert", "Invert image colors before tracing")
  .option("--blur <number>", "Blur image before tracing (smoothing)", "0")
  .option("--contrast <number>", "Contrast adjustment (1.0 = normal)", "1.0")
  .option("--output-width <number>", "Output SVG width")
  .option("--output-height <number>", "Output SVG height")
  .option("--background <color>", "Background color", "transparent")
  .option("--no-optimize", "Skip SVGO optimization")
  .option("--turd-size <number>", "Suppress speckles up to this size", "2")
  .option(
    "--preset <name>",
    "Use a preset (neon-cyan, neon-pink, neon-green, warm-glow, electric-blue)",
  )
  .action(async (input, output, options) => {
    try {
      await generateLedSvg(input, output, options);
    } catch (error) {
      console.error("❌ Error:", error.message);
      process.exit(1);
    }
  });

program.parse();

// ============================================================================
// Presets
// ============================================================================

const PRESETS = {
  "neon-cyan": {
    strokeColor: "#00ffff",
    glowStrength: 12,
    animationDuration: 2.5,
  },
  "neon-pink": {
    strokeColor: "#ff00ff",
    glowStrength: 15,
    animationDuration: 3,
  },
  "neon-green": {
    strokeColor: "#00ff00",
    glowStrength: 12,
    animationDuration: 2,
  },
  "warm-glow": {
    strokeColor: "#ffaa00",
    glowStrength: 20,
    animationDuration: 4,
  },
  "electric-blue": {
    strokeColor: "#0066ff",
    glowStrength: 18,
    animationDuration: 2,
  },
};

// ============================================================================
// Main Generator Function
// ============================================================================

async function generateLedSvg(inputPath, outputPath, cliOptions) {
  console.log("🔌 LED/Neon SVG Generator");
  console.log("━".repeat(50));

  // Resolve paths
  const resolvedInput = path.resolve(inputPath);
  const resolvedOutput = path.resolve(outputPath);

  // Validate input file
  if (!fs.existsSync(resolvedInput)) {
    throw new Error(`Input file not found: ${resolvedInput}`);
  }

  const validExtensions = [".png", ".jpg", ".jpeg", ".webp"];
  const inputExt = path.extname(resolvedInput).toLowerCase();
  if (!validExtensions.includes(inputExt)) {
    throw new Error(
      `Invalid input format. Supported: ${validExtensions.join(", ")}`,
    );
  }

  // Build configuration
  const config = buildConfig(cliOptions);
  console.log("📋 Configuration:");
  console.log(`   Input:  ${resolvedInput}`);
  console.log(`   Output: ${resolvedOutput}`);
  console.log(`   Stroke: ${config.strokeColor} (${config.strokeWidth}px)`);
  console.log(`   Glow:   ${config.glowStrength}px blur`);
  console.log(
    `   Animation: ${config.animationDuration}s ${config.loopAnimation ? "(loop)" : "(once)"}`,
  );

  // Step 1: Preprocess image
  console.log("\n⚙️  Preprocessing image...");
  const processedBuffer = await preprocessImage(resolvedInput, config);

  // Step 2: Trace image to SVG paths
  console.log("✏️  Tracing image to vector paths...");
  const svgPaths = await traceImage(processedBuffer, config);

  // Step 3: Generate animated SVG
  console.log("🎨 Generating animated SVG...");
  let svgContent = generateAnimatedSvg(svgPaths, config);

  // Step 4: Optimize SVG
  if (config.optimizeSvg) {
    console.log("🔧 Optimizing SVG...");
    svgContent = optimizeSvgContent(svgContent);
  }

  // Step 5: Write output file
  const outputDir = path.dirname(resolvedOutput);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(resolvedOutput, svgContent, "utf8");

  const stats = fs.statSync(resolvedOutput);
  console.log("\n✨ Done!");
  console.log(`   File size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`   Output: ${resolvedOutput}`);
}

// ============================================================================
// Configuration Builder
// ============================================================================

function buildConfig(cliOptions) {
  let config = { ...DEFAULT_CONFIG };

  // Apply preset if specified
  if (cliOptions.preset && PRESETS[cliOptions.preset]) {
    config = { ...config, ...PRESETS[cliOptions.preset] };
    console.log(`📦 Using preset: ${cliOptions.preset}`);
  }

  // Apply CLI options
  if (cliOptions.threshold) config.threshold = parseInt(cliOptions.threshold);
  if (cliOptions.strokeColor) config.strokeColor = cliOptions.strokeColor;
  if (cliOptions.strokeWidth)
    config.strokeWidth = parseFloat(cliOptions.strokeWidth);
  if (cliOptions.glowStrength)
    config.glowStrength = parseFloat(cliOptions.glowStrength);
  if (cliOptions.animationDuration)
    config.animationDuration = parseFloat(cliOptions.animationDuration);
  if (cliOptions.animationDelay)
    config.animationDelay = parseFloat(cliOptions.animationDelay);
  if (cliOptions.loop === false) config.loopAnimation = false;
  if (cliOptions.invert) config.invert = true;
  if (cliOptions.blur) config.blur = parseFloat(cliOptions.blur);
  if (cliOptions.contrast) config.contrast = parseFloat(cliOptions.contrast);
  if (cliOptions.outputWidth)
    config.outputWidth = parseInt(cliOptions.outputWidth);
  if (cliOptions.outputHeight)
    config.outputHeight = parseInt(cliOptions.outputHeight);
  if (cliOptions.background) config.backgroundColor = cliOptions.background;
  if (cliOptions.optimize === false) config.optimizeSvg = false;
  if (cliOptions.turdSize) config.turdSize = parseInt(cliOptions.turdSize);

  return config;
}

// ============================================================================
// Image Preprocessing
// ============================================================================

async function preprocessImage(inputPath, config) {
  let image = sharp(inputPath);

  // Get metadata
  const metadata = await image.metadata();
  config._originalWidth = metadata.width;
  config._originalHeight = metadata.height;

  // Resize if specified
  if (config.outputWidth || config.outputHeight) {
    image = image.resize(config.outputWidth, config.outputHeight, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // Convert to grayscale
  image = image.grayscale();

  // Apply contrast
  if (config.contrast !== 1.0) {
    const multiplier = config.contrast;
    image = image.linear(multiplier, -(128 * multiplier - 128));
  }

  // Apply blur
  if (config.blur > 0) {
    image = image.blur(config.blur);
  }

  // Invert if needed
  if (config.invert) {
    image = image.negate();
  }

  // Get final dimensions
  const finalMetadata = await image.toBuffer().then((b) => sharp(b).metadata());
  config._width = finalMetadata.width || config._originalWidth;
  config._height = finalMetadata.height || config._originalHeight;

  return await image.png().toBuffer();
}

// ============================================================================
// Image Tracing (Raster to Vector)
// ============================================================================

function traceImage(imageBuffer, config) {
  return new Promise((resolve, reject) => {
    const traceOptions = {
      threshold: config.threshold,
      turdSize: config.turdSize,
      turnPolicy: config.turnPolicy,
      optCurve: config.optCurve,
      optTolerance: config.optTolerance,
    };

    potrace.trace(imageBuffer, traceOptions, (err, svg) => {
      if (err) {
        reject(new Error(`Tracing failed: ${err.message}`));
        return;
      }

      // Extract path data from traced SVG
      const pathMatch = svg.match(/d="([^"]+)"/g);
      if (!pathMatch || pathMatch.length === 0) {
        reject(new Error("No paths found in traced image"));
        return;
      }

      const paths = pathMatch.map((p) => p.match(/d="([^"]+)"/)[1]);

      // Extract viewBox
      const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
      if (viewBoxMatch) {
        config._viewBox = viewBoxMatch[1];
      }

      resolve(paths);
    });
  });
}

// ============================================================================
// SVG Generator with Animation
// ============================================================================

function generateAnimatedSvg(paths, config) {
  const viewBox = config._viewBox || `0 0 ${config._width} ${config._height}`;
  const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);

  // Generate unique IDs for filters
  const glowFilterId = `neon-glow-${Date.now()}`;
  const pathIdPrefix = `led-path-${Date.now()}`;

  // Build SVG
  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="${viewBox}" 
     width="${vbWidth}" 
     height="${vbHeight}"
     style="background: ${config.backgroundColor}">
  
  <defs>
    <!-- Neon Glow Filter -->
    <filter id="${glowFilterId}" x="-50%" y="-50%" width="200%" height="200%">
      <!-- Outer glow (larger, softer) -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="${config.glowStrength}" result="blur1"/>
      <feColorMatrix in="blur1" type="matrix" 
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 ${config.glowOpacity} 0" result="glow1"/>
      
      <!-- Middle glow -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="${config.glowStrength / 2}" result="blur2"/>
      <feColorMatrix in="blur2" type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 ${config.glowOpacity * 1.2} 0" result="glow2"/>
      
      <!-- Inner glow (tighter, brighter) -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="${config.glowStrength / 4}" result="blur3"/>
      
      <!-- Merge all layers -->
      <feMerge>
        <feMergeNode in="glow1"/>
        <feMergeNode in="glow2"/>
        <feMergeNode in="blur3"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Animation Keyframes -->
    <style>
      @keyframes drawLine {
        0% {
          stroke-dashoffset: var(--path-length);
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
      
      @keyframes glowPulse {
        0%, 100% {
          opacity: 0.8;
          filter: brightness(1);
        }
        50% {
          opacity: 1;
          filter: brightness(1.2);
        }
      }
      
      .led-path {
        fill: none;
        stroke: ${config.strokeColor};
        stroke-width: ${config.strokeWidth};
        stroke-linecap: round;
        stroke-linejoin: round;
        filter: url(#${glowFilterId});
        animation: 
          drawLine ${config.animationDuration}s ${config.animationEasing} ${config.animationDelay}s ${config.loopAnimation ? "infinite" : "forwards"},
          glowPulse ${config.animationDuration * 2}s ease-in-out ${config.animationDelay}s infinite;
      }
    </style>
  </defs>
  
  <!-- LED/Neon Paths -->
  <g class="led-paths">
`;

  // Add each path with animation
  paths.forEach((pathData, index) => {
    const pathId = `${pathIdPrefix}-${index}`;
    // Estimate path length (this is approximate; browser will calculate actual)
    const pathLength = estimatePathLength(pathData);

    svg += `    <path id="${pathId}" 
          class="led-path" 
          d="${pathData}"
          style="--path-length: ${pathLength}; stroke-dasharray: ${pathLength}; stroke-dashoffset: ${pathLength};"/>
`;
  });

  svg += `  </g>
</svg>`;

  return svg;
}

// ============================================================================
// Path Length Estimation
// ============================================================================

function estimatePathLength(pathData) {
  // Simple estimation based on path complexity
  // Count major commands and estimate length
  const commands = pathData.match(/[MLHVCSQTAZ]/gi) || [];
  const numbers = pathData.match(/-?\d+\.?\d*/g) || [];

  // Rough estimation: more numbers and commands = longer path
  const baseLength = Math.max(1000, numbers.length * 10 + commands.length * 50);

  return baseLength;
}

// ============================================================================
// SVG Optimization
// ============================================================================

function optimizeSvgContent(svgContent) {
  const result = optimize(svgContent, {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            // Don't remove viewBox - we need it
            removeViewBox: false,
            // Don't clean IDs - we reference them
            cleanupIds: false,
            // Don't inline styles - we use CSS animations
            inlineStyles: false,
            // Keep our custom attributes
            removeUnknownsAndDefaults: {
              keepDataAttrs: true,
            },
          },
        },
      },
      // Remove comments but keep our structure
      "removeComments",
      // Minify styles carefully
      {
        name: "minifyStyles",
        params: {
          usage: false, // Don't remove unused styles
        },
      },
    ],
  });

  return result.data;
}

// ============================================================================
// Export for programmatic use
// ============================================================================

export { generateLedSvg, DEFAULT_CONFIG, PRESETS };
