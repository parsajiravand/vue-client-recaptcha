import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCaptcha } from "../useCaptcha";

describe("useCaptcha", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("generates code of correct length", () => {
    const { generate } = useCaptcha({ count: 5 });
    const code = generate();
    expect(code).toHaveLength(5);
  });

  it("generates code with numeric preset", () => {
    const { generate } = useCaptcha({ charsPreset: "numeric", count: 4 });
    const code = generate();
    expect(code).toHaveLength(4);
    expect(code).toMatch(/^[0-9]+$/);
  });

  it("generates code with letters preset", () => {
    const { generate } = useCaptcha({ charsPreset: "letters", count: 4 });
    const code = generate();
    expect(code).toHaveLength(4);
    expect(code).toMatch(/^[a-zA-Z]+$/);
  });

  it("generates code with custom chars", () => {
    const { generate } = useCaptcha({
      charsPreset: "custom",
      chars: "AB",
      count: 4,
    });
    const code = generate();
    expect(code).toHaveLength(4);
    expect(code).toMatch(/^[AB]+$/);
  });

  it("validate returns true when input matches code", () => {
    const { generate, validate } = useCaptcha({ count: 3 });
    const code = generate();
    expect(validate(code)).toBe(true);
  });

  it("validate returns false when input does not match", () => {
    const { generate, validate } = useCaptcha({ count: 3 });
    generate();
    expect(validate("wrong")).toBe(false);
    expect(validate("")).toBe(false);
  });

  it("reset generates new code", () => {
    const { code, reset } = useCaptcha({ count: 4 });
    const first = reset();
    const second = reset();
    expect(first).toHaveLength(4);
    expect(second).toHaveLength(4);
    expect(code.value).toBe(second);
  });

  it("accepts getter for reactive options", () => {
    let count = 5;
    const { generate } = useCaptcha(() => ({ count }));
    expect(generate()).toHaveLength(5);
    count = 3;
    expect(generate()).toHaveLength(3);
  });
});
