// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock swiper CSS globally as a virtual module to prevent Jest resolver errors
jest.mock("swiper/css", () => ({}), { virtual: true });

// Mock Next.js Image globally to prevent DOM prop warnings
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, quality, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || "mock image"} data-fill={fill ? "true" : undefined} />;
  },
}));
