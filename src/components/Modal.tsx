import { DialogHTMLAttributes, PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, className, open, ...props }: PropsWithChildren<DialogHTMLAttributes<HTMLDialogElement>>) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])

  return (
    <>
      {createPortal(
        <dialog className={`w-full bg-transparent backdrop:backdrop-brightness-50 ${className}`} ref={dialogRef} {...props}>
          {children}
        </dialog>
        , document.body)}
    </>
  )
}

