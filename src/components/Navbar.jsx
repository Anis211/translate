/* eslint-disable @next/next/no-img-element */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import useUser from "@/zustand/user";
import Link from "next/link";

const langs = {
  Қазақша: "kaz",
  Русский: "rus",
  English: "eng",
  Türk: "tur",
};

const lang = {
  kaz: "Қазақша",
  rus: " Русский",
  eng: "English",
  tur: "Türk",
};

export default function Navbar() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const router = useRouter();

  const lan = useUser((state) => state.language);
  const changeLan = useUser((state) => state.changeLanguage);

  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);

  const [hiddenThemes, setHiddenThemes] = useState(true);
  const [hiddenProjects, setHiddenProjects] = useState(true);
  const [hiddenLanguages, setHiddenLanguages] = useState(true);
  const [hiddenCelebration, setHiddenCelebration] = useState(true);

  return (
    <div className="flex flex-row justify-between backdrop-blur-md py-12 px-20 z-50 bg-[#020202]">
      <h1 className="w-[20%] font-inter font-extrabold text-5xl text-[#FDC656]">
        Qunanbai.kz
      </h1>
      <div className="flex flex-row items-end w-[77%] mx-auto relative bottom-2">
        <Link href="/#about" className="w-[15%] flex justify-center">
          <h2 className="font-inter font-semibold text-2xl text-white flex flex-row gap-1 text-center mx-auto">
            {
              {
                rus: "О Нас",
                kaz: "Біз туралы",
                eng: "About Us",
                tur: "Hakkımızda",
              }[lan]
            }
          </h2>
        </Link>
        <Link
          href="/#projects"
          onMouseEnter={() => {
            setHovered4(true);
            setHiddenProjects(false);
          }}
          onMouseLeave={() => {
            setHovered4(false);
            setHiddenProjects(true);
          }}
          className="flex flex-row gap-1 justify-center w-[26%]"
        >
          <h2 className="font-inter font-semibold text-2xl text-white">
            {
              {
                rus: "Наши Проекты",
                kaz: "Біздің Жобаларымыз",
                eng: "Our Projects",
                tur: "Projelerimiz",
              }[lan]
            }
          </h2>
          <motion.img
            initial={{ rotate: 0 }}
            animate={hovered4 ? { rotate: 180 } : ""}
            transition={{ duration: 0.3, type: "spring" }}
            src="/down.png"
            alt="down"
            className="w-7 h-7 my-auto"
          />
        </Link>
        <Link
          href="/#themes"
          onMouseEnter={() => {
            setHovered1(true);
            setHiddenThemes(false);
          }}
          onMouseLeave={() => {
            setHovered1(false);
            setHiddenThemes(true);
          }}
          className="flex flex-row gap-1 justify-center w-[25%]"
        >
          <h2 className="font-inter font-semibold text-2xl text-white">
            {
              {
                rus: "Авторские Курсы",
                kaz: "Авторлық курстар",
                eng: "Author's Courses",
                tur: "Yazarın Kursları",
              }[lan]
            }
          </h2>
          <motion.img
            initial={{ rotate: 0 }}
            animate={hovered1 ? { rotate: 180 } : ""}
            transition={{ duration: 0.3, type: "spring" }}
            src="/down.png"
            alt="down"
            className="w-7 h-7 my-auto"
          />
        </Link>
        <Link
          href="/afisha"
          onMouseEnter={() => {
            setHovered3(true);
            setHiddenCelebration(false);
          }}
          onMouseLeave={() => {
            setHovered3(false);
            setHiddenCelebration(true);
          }}
          className="flex flex-row gap-1 justify-center w-[12.5%]"
        >
          <h2 className="font-inter font-semibold text-2xl text-white">
            {
              {
                rus: "Афиша",
                kaz: "Афиша",
                eng: "Poster",
                tur: "Afiş",
              }[lan]
            }
          </h2>
          <motion.img
            initial={{ rotate: 0 }}
            animate={hovered3 ? { rotate: 180 } : ""}
            transition={{ duration: 0.3, type: "spring" }}
            src="/down.png"
            alt="down"
            className="w-7 h-7 my-auto"
          />
        </Link>
        <Link
          href="/themes"
          className="flex flex-row gap-1 justify-center w-[12.5%]"
          onMouseEnter={() => {
            setHovered2(true);
            setHiddenLanguages(false);
          }}
          onMouseLeave={() => {
            setHovered2(false);
            setHiddenLanguages(true);
          }}
        >
          <h2 className="font-inter font-semibold text-2xl text-white">
            {lang[lan]}
          </h2>
          <motion.img
            initial={{ rotate: 0 }}
            animate={hovered2 ? { rotate: 180 } : ""}
            transition={{ duration: 0.3, type: "spring" }}
            src="/down.png"
            alt="down"
            className="w-7 h-7 my-auto"
          />
        </Link>
        {user.email == "admin@mail.ru" || user.name == "incognito" ? (
          <div
            className={`my-auto ${
              !router.pathname.includes("account")
                ? "p-1"
                : "px-1 py-1 mt-5 ml-4"
            } ring-2 ring-white rounded-full mx-auto`}
            onClick={
              user.name == "incognito" &&
              router.pathname.includes("account") == false
                ? () => router.push("/sign-up")
                : user.name != "incognito" &&
                  router.pathname.includes("account") == false
                ? () => router.push("/account")
                : () => {
                    signOut(auth);
                    setUser({ name: "incognito" });
                    router.push("/");
                  }
            }
          >
            {!router.pathname.includes("account") ? (
              <img src="/account.png" alt="account" className="w-8 h-8" />
            ) : (
              <h2 className="font-inter font-semibold text-xl text-white">
                {
                  {
                    rus: "Выйти",
                    kaz: "Шығу",
                    eng: "Log Out",
                    tur: "Çıkış Yap",
                  }[lan]
                }
              </h2>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <AnimatePresence>
        {!hiddenProjects ? (
          <motion.div
            onMouseEnter={() => setHiddenProjects(false)}
            onMouseLeave={() => setHiddenProjects(true)}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`flex flex-col gap-1 bg-[#FDC656] absolute top-[76%] ${
              lan != "tur" ? "left-[35%]" : "left-[36.5%]"
            } px-3 pt-4 pb-5 z-30 rounded-lg`}
          >
            {[
              {
                name: {
                  rus: "Воскресная школа",
                  kaz: "Жексенбілік мектеп",
                  eng: "Sunday School",
                  tur: "Pazar Okulu",
                },
                link: "/themes/words",
              },
              {
                name: {
                  rus: "Детские конкурсы",
                  kaz: "Балалар байқаулары",
                  eng: "Children's Contests",
                  tur: "Çocuk Yarışmaları",
                },
                link: "/themes/subtitles",
              },
              {
                name: {
                  rus: "Конкурсы юных журналистов",
                  kaz: "Жас журналистер байқаулары",
                  eng: "Young Journalists Contests",
                  tur: "Genç Gazeteciler Yarışmaları",
                },
                link: "/themes/podcast",
              },
              {
                name: {
                  rus: "Конкурсы юных певцов и танцоров",
                  kaz: "Жас әншілер мен бишілер байқаулары",
                  eng: "Young Singers and Dancers Contests",
                  tur: "Genç Şarkıcılar ve Dansçılar Yarışmaları",
                },
                link: "/themes/audio",
              },
              {
                name: {
                  rus: "Конкурс юных переводчиков и писателей",
                  kaz: "Жас аудармашылар мен жазушылар байқауы",
                  eng: "Young Translators and Writers Contest",
                  tur: "Genç Çevirmenler ve Yazarlar Yarışması",
                },
                link: "/themes/images",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col gap-3 mt-2">
                <Link href={item.link}>
                  <h2 className="font-inter font-semibold text-md text-[#5C5C5C] ml-[2.5%]">
                    {item.name[lan]}
                  </h2>
                </Link>
                <div className="border-b-2 border-b-[#5C5C5C] w-[95%] mx-auto" />
              </div>
            ))}
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!hiddenThemes ? (
          <motion.div
            onMouseEnter={() => setHiddenThemes(false)}
            onMouseLeave={() => setHiddenThemes(true)}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`flex flex-col gap-1 bg-[#FDC656] absolute top-[76%] ${
              lan != "tur" ? "left-[53%]" : "left-[54.5%]"
            } px-3 pt-4 pb-5 z-30 rounded-lg`}
          >
            {[
              {
                name: {
                  kaz: "Аударма Әліппесі",
                  rus: "Азбука Перевода",
                  eng: "The ABC of Translation",
                  tur: "Çevirinin Alfabesi",
                },
                link: "/themes/words",
              },
              {
                name: {
                  kaz: "Титрлер дизайнын үйрену",
                  rus: "Обучение дизайну титров",
                  eng: "Title Design Training",
                  tur: "Başlık Tasarımı Eğitim",
                },
                link: "/themes/subtitles",
              },
              {
                name: {
                  kaz: "Подкасттарға үйрету",
                  rus: "Обучение Подкастам",
                  eng: "Podcast Training",
                  tur: "Podcast Eğitimi",
                },
                link: "/themes/podcast",
              },
              {
                name: {
                  kaz: "Дыбыстау шеберлігін үйрену",
                  rus: "Обучение мастерству озвучки",
                  eng: "Voice Acting Training",
                  tur: "Seslendirme Sanatı Eğitimi",
                },
                link: "/themes/audio",
              },
              {
                name: {
                  rus: "Перевод Манги и Сказок",
                  kaz: "Манга және ертегілерді аудару",
                  eng: "Manga and Fairy Tales Translation",
                  tur: "Manga ve Masalları Çeviri",
                },
                link: "/themes/images",
              },
              {
                name: {
                  rus: "Обучение Дублированию Аниме",
                  kaz: "Анимені дубляждауға үйрету",
                  eng: "Anime Dubbing Training",
                  tur: "Anime Dublaj Eğitimi",
                },
                link: "/themes/anime",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col gap-3 mt-2">
                <Link href={item.link}>
                  <h2 className="font-inter font-semibold text-md text-[#5C5C5C] ml-[2.5%]">
                    {item.name[lan]}
                  </h2>
                </Link>
                <div className="border-b-2 border-b-[#5C5C5C] w-[95%] mx-auto" />
              </div>
            ))}
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!hiddenCelebration ? (
          <motion.div
            onMouseEnter={() => setHiddenCelebration(false)}
            onMouseLeave={() => setHiddenCelebration(true)}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`flex flex-col gap-1 bg-[#FDC656] absolute top-[76%] ${
              lan != "tur" ? "left-[68%]" : "left-[71%]"
            } px-3 pt-4 pb-5 z-30 rounded-lg`}
          >
            {[
              {
                name: {
                  rus: "Сегодня в истории",
                  kaz: "Бүгін тарихта",
                  eng: "Today in History",
                  tur: "Bugün Tarihte",
                },
                link: "/afisha/today",
              },
              {
                name: {
                  rus: "Поздравления с Днем Рождения",
                  kaz: "Туған күнмен құттықтаймыз",
                  eng: "Happy Birthday Wishes",
                  tur: "Doğum Günü Tebrikleri",
                },
                link: "/afisha/birthday",
              },
              {
                name: {
                  rus: "Поздравления с Юбилеем",
                  kaz: "Юбилеймен құттықтаймыз",
                  eng: "Congratulations on the Anniversary",
                  tur: "Yıl Dönümü Tebrikleri",
                },
                link: "/afisha/congrats",
              },
              {
                name: {
                  rus: "Информация для Переводчиков",
                  kaz: "Аудармашыларға арналған ақпарат",
                  eng: "Information for Translators",
                  tur: "Çevirmenler İçin Bilgi",
                },
                link: "/afisha/translators",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col gap-3 mt-2">
                <Link href={item.link}>
                  <h2 className="font-inter font-semibold text-md text-[#5C5C5C] ml-[2.5%]">
                    {item.name[lan]}
                  </h2>
                </Link>
                <div className="border-b-2 border-b-[#5C5C5C] w-[95%] mx-auto" />
              </div>
            ))}
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!hiddenLanguages ? (
          <motion.div
            onMouseEnter={() => setHiddenLanguages(false)}
            onMouseLeave={() => setHiddenLanguages(true)}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col gap-1 bg-[#FDC656] absolute top-[76%] left-[78%] min-w-[10vw] px-3 pt-4 pb-5 z-30 rounded-lg"
          >
            {["Қазақша", "Русский", "English", "Türk"].map((item, index) => (
              <div key={index} className="flex flex-col gap-3 mt-2">
                <h2
                  className="font-inter font-semibold text-md text-[#5C5C5C] ml-[2.5%]"
                  onClick={() => changeLan(langs[item])}
                >
                  {item}
                </h2>
                <div className="border-b-2 border-b-[#5C5C5C] w-[95%] mx-auto" />
              </div>
            ))}
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
}
