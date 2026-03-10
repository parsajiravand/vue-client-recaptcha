# Migration Guide: v1.x → v2.0

## Breaking Changes

### 1. Vue as Peer Dependency

Vue is now a peer dependency. Ensure Vue 3.2+ is installed in your project:

```bash
npm install vue@^3.2
```

### 2. `value` Prop (Deprecated)

Use `v-model` or `modelValue` instead of `value`:

```vue
<!-- v1 -->
<VueClientRecaptcha :value="inputValue" @input="inputValue = $event" />

<!-- v2 (preferred) -->
<VueClientRecaptcha v-model="inputValue" />
```

The `value` prop remains supported for backward compatibility but is deprecated.

### 3. `width` Prop Bug Fix

In v1, the default `width` function was incorrectly used as a raw value. v2 fixes this: when `width` is a function `(p) => p.count * 30`, it is now properly called to compute the numeric width.

If you relied on the broken behavior, update your usage. The intended behavior is that `width` can be:

- A number: `width="150"`
- A function: `:width="(p) => p.count * 30"` (default)

### 4. Removed `isDirty` Prop

The `isDirty` prop was never used and has been removed. No migration needed.

## New Features

### v-model:valid

You can now bind the validation state with `v-model:valid`:

```vue
<VueClientRecaptcha v-model="input" v-model:valid="isValid" />
```

### New Props

- `charsPreset` – `"alphanumeric" | "numeric" | "letters" | "custom"`
- `theme` – `"auto" | "light" | "dark"`
- `refreshLabel`, `canvasLabel` – for accessibility
- `distortion` – `"none" | "lines" | "dots" | "both"`
- `noiseDots`, `noiseLines` – noise configuration
- `audioEnabled` – optional audio for screen readers

### New Events

- `@refresh` – when captcha is regenerated
- `@ready` – when canvas is ready
- `@error` – on canvas/context failure

### useCaptcha Composable

For custom UIs, use the composable:

```js
import { useCaptcha } from 'vue-client-recaptcha';

const { code, generate, validate, reset } = useCaptcha({ count: 4 });
```

### CSS Variables

Override styles with CSS variables:

- `--vcr-bg` – background
- `--vcr-icon-color` – icon color
- `--vcr-padding` – padding
- `--vcr-radius` – border radius

## Checklist

- [ ] Install Vue 3.2+ as peer dependency
- [ ] Replace `:value` + `@input` with `v-model` (optional)
- [ ] Remove `isDirty` if used (was inert)
- [ ] Test `width` behavior if you use a function
- [ ] Consider using new props: `theme`, `charsPreset`, etc.
