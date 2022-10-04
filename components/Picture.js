import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Picture = ({ picture, title, thought, date, slug }) => {
  const router = useRouter();
  // Query parameters are available on page load inside asPath
  const query =
    router.asPath.match(/modal=([^;]+)/) &&
    router.asPath.match(/modal=([^;]+)/)[1];
  const [isOpen, setIsOpen] = useState(query);

  return (
    <>
      {/* Link that triggers modal and shows picture */}
      <Link href={"/?modal=" + slug} scroll={false}>
        <a
          onClick={() => {
            setIsOpen(slug);
          }}
          className="hover:opacity-90 transition relative flex flex-col overflow-hidden focus:outline-none focus-visible:ring focus-visible:ring-stone-400"
        >
          <img
            src={picture.asset.url}
            className="object-cover block"
            alt={picture.alt}
          />
          <p className="mt-1 font-italic text-xl absolute bottom-0 bg-white w-full px-2 py-1 text-stone-500">
            {title}
          </p>
        </a>
      </Link>
      <Transition show={isOpen === slug}>
        <Dialog
          key={slug}
          onClose={() => {
            setIsOpen(null);
            router.push("/", undefined, { scroll: false });
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-stone-800/50" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4 text-stone-600 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-xl rounded bg-stone-100 p-6 max-h-[90vh] overflow-y-auto">
                <img
                  src={picture.asset.url}
                  alt={picture.alt}
                  className="block aspect-square max-h-[60vh] w-full object-cover"
                />
                <Dialog.Title className="font-italic text-2xl mt-3">
                  {title}
                </Dialog.Title>

                <p className="font-light text-sm">{date}</p>

                <p className="my-2 font-light">{thought}</p>

                <button
                  className="font-light block text-sm text-stone-400 hover:text-stone-600 focus:outline-none ring-offset-1 focus:ring focus:ring-stone-300 rounded"
                  onClick={() => {
                    setIsOpen(null);
                    router.push("/", undefined, { scroll: false });
                  }}
                >
                  Close
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Picture;
