export default function CredentialList({ title, items }) {
  return (
    <div>
      <h3 className="font-display text-2xl mb-6">{title}</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.title} className="flex gap-5 border-b border-line pb-4">
            <span className="text-brass font-medium w-14 shrink-0">{item.year}</span>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-ink-soft">{item.place}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
