/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { firestore } from "../../../firebase/clientApp";
import { getDoc, doc } from "firebase/firestore";
import useUser from "@/zustand/user";

const afisha = [
  {
    rus: "Сегодня в Истории",
    kaz: "Бүгін тарихта",
    eng: "Today in History",
    tur: "Bugün Tarihte",
  },
  {
    rus: "Поздравления с Днем Рождения",
    kaz: "Туған күнмен құттықтаймыз",
    eng: "Happy Birthday Wishes",
    tur: "Doğum Günü Tebrikleri",
  },
  {
    rus: "Поздравления с Юбилеем",
    kaz: "Юбилеймен құттықтаймыз",
    eng: "Congratulations on the Anniversary",
    tur: "Yıl Dönümü Tebrikleri",
  },
  {
    rus: "Информация для Переводчиков",
    kaz: "Аудармашыларға арналған ақпарат",
    eng: "Information for Translators",
    tur: "Çevirmenler İçin Bilgi",
  },
];

export default function Afisha() {
  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const lan = useUser((state) => state.language);

  const [maximum, setMaximum] = useState(3);
  const [articles, setArticles] = useState([]);

  const load = async () => {
    const res = await getDoc(doc(firestore, "afisha", "today"));
    const today = res.data();

    const res1 = await getDoc(doc(firestore, "afisha", "birthday"));
    const birthday = res1.data();

    const res2 = await getDoc(doc(firestore, "afisha", "congrats"));
    const congrats = res2.data();

    const res3 = await getDoc(doc(firestore, "afisha", "translators"));
    const translators = res3.data();

    setArticles([today.data, birthday.data, congrats.data, translators.data]);
  };

  return (
    <div className="w-[100%] min-h-[80vh] mt-3 bg-[#5C5C5C] lg:py-14 py-16 lg:px-14 flex flex-col lg:gap-20 gap-5">
      <h2 className="font-inter font-extrabold lg:text-5xl text-3xl text-[#FDC656] text-center">
        {
          {
            rus: "Все Наши Статьи на Тему Афиша:",
            kaz: "Афиша Тақырыбындағы Біздің Барлық Мақалаларымыз:",
            eng: "All Our Articles on the Topic Poster:",
            tur: "Afiş Konusundaki Tüm Makalelerimiz:",
          }[lan]
        }
      </h2>
      {articles.map((item, index) => (
        <>
          <h2 className="font-inter font-extrabold lg:text-3xl text-xl text-white text-center underline underline-offset-4">
            {afisha[index][lan]}
          </h2>
          <div className="flex flex-row flex-wrap gap-10 justify-evenly">
            {item.length > 0
              ? item.slice(0, maximum).map((item1, id) => (
                  <div
                    key={id}
                    className="flex flex-col gap-3 w-[90%] mx-auto lg:w-[28%] lg:mx-0"
                  >
                    <div className="flex flex-col">
                      <img
                        src={item1.image}
                        alt="image"
                        className="w-full h-[30vh] object-cover rounded-xl ring-2 ring-white"
                        onClick={() => handleChange(item1.header[lan])}
                      />
                    </div>
                    <Link
                      href={`/afisha/${item.indexOf(item1)}?theme=${
                        item1.theme
                      }`}
                    >
                      <h2 className="font-inter font-bold text-2xl text-[#FDC656] underline underline-offset-4">
                        {item1.header[lan]}
                      </h2>
                    </Link>
                    <p className="font-inter font-semibold text-white text-lg">
                      {item1.body[lan][0].length >= 90
                        ? item1.body[lan][0].slice(0, 87) + "..."
                        : item1.body[lan][0]}
                    </p>
                  </div>
                ))
              : ""}
          </div>
          <motion.button
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.2, type: "spring" },
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2, type: "spring" },
            }}
            className="bg-black px-6 py-4 lg:w-[40%] w-[90%] mx-auto rounded-full font-inter font-medium text-xl text-white ring-2 ring-white"
            onClick={() => {
              if (item.length - maximum > 3) {
                setMaximum(maximum + 3);
              } else {
                setMaximum(item.length);
              }
            }}
          >
            Загрузить еще
          </motion.button>
        </>
      ))}
    </div>
  );
}
