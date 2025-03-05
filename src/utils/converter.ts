import TOML from '@iarna/toml'
import YAML from 'yaml'

export function detectFormat(input) {
  // Skip empty input
  if (!input.trim()) return null

  try {
    // Try parsing as JSON first
    JSON.parse(input)
    return 'json'
  } catch {
    try {
      // Try parsing as YAML
      YAML.parse(input)
      return 'yaml'
    } catch {
      try {
        // Try parsing as TOML
        TOML.parse(input)
        return 'toml'
      } catch {
        return null
      }
    }
  }
}

export function convertFormat(input, fromFormat, toFormat) {
  if (!input.trim()) return ''

  try {
    // Parse input based on source format
    let parsed
    switch (fromFormat) {
      case 'json':
        parsed = JSON.parse(input)
        break
      case 'yaml':
        parsed = YAML.parse(input)
        break
      case 'toml':
        parsed = TOML.parse(input)
        break
      default:
        throw new Error('Unsupported input format')
    }

    // Convert to target format
    switch (toFormat) {
      case 'json':
        return JSON.stringify(parsed, null, 2)
      case 'yaml':
        return YAML.stringify(parsed)
      case 'toml':
        return TOML.stringify(parsed)
      default:
        throw new Error('Unsupported output format')
    }
  } catch (error) {
    console.error('Conversion error:', error)
    return input // Return original input on error
  }
}
