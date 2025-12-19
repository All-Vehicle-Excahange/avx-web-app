export default function Layout({ children }) {
  return (
    <div className="bg-secondary container">
      <main>{children}</main>
    </div>
  );
}
