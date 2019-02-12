import { shallowMount } from "@vue/test-utils";
import App from "../src/components/App.vue";

const wrapper = shallowMount(App);

describe("App", () => {
  it("renders a h1 tag", () => {
    expect(wrapper.contains("h1")).to.be.true;
  });
});
