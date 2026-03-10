import { ref } from "vue";

const CHAR_PRESETS = {
  alphanumeric:
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  numeric: "0123456789",
  letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
} as const;

function secureRandom(): number {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0]! / (0xffffffff + 1);
  }
  return Math.random();
}

/**
 * Options for the useCaptcha composable.
 */
export interface UseCaptchaOptions {
  chars?: string;
  charsPreset?: "alphanumeric" | "numeric" | "letters" | "custom";
  count?: number;
}

/**
 * useCaptcha - Composable for captcha code generation and validation.
 * Use with VueClientRecaptcha or build custom captcha UIs.
 * @param optionsOrGetter - Options object or getter for reactive options
 * @returns { code, generate, validate, reset }
 */
type OptionsInput =
  | UseCaptchaOptions
  | (() => UseCaptchaOptions);

export function useCaptcha(optionsOrGetter: OptionsInput = {}) {
  const getOptions =
    typeof optionsOrGetter === "function"
      ? optionsOrGetter
      : () => optionsOrGetter as UseCaptchaOptions;

  const code = ref("");

  function generate(): string {
    const {
      chars = CHAR_PRESETS.alphanumeric,
      charsPreset = "alphanumeric",
      count = 5,
    } = getOptions();

    const effectiveChars =
      charsPreset === "custom" ? chars : CHAR_PRESETS[charsPreset] ?? chars;
    let result = "";
    const charsStr = effectiveChars;
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(secureRandom() * charsStr.length);
      result += charsStr[idx];
    }
    code.value = result;
    return result;
  }

  function validate(input: string): boolean {
    return !!code.value && code.value === input;
  }

  function reset(): string {
    return generate();
  }

  return {
    code,
    generate,
    validate,
    reset,
  };
}
