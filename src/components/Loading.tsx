import { ReactElement, useEffect, useRef } from "react";

export default function Loading(){

    const modalRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        // Man skal have ".showModal()", før at dialog kan virke
        // document.querySelector<HTMLDialogElement>("dialog").showModal();
        modalRef.current?.showModal()
      }, []);
    
      return (
        // Dialog - Har allerede en set-setting hvor boksen vil være i midten af hjemmesiden
        <dialog ref={modalRef}>
          <div className="loader" id="loader-2">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </dialog>
      )
}

    