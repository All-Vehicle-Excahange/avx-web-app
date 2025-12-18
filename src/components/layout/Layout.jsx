export default function Layout({ children }) {
  return (
    <div className="px-6 md:px-6 lg:px-8 py-10 max-w-screen-2xl mx-auto bg-secondary">
      <main>{children}</main>
    </div>
  );
}
