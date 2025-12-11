import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="px-6 md:px-12 lg:px-10 py-10">
      <main>{children}</main>
    </div>
  );
}
