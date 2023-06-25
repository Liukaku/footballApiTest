"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const onFixtures = pathArr[pathArr.length - 1] === "fixtures";
  const [redirecting, updateRedirecting] = useState<boolean>(false);
  // const [url, updateUrl] = useState<string>(router.pathname);
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleRedirect = () => {
    updateRedirecting(true);
    if (onFixtures) {
      router.refresh();
    } else {
      router.push("/fixtures");
    }
  };

  const errArr = [5, 0, 0];

  return (
    <div className="h-full min-h-[100vh] backdrop-blur-md pt-5">
      <div className="md:w-1/3 w-11/12 md:mt-20 mx-auto bg-red-400/30 rounded-md border border-white/30 text-center shadow-md shadow-black/50">
        <div className="err">
          <svg
            id="render_error"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 809 375"
          >
            <motion.path
              initial={{ pathLength: 0, pathSpacing: 0.1 }}
              animate={{ pathLength: 0.2, pathSpacing: 0.1 }}
              transition={{
                // type: "spring",
                // bounce: 0.8,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5,
              }}
              d="M218 49H82l-14 92a192 192 0 0 1 29-2c27 0 55 6 77 19 28 16 51 47 51 92 0 70-55 122-133 122-39 0-72-11-89-22l12-37c15 9 44 20 77 20 45 0 84-30 84-78 0-46-31-79-103-79-20 0-36 2-49 4L47 9h171zM524 183c0 122-45 189-124 189-70 0-117-65-118-184C282 68 333 3 406 3c75 0 118 67 118 180zm-194 6c0 93 29 146 73 146 49 0 73-58 73-149 0-88-23-146-73-146-42 0-73 51-73 149zM806 183c0 122-45 189-124 189-70 0-117-65-118-184C564 68 615 3 688 3c75 0 118 67 118 180zm-194 6c0 93 29 146 73 146 49 0 73-58 73-149 0-88-23-146-73-146-42 0-73 51-73 149z"
            />
          </svg>
          <h2 className="my-5 font-black text-xl">
            Ooops - An Error Has Occurred
          </h2>
        </div>
      </div>
      <AnimatePresence>
        {!redirecting && (
          <motion.button
            exit={{
              y: 100,
              backdropFilter: "blur(0px)",
              filter: "blur(8px)",
              zIndex: -1,
            }}
            animate={{
              filter: "blur(0px)",
              y: 0,
              backdropFilter: "blur(4px)",
              zIndex: 0,
            }}
            transition={{
              duration: 0.3,
              delay: 0.3,
            }}
            type="button"
            onClick={handleRedirect}
            className="bg-[#77ACA2]/50 border-2 block md:w-2/12 w-10/12 text-center mt-5 border-white/30  hover:bg-yellow-200/10 active:bg-yellow-900/10 duration-300 transition rounded-md py-1 px-2 mx-auto"
          >
            {!onFixtures ? "Back to fixtures" : "Try again"}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
