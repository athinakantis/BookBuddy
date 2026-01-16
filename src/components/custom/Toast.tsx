import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { Toast as ToastType } from "@/types/ui";
import Button from "./Button";
import { useUI } from "@/context/useUI";

type ToastProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  toast: ToastType;
};

const variants = {
  success: "bg-success-bg text-success-fg border-success-accent",
  error: "bg-destructive-bg text-destructive-fg border-destructive-accent",
  warning: "bg-warning-bg text-warning-fg border-warning-accent",
  info: "bg-info-bg text-info-fg border-info-accent",
};

const progressBarVariants = {
  success: "bg-success-bg",
  error: "bg-destructive-bg",
  warning: "bg-warning-bg",
  info: "bg-info-bg",
};

export default function Toast(props: ToastProps) {
  const { className, children, toast, ...rest } = props;
  const { closeToast } = useUI();
  const {
    type,
    content,
    timeout,
    onConfirm,
  } = toast || ({} as ToastType);
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    if (!content) return;
    if (content.confirm) return; // don't auto-close confirmation toasts

    const ms = typeof timeout === "number" ? timeout : 5000;

    // start animation on next paint
    const start = requestAnimationFrame(() => {
      setWidth("100%");
    });

    const t = setTimeout(closeToast, ms);

    return () => {
      cancelAnimationFrame(start);
      clearTimeout(t);
    };
  }, [content, timeout, closeToast]);

  if (!content) return null;

  const confirm = () => {
    if (!onConfirm) return;
    onConfirm();
    closeToast();
  }

  const duration = typeof timeout === "number" ? timeout : 5000;

  return (
    <div
      className={cn(
        "toast",
        "absolute top-5 right-5 border rounded-md p-4 flex gap-4 shadow-md min-w-60 z-100 max-w-80",
        variants[type || "info"],
        className
      )}
      {...rest}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{content.title}</p>
          <p>{content.message}</p>
        </div>

        {content?.confirm && (
          <div className="flex gap-2 self-end">
            <Button onClick={closeToast}>No</Button>
            <Button variant="secondary" onClick={confirm}>Yes</Button>
          </div>
        )}

        {!content?.confirm && <Button
          variant="icon"
          onClick={closeToast}
          className="absolute top-3 right-3 z-100 p-1 hover:cursor rounded-md border-none"
        >
          <X size={20} />
        </Button>}
      </div>

      <div
        id="progressbar"
        className={cn("absolute left-0 bottom-0 h-1 rounded-b-md bg-accent", progressBarVariants[type || "info"])}
        style={{
          width,
          transition: `width ${duration}ms linear`,
        }}
      />
    </div>
  );
}
