export default function Layout({ children }) {
  return (
    <div className="bg-transparent container">
      <main>{children}</main>
    </div>
  );
}
