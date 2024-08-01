/* eslint-disable @next/next/no-img-element */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import useUser from "@/zustand/user";
import Link from "next/link";

export default function Footer() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const lan = useUser((state) => state.language);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : ""}
      transition={{
        duration: 0.8,
        type: "spring",
        staggerChildren: 0.2,
        delayChildren: 0.6,
      }}
      className="w-[100%] min-h-[40vh] lg:py-16 py-10 mt-3 flex flex-col lg:flex-row justify-evenly"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
        className="flex flex-col gap-10 lg:w-[22%] w-[90%] mx-auto lg:mx-0 mt-10"
      >
        <h2 className="font-inter font-extrabold text-4xl text-[#FDC656]">
          Qunanbai.kz
        </h2>
        <p className="font-inter font-medium text-white text-md text-start relative bottom-5">
          {
            {
              rus: "Общественный фонд «Союз переводчиков Алаш» имени Кунанбай кажы - инициатива активных граждан, стремящихся превратить Абайскую область в «Духовную столицу» в сфере перевода создан 27 декабря 2023 года.",
              kaz: "Кунанбай қажы атындағы «Алаш аудармашылар одағы» қоғамдық қоры - аударма саласында Абай облысын «Духани астанаға» айналдыруды мақсат еткен белсенді азаматтардың бастамасы. Қор 2023 жылдың 27 желтоқсанында құрылды.",
              eng: "The Public Fund 'Alaş Translators Union' named after Kunanbai Kazhy is an initiative of active citizens aiming to turn the Abai Region into a 'Spiritual Capital' in the field of translation. It was established on December 27, 2023.",
              tur: "Kunanbai Kazhy adına ‘Alaş Çevirmenler Birliği’ Kamu Vakfı, Abai Bölgesi'ni çeviri alanında 'Ruhsal Başkent' haline getirmeyi hedefleyen aktif vatandaşların bir girişimidir. 27 Aralık 2023 tarihinde kurulmuştur.",
            }[lan]
          }
        </p>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
        className="flex flex-col gap-2"
      >
        <h2 className="font-inter font-semibold text-[#FDC656] text-xl text-center lg:mt-10 mt-6">
          {
            {
              rus: "Навигация",
              kaz: "Навигация",
              eng: "Navigation",
              tur: "Navigasyon",
            }[lan]
          }
        </h2>
        {[
          {
            name: {
              rus: "О Нас",
              kaz: "Біз туралы",
              eng: "About Us",
              tur: "Hakkımızda",
            },
            link: "/#about",
          },
          {
            name: {
              rus: "Авторские Курсы",
              kaz: "Авторлық курстар",
              eng: "Author's Courses",
              tur: "Yazarın Kursları",
            },
            link: "/#themes",
          },
          {
            name: {
              rus: "Сегодня для Вас:",
              kaz: "Бүгін сіздер үшін:",
              eng: "Today for You:",
              tur: "Bugün Sizin İçin:",
            },
            link: "/#info",
          },
        ].map((item, index) => (
          <Link key={index} href={item.link}>
            <p className="font-inter font-medium text-white text-lg text-center">
              {item.name[lan]}
            </p>
          </Link>
        ))}
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
        className="flex flex-col gap-2"
      >
        <h2 className="font-inter font-semibold text-[#FDC656] text-xl text-center lg:mt-10 mt-6">
          {
            {
              rus: "Наша Поддержка",
              kaz: "Біздің Қолдау",
              eng: "Our Support",
              tur: "Bizim Desteğimiz",
            }[lan]
          }
        </h2>
        {[
          {
            name: {
              rus: "Наши Волонтеры",
              kaz: "Біздің Еріктілер",
              eng: "Our Volunteers",
              tur: "Gönüllülerimiz",
            },
            link: "/volunteers",
          },
        ].map((item, index) => (
          <Link key={index} href={item.link}>
            <p className="font-inter font-medium text-white text-lg text-center underline underline-offset-4">
              {item.name[lan]}
            </p>
          </Link>
        ))}
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
        className="flex flex-col gap-2"
      >
        <h2 className="font-inter font-semibold text-[#FDC656] text-xl text-center lg:mt-10 mt-6">
          {
            {
              rus: "Издатели",
              kaz: "Баспагерлер",
              eng: "Publishers",
              tur: "Yayıncılar",
            }[lan]
          }
        </h2>
        {[
          {
            header: "Әбіл-Серік Әбілқасымұлы Әліакбар",
            body: "+7 702 671 48 41",
          },
          { header: "Омарғалиев Ерік Қайратбекұлы", body: "+7 747 112 80 26" },
          { header: "Садақбаев Асылхан Сәкенұлы", body: "+7 777 422 40 52" },
        ].map((item, index) => (
          <>
            <h2
              key={index}
              className="font-inter font-medium text-white text-lg text-center underline underline-offset-4"
            >
              {item.header}
            </h2>
            <p
              key={index}
              className="font-inter font-medium text-white text-lg text-center"
            >
              {item.body}
            </p>
          </>
        ))}
      </motion.div>
    </motion.div>
  );
}
