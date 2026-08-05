import type { AnchorHTMLAttributes, ReactNode } from "react";

type ClassValue = string | false | null | undefined;

export function cx(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx("premium-container", className)}>{children}</div>;
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cx("premium-section", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="premium-eyebrow">{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-normal text-foreground md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-[8px] border border-border bg-surface/80 shadow-premium",
        className
      )}
    >
      {children}
    </div>
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "dark";
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cx(
        "premium-focus inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] px-5 py-3 text-sm font-extrabold transition-colors duration-200",
        variant === "primary" &&
          "bg-foreground text-background hover:bg-brand-hover",
        variant === "secondary" &&
          "border border-border bg-surface text-foreground hover:border-foreground",
        variant === "dark" &&
          "border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
