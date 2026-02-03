import { toast } from "sonner";
import Button from "../custom/Button";


type ToastConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
};

/**
 * 
 * @param param0 
 */
export const toastConfirm = ({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ToastConfirmOptions) => {
  toast.custom((t) => (
    <div onMouseDown={(e) => e.stopPropagation()} data-cy="toast-confirm-root">
      <div
        className="toast-confirm-card w-full md:w-[360px]"
        data-cy="toast-confirm-card"
      >
        <div>
          <p
            className="text-lg"
            style={{ zIndex: 100, pointerEvents: "auto" }}
            data-cy="toast-confirm-title"
          >
            {title}
          </p>
        </div>
        <div
          className="flex flex-col gap-2"
          data-cy="toast-confirm-content"
        >
          <p
            className="text-sm text-muted-foreground"
            data-cy="toast-confirm-description"
          >
            {description}
          </p>
          <div
            className="flex justify-between gap-2 mt-2"
            data-cy="toast-confirm-actions"
          >
            <Button
              variant="info"
              data-cy="toast-cancel-btn"
              onClick={() => {
                toast.dismiss(t);
                onCancel?.();
              }}
            >
              {cancelText}
            </Button>
            <Button
              variant="error"
              data-cy="toast-confirm-btn"
              onClick={async () => {
                toast.dismiss(t);
                try {
                  await onConfirm();
                } catch {
                  toast.error("Action failed.");
                }
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  ));
};