import { useModal } from "../context/ModalProvider";

function Modal() {
  const { isOpen, component, canClose, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[900] bg-gray-700/75"
      onClick={() => (canClose ? closeModal() : null)}
    >
      <div className="centerXY absolute h-[80%] min-w-[60%] rounded border border-purple-200 bg-slate-200 shadow-xl">
        {component}
      </div>
    </div>
  );
}

export default Modal;
