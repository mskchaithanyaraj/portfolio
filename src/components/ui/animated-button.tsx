import { forwardRef, type CSSProperties, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

import { cn } from "@/lib/utils";

type ButtonTone = "neutral" | "fire" | "warning" | "info";
type ButtonSize = "sm" | "md" | "lg";

type ToneStyles = {
  background: string;
  border: string;
  shadow: string;
  glow: string;
  text: string;
};

const toneStyles: Record<ButtonTone, ToneStyles> = {
  neutral: {
    background: "linear-gradient(135deg, #101010 0%, #303030 100%)",
    border: "rgba(255, 255, 255, 0.28)",
    shadow: "0 18px 40px rgba(0, 0, 0, 0.16)",
    glow: "linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.02))",
    text: "#ffffff",
  },
  fire: {
    background: "linear-gradient(135deg, #8a1f11 0%, #ff6a1a 100%)",
    border: "rgba(255, 197, 153, 0.45)",
    shadow: "0 18px 40px rgba(255, 106, 26, 0.22)",
    glow: "linear-gradient(135deg, rgba(255, 193, 109, 0.35), rgba(255, 107, 30, 0.05))",
    text: "#ffffff",
  },
  warning: {
    background: "linear-gradient(135deg, #8c5208 0%, #f59e0b 100%)",
    border: "rgba(255, 224, 173, 0.55)",
    shadow: "0 18px 40px rgba(245, 158, 11, 0.2)",
    glow: "linear-gradient(135deg, rgba(255, 236, 166, 0.34), rgba(245, 158, 11, 0.06))",
    text: "#ffffff",
  },
  info: {
    background: "linear-gradient(135deg, #0f3c8c 0%, #2563eb 100%)",
    border: "rgba(174, 203, 255, 0.55)",
    shadow: "0 18px 40px rgba(37, 99, 235, 0.22)",
    glow: "linear-gradient(135deg, rgba(191, 219, 254, 0.34), rgba(37, 99, 235, 0.06))",
    text: "#ffffff",
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-[2.8rem] min-w-[11rem] px-5 text-sm",
  md: "min-h-[3.75rem] min-w-[11.5rem] px-7 text-sm md:text-[0.95rem]",
  lg: "min-h-[4.25rem] min-w-[13rem] px-8 text-base",
};

type SharedProps = {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  tone?: ButtonTone;
  style?: CSSProperties;
};

type RouterButtonProps = SharedProps &
  Omit<LinkProps, "className" | "children"> & {
    to: LinkProps["to"];
    href?: never;
  };

type AnchorButtonProps = SharedProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children"
  > & {
    href: string;
    to?: never;
  };

type AnimatedButtonProps = RouterButtonProps | AnchorButtonProps;

const AnimatedButton = forwardRef<HTMLAnchorElement, AnimatedButtonProps>(
  (
    { children, className, size = "md", tone = "neutral", style, ...props },
    ref,
  ) => {
    const toneStyle = toneStyles[tone];
    const sharedClassName = cn(
      "animated-route-button group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border font-medium tracking-tight transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-0/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
      sizeStyles[size],
      className,
    );

    const sharedStyle: CSSProperties = {
      background: toneStyle.background,
      borderColor: toneStyle.border,
      boxShadow: toneStyle.shadow,
      color: toneStyle.text,
      ...style,
    };

    const content = (
      <>
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: toneStyle.glow }}
        />
        <svg
          aria-hidden="true"
          className="animated-route-button__svg"
          viewBox="0 0 180 60"
          preserveAspectRatio="none"
        >
          <polyline
            points="179,1 179,59 1,59 1,1 179,1"
            className="animated-route-button__border animated-route-button__border--static"
            style={{ stroke: toneStyle.border }}
          />
          <polyline
            points="179,1 179,59 1,59 1,1 179,1"
            className="animated-route-button__border animated-route-button__border--animated"
            style={{ stroke: toneStyle.text }}
          />
        </svg>
        <span className="animated-route-button__label relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </>
    );

    if ("href" in props) {
      return (
        <a ref={ref} className={sharedClassName} style={sharedStyle} {...props}>
          {content}
        </a>
      );
    }

    return (
      <Link
        ref={ref}
        className={sharedClassName}
        style={sharedStyle}
        {...props}
      >
        {content}
      </Link>
    );
  },
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
