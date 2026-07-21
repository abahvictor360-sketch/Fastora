/** The color fields from Site Settings → Colors that drive the theme. */
export interface BrandPalette {
  accentColor?: string | null
  backgroundColor?: string | null
  textColor?: string | null
  surfaceColor?: string | null
  borderColor?: string | null
  mutedTextColor?: string | null
  primaryColor?: string | null
  darkPanelTextColor?: string | null
}

/**
 * Turns the admin-editable color palette (Site Settings → Colors) into a
 * `:root { ... }` CSS override string. Each saved value overrides the matching
 * design token from globals.css; blank fields fall back to the built-in theme.
 *
 * The returned string is injected as a <style> tag in the frontend layout,
 * so changing colors in the admin recolors the entire public site.
 */
export function buildBrandStyle(settings: BrandPalette | null | undefined): string {
  if (!settings) return ''

  const rules: string[] = []
  const set = (cssVar: string, value?: string | null) => {
    if (value && typeof value === 'string' && value.trim()) {
      rules.push(`${cssVar}: ${value.trim()};`)
    }
  }

  set('--background', settings.backgroundColor)
  set('--foreground', settings.textColor)
  set('--color-card-foreground', settings.textColor)
  set('--color-primary', settings.primaryColor)
  set('--color-primary-foreground', settings.darkPanelTextColor)
  set('--color-card', settings.surfaceColor)
  set('--color-muted', settings.surfaceColor)
  set('--color-muted-foreground', settings.mutedTextColor)
  set('--color-border', settings.borderColor)

  const accent = settings.accentColor?.trim()
  if (accent) {
    rules.push(`--color-secondary: ${accent};`)
    rules.push(`--color-accent: ${accent};`)
    rules.push(`--color-ring: ${accent};`)
    rules.push(
      `--gradient-velocity: linear-gradient(100deg, color-mix(in srgb, ${accent} 75%, #ffffff) 0%, ${accent} 100%);`,
    )
  }

  if (!rules.length) return ''
  return `:root{${rules.join('')}}`
}
