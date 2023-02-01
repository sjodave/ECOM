import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdCancel } from "react-icons/md";
export default function DisplayFeedback({ isOpen, setIsOpen, msg }) {
  console.log(msg.includes("Added"));
  useEffect(() => {
    const id = setTimeout(() => {
      closeModal();
    }, 2000);
    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
      onClick={(e) => {
        e.stopPropagation(); // to stop event bubbling when portal is open
      }}
    >
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 w-screen bg-black bg-opacity-25"
            onClick={(e) => {
              closeModal();
            }}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="float-right flex p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`flex w-full max-w-md transform items-center justify-between gap-3 overflow-hidden rounded-2xl ${
                  msg.includes("Removed") ? "bg-red-300/50" : "bg-green-300/50 "
                } p-6 text-left align-middle shadow-xl transition-all`} //Add more sutaible condition
              >
                <Dialog.Title
                  as="h3"
                  className="text-sm font-medium text-gray-900"
                >
                  {msg}
                </Dialog.Title>
                <MdCancel className="text-2xl " onClick={closeModal} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
