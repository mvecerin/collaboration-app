import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";

export const useModal = () => {
  const [modal, setModal] = useState<Modal | null>(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    setModal(new Modal(dialogRef.current!));
  }, []);

  return [dialogRef, modal] as const;
};
