export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="sm:prose-md prose dark:prose-invert">
      {children}
    </article>
  );
}
