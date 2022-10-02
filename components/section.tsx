export default function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <section className="mb-20">
      <h2 className="mb-2 mt-6 text-2xl font-light">{title}</h2>
      <div className="space-y-4 sm:ml-4">{children}</div>
    </section>
  );
}
