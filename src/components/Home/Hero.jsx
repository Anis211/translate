/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import useUser from "@/zustand/user";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const lan = useUser((state) => state.language);

  return (
    <div className="bg-[url('/background1.webp')] bg-cover w-[100%] h-auto lg:h-[100vh] z-10 flex flex-col gap-6 pt-[25vh] pb-16 lg:pb-0">
      <h1 className="font-inter font-bold text-6xl text-[#FDC656] text-center lg:max-w-[60%] mx-auto">
        {
          {
            rus: "Международный Союз Переводчиков Qunanbai.kz",
            kaz: "Халықаралық Аудармашылар Одағы Qunanbai.kz",
            eng: "International Union of Translators Qunanbai.kz",
            tur: "Uluslararası Çevirmenler Birliği Qunanbai.kz",
          }[lan]
        }
      </h1>
      <p className="font-inter font-medium text-2xl text-white text-center lg:max-w-[60%] mx-auto">
        {
          {
            rus: "Переводим как тесты и манги, так и видео и аниме",
            kaz: "Сынақтар мен мангадан бастап, видео мен анимеге дейін аударамыз",
            eng: "We translate both tests and manga, as well as videos and anime",
            tur: "Hem testleri ve mangaları, hem de videoları ve animeleri çeviriyoruz",
          }[lan]
        }
      </p>
      <motion.img
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        exit={{ y: 30 }}
        transition={{
          duration: 0.6,
          type: "spring",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        src="/triangle.png"
        alt="triangle"
        className="w-20 h-20 mx-auto"
      />
    </div>
  );
}
