# LED/Neon SVG Generator

Converts raster images (PNG/JPG/WebP) to animated SVG with neon glow line-drawing effects using stroke-dasharray/stroke-dashoffset animation.

## Features

- 🎨 Converts images to vector line-art paths
- ✨ Animated stroke drawing effect
- 💡 Neon glow using SVG filters
- 🔄 Smooth looping animation
- ⚙️ Configurable options (colors, timing, glow intensity)
- 📦 Multiple presets included

## Installation

Dependencies are included in the main `package.json` as devDependencies. Just run:

```bash
npm install
```

## Usage

### From Project Root (via npm script)

```bash
# Basic usage
npm run generate:led-svg -- input.png output.svg

# With preset
npm run generate:led-svg -- input.png output.svg --preset neon-pink

# With custom options
npm run generate:led-svg -- input.png output.svg --stroke-color "#ff00ff" --glow-strength 15 --animation-duration 3
```

### Direct Node Execution

```bash
node tools/led-svg-generator/generate-led-svg.js input.png output.svg [options]
```

## Options

| Option                               | Default       | Description                                      |
| ------------------------------------ | ------------- | ------------------------------------------------ |
| `-t, --threshold <number>`           | `128`         | Black/white threshold (0-255) for edge detection |
| `-c, --stroke-color <color>`         | `#00ffff`     | Stroke color in hex format                       |
| `-w, --stroke-width <number>`        | `2`           | Stroke width in pixels                           |
| `-g, --glow-strength <number>`       | `10`          | Glow blur radius (higher = softer glow)          |
| `-d, --animation-duration <seconds>` | `2.5`         | Duration for complete line draw                  |
| `--animation-delay <seconds>`        | `0`           | Delay before animation starts                    |
| `--no-loop`                          | -             | Disable animation loop (play once)               |
| `--invert`                           | -             | Invert image colors before tracing               |
| `--blur <number>`                    | `0`           | Blur image before tracing (smooths edges)        |
| `--contrast <number>`                | `1.0`         | Contrast adjustment (1.0 = normal)               |
| `--output-width <number>`            | -             | Resize output SVG width                          |
| `--output-height <number>`           | -             | Resize output SVG height                         |
| `--background <color>`               | `transparent` | Background color                                 |
| `--no-optimize`                      | -             | Skip SVGO optimization                           |
| `--turd-size <number>`               | `2`           | Suppress speckles up to this size                |
| `--preset <name>`                    | -             | Use a preset configuration                       |

## Presets

| Preset          | Stroke Color | Glow | Duration |
| --------------- | ------------ | ---- | -------- |
| `neon-cyan`     | #00ffff      | 12   | 2.5s     |
| `neon-pink`     | #ff00ff      | 15   | 3s       |
| `neon-green`    | #00ff00      | 12   | 2s       |
| `warm-glow`     | #ffaa00      | 20   | 4s       |
| `electric-blue` | #0066ff      | 18   | 2s       |

## Examples

### Simple Line Art from Logo

```bash
npm run generate:led-svg -- logo.png logo-neon.svg --preset neon-cyan
```

### High-Detail Portrait with Custom Settings

```bash
npm run generate:led-svg -- photo.jpg output.svg \
  --threshold 100 \
  --stroke-color "#ff3366" \
  --glow-strength 20 \
  --animation-duration 4 \
  --blur 1
```

### Create Dark Theme Animation

```bash
npm run generate:led-svg -- design.png neon-design.svg \
  --background "#0a0a0a" \
  --stroke-color "#00ff88" \
  --glow-strength 15
```

## Tips for Best Results

1. **Input images**: Works best with:
   - High contrast images
   - Clear silhouettes/logos
   - Line drawings
   - Text/typography

2. **Threshold**: Adjust for cleaner edges
   - Lower values (50-100): More detail, more paths
   - Higher values (150-200): Simpler, cleaner lines

3. **Blur**: Small blur (0.5-2) can smooth noisy images

4. **Turd size**: Increase to remove small speckles/noise

5. **Glow strength**:
   - 5-10: Subtle glow
   - 15-25: Heavy neon effect
   - 30+: Extreme bloom

## Output

The generated SVG includes:

- SVG paths traced from the input image
- CSS keyframe animations for line drawing
- SVG filter for multi-layer glow effect
- Pulse animation for realistic neon flicker

## Dependencies

- **sharp**: Image preprocessing
- **potrace**: Raster to vector tracing
- **svgo**: SVG optimization
- **commander**: CLI interface
