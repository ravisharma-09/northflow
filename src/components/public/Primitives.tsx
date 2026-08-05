import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

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
  return <div className={cx("public-container", className)}>{children}</div>;
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
    <section id={id} className={cx("public-section", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cx("public-eyebrow", className)}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("max-w-[760px]", className)}>
      <Eyebrow className="text-muted">{eyebrow}</Eyebrow>
      <h2 className="mt-7 text-[clamp(2.8rem,5.2vw,4.8rem)] font-black leading-[0.96] text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cx(
        "rounded-[8px] border border-border bg-surface shadow-premium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "accent" | "light";
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
        "public-focus group inline-flex min-h-12 items-center justify-center gap-2 rounded-[7px] px-5 py-3 text-sm font-extrabold transition duration-300 hover:-translate-y-0.5",
        variant === "primary" &&
          "border border-foreground bg-foreground text-background hover:bg-brand hover:border-brand",
        variant === "secondary" &&
          "border border-border bg-transparent text-foreground hover:border-foreground",
        variant === "accent" &&
          "border border-brand bg-brand text-foreground hover:bg-brand-hover hover:border-brand-hover",
        variant === "light" &&
          "border border-[rgba(245,238,229,0.36)] bg-transparent text-[#f5eee5] hover:bg-[#f5eee5] hover:text-[#11100d]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
