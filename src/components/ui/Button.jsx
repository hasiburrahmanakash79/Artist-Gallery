import clsx from 'clsx';

const VARIANTS = {
  primary: 'bg-ink text-paper hover:bg-ink-soft border border-ink',
  outline: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper',
  ghost: 'bg-transparent text-ink border border-transparent hover:border-line',
  brass: 'bg-brass text-paper border border-brass hover:bg-ink hover:border-ink',
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  className,
  children,
  disabled,
  ...props
}) {
  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[13px] tracking-wide uppercase font-medium transition-colors duration-300',
        disabled
          ? 'bg-stone text-ink-soft/50 border border-line cursor-not-allowed'
          : VARIANTS[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
}
