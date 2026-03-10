import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VueClientRecaptcha from "../vue-client-recaptcha.vue";

describe("VueClientRecaptcha", () => {

  it("renders component", async () => {
    const wrapper = mount(VueClientRecaptcha);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".vue_client_recaptcha").exists()).toBe(true);
    expect(wrapper.find("canvas").exists()).toBe(true);
  });

  it("emits getCode on mount", async () => {
    const wrapper = mount(VueClientRecaptcha, { props: { count: 4 } });
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 50));
    expect(wrapper.emitted("getCode")).toBeTruthy();
    expect(wrapper.emitted("getCode")![0][0]).toHaveLength(4);
  });

  it("emits isValid when value matches", async () => {
    const wrapper = mount(VueClientRecaptcha);
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 50));
    const code = wrapper.emitted("getCode")![0][0] as string;
    await wrapper.setProps({ modelValue: code });
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("isValid")).toBeTruthy();
    const isValidCalls = wrapper.emitted("isValid")!;
    expect(isValidCalls[isValidCalls.length - 1][0]).toBe(true);
  });

  it("exposes resetCaptcha method", async () => {
    const wrapper = mount(VueClientRecaptcha);
    await wrapper.vm.$nextTick();
    expect(typeof (wrapper.vm as { resetCaptcha?: () => void }).resetCaptcha).toBe("function");
    ;(wrapper.vm as { resetCaptcha: () => void }).resetCaptcha();
    await wrapper.vm.$nextTick();
  });

  it("accepts count prop", async () => {
    const wrapper = mount(VueClientRecaptcha, { props: { count: 3 } });
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 50));
    expect(wrapper.emitted("getCode")![0][0]).toHaveLength(3);
  });

  it("passes refreshLabel for accessibility", async () => {
    const wrapper = mount(VueClientRecaptcha, {
      props: { refreshLabel: "Custom refresh" },
    });
    await wrapper.vm.$nextTick();
    const icon = wrapper.find(".vue_client_recaptcha_icon");
    expect(icon.exists()).toBe(true);
    expect(icon.attributes("aria-label")).toBe("Custom refresh");
  });

  it("hides refresh icon when hideRefreshIcon is true", async () => {
    const wrapper = mount(VueClientRecaptcha, { props: { hideRefreshIcon: true } });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".vue_client_recaptcha_icon").exists()).toBe(false);
  });
});
