/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUser from "@/zustand/user";
import obj from "../../../themes.json";

export default function Theme() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const lan = useUser((state) => state.language);
  const router = useRouter();

  const [theme, setTheme] = useState("");

  useEffect(() => {
    let th = router.asPath.split("themes")[1];
    th = th.slice(1, th.length);
    setTheme(obj[th]);
  }, [setTheme, router]);

  return (
    <div className="bg-[url('/background1.webp')] bg-cover w-[100%] h-auto z-10 flex flex-col gap-6 pt-16 pb-24">
      <h1 className="font-inter font-bold text-6xl text-[#FDC656] text-center lg:max-w-[60%] mx-auto">
        {theme != "" ? theme?.name[lan] : "Загрузка..."}
      </h1>
      <div className="flex flex-col gap-8 mt-6">
        {theme != ""
          ? theme?.description[lan].map((item, index) => (
              <p
                key={index}
                className="font-inter font-medium text-white text-xl w-[95%] lg:w-[80%] self-center"
              >
                {item}
              </p>
            ))
          : ""}
      </div>
    </div>
  );
}
