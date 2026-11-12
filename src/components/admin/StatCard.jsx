export default function StatCard({ label, value }) {
  return (
    <div className="border border-line p-6">
      <p className="text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-2">{label}</p>
      <p className="font-display text-3xl">{value}</p>
    </div>
  );
}
