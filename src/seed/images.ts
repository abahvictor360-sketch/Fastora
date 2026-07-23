import sharp from 'sharp'

/** Generates a branded gradient placeholder JPEG (Navy / Sky Blue / Gold palette) for seed media. */
export const generateGradientImage = async (
  colors: [string, string],
  width = 1600,
  height = 1000,
): Promise<Buffer> => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors[0]}" />
          <stop offset="100%" stop-color="${colors[1]}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
    </svg>
  `

  return sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toBuffer()
}
