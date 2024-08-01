/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import { useRouter } from "next/router";
import useUser from "@/zustand/user";
import { motion } from "framer-motion";
import Link from "next/link";

const afisha = {
  today: {
    rus: "Сегодня в Истории",
    kaz: "Бүгін тарихта",
    eng: "Today in History",
    tur: "Bugün Tarihte",
  },
  birthday: {
    rus: "Поздравления с Днем Рождения",
    kaz: "Туған күнмен құттықтаймыз",
    eng: "Happy Birthday Wishes",
    tur: "Doğum Günü Tebrikleri",
  },
  congrats: {
    rus: "Поздравления с Юбилеем",
    kaz: "Юбилеймен құттықтаймыз",
    eng: "Congratulations on the Anniversary",
    tur: "Yıl Dönümü Tebrikleri",
  },
  translators: {
    rus: "Информация для Переводчиков",
    kaz: "Аудармашыларға арналған ақпарат",
    eng: "Information for Translators",
    tur: "Çevirmenler İçin Bilgi",
  },
};

export default function Details() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const router = useRouter();
  const lan = useUser((state) => state.language);

  const [maximum, setMaximum] = useState(3);

  useEffect(() => {
    const load = async () => {
      const theme =
        router.asPath.split("?")[1] != undefined
          ? router.asPath.split("?")[1].split("=")[1]
          : router.asPath.split("/")[2];

      console.log(theme);

      try {
        const res = await getDoc(doc(firestore, "afisha", String(theme)));
        const articles = res.data();

        router.asPath.split("?")[1] != undefined
          ? setArticle(articles.data[router.asPath.split("?")[0].split("/")[2]])
          : setArticle([...articles.data]);
      } catch (e) {
        console.log(e.message);
      }
    };

    load();
  }, [router]);

  const [article, setArticle] = useState({
    image: "",
    header: { rus: "", kaz: "", eng: "", tur: "" },
    body: { rus: [""], kaz: [""], eng: [""], tur: [""] },
    date: "",
    theme: "",
  });

  return router.asPath.split("?")[1] != undefined ? (
    <div className="w-[100%] min-h-[80vh] mt-3 bg-[#5C5C5C] lg:py-20 py-16 px-3 lg:px-14 flex flex-col lg:gap-10 gap-5">
      <img
        src={article.image}
        alt="image"
        className="w-[95%] max-h-[70vh] mx-auto object-cover rounded-lg ring-2 ring-white"
      />
      <div className="ml-[2.5%] flex flex-col gap-7">
        <div className="flex flex-row gap-9">
          <p className="font-inter font-medium text-white text-xl text-start">
            {"Тема: " + afisha[router.asPath.split("?")[1].split("=")[1]][lan]}
          </p>
        </div>
        <h1 className="font-inter font-extrabold lg:text-4xl text-3xl text-[#FDC656] text-start underline underline-offset-8">
          {article.header[lan]}
        </h1>
      </div>
      <div className="flex flex-col gap-8">
        {article?.body[lan]?.map((item, index) => (
          <p
            key={index}
            className="font-inter font-medium text-white text-xl max-w-[95%] ml-[2.5%]"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-[100%] min-h-[80vh] mt-3 bg-[#5C5C5C] lg:py-20 py-16 px-3 lg:px-14 flex flex-col lg:gap-10 gap-5">
      <h2 className="font-inter font-extrabold lg:text-3xl text-xl text-white text-center underline underline-offset-4">
        {article.header[lan] != ""
          ? afisha[router.asPath.split("/")[2]][lan]
          : ""}
      </h2>
      <div className="flex flex-row flex-wrap gap-10 justify-evenly">
        {article.length > 0
          ? article.slice(0, maximum).map((item1, id) => (
              <div
                key={id}
                className="flex flex-col gap-3 w-[90%] mx-auto lg:w-[28%] lg:mx-0"
              >
                <div className="flex flex-col">
                  <img
                    src={item1.image}
                    alt="image"
                    className="w-full h-[30vh] object-cover rounded-xl ring-2 ring-white"
                    onClick={() => handleChange(item1.header)}
                  />
                </div>
                <p className="font-inter font-semibold text-white text-md">
                  {item1.date}
                </p>
                <Link
                  href={`/afisha/${article.indexOf(item1)}?theme=${
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
          if (article.length - maximum > 3) {
            setMaximum(maximum + 3);
          } else {
            setMaximum(article.length);
          }
        }}
      >
        Загрузить еще
      </motion.button>
    </div>
  );
}
