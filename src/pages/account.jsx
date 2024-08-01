/* eslint-disable @next/next/no-img-element */
import { motion, AnimatePresence, useInView } from "framer-motion";
import { firestore } from "../../firebase/clientApp";
import { getDoc, doc, setDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/clientApp";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import useUser from "@/zustand/user";

const afisha = [
  {
    rus: "Сегодня в истории",
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

const projects = [
  {
    rus: "Воскресная школа",
    kaz: "Жексенбілік мектеп",
    eng: "Sunday School",
    tur: "Pazar Okulu",
  },
  {
    rus: "Детские конкурсы",
    kaz: "Балалар байқаулары",
    eng: "Children's Contests",
    tur: "Çocuk Yarışmaları",
  },
  {
    rus: "Конкурсы юных журналистов",
    kaz: "Жас журналистер байқаулары",
    eng: "Young Journalists Contests",
    tur: "Genç Gazeteciler Yarışmaları",
  },
  {
    rus: "Конкурсы юных певцов и танцоров",
    kaz: "Жас әншілер мен бишілер байқаулары",
    eng: "Young Singers and Dancers Contests",
    tur: "Genç Şarkıcılar ve Dansçılar Yarışmaları",
  },
  {
    rus: "Конкурс юных переводчиков и писателей",
    kaz: "Жас аудармашылар мен жазушылар байқауы",
    eng: "Young Translators and Writers Contest",
    tur: "Genç Çevirmenler ve Yazarlar Yarışması",
  },
];

const news = [
  {
    rus: "Новости",
    kaz: "Жаңалықтар",
    eng: "News",
    tur: "Haberler",
  },
  {
    rus: "Арт-Культура",
    kaz: "Арт-Мәдениет",
    eng: "Art Culture",
    tur: "Sanat Kültürü",
  },
  {
    rus: "Манга",
    kaz: "Манга",
    eng: "Manga",
    tur: "Manga",
  },
  {
    rus: "Аниме",
    kaz: "Аниме",
    eng: "Anime",
    tur: "Anime",
  },
  {
    rus: "Битва Переводчиков",
    kaz: "Аудармашылар шайқасы",
    eng: "Translator Battle",
    tur: "Çevirmenler Savaşı",
  },
];

const afishaLinks = ["today", "birthday", "congrats", "translators"];
const projectsLinks = [
  "school",
  "kids",
  "journalists",
  "singers",
  "translators",
];
const newsLinks = ["news", "art", "manga", "anime", "vs"];

const themes = {};

afisha.map((item, index) => (themes[item.rus] = afishaLinks[index]));
projects.map((item, index) => (themes[item.rus] = projectsLinks[index]));
news.map((item, index) => (themes[item.rus] = newsLinks[index]));

export default function Account() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const lan = useUser((state) => state.language);
  const user = useUser((state) => state.user);
  const router = useRouter();

  const [header, setHeader] = useState({ rus: "", kaz: "", eng: "", tur: "" });
  const [body, setBody] = useState({ rus: [], kaz: [], eng: [], tur: [] });
  const [image, setImage] = useState("");
  const [theme, setTheme] = useState("");

  const [hidden, setHidden] = useState(true);
  const [newBody, setNewBody] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [finished, setFinished] = useState({
    rus: false,
    kaz: false,
    eng: false,
    tur: false,
  });
  const [lang, setLang] = useState("");

  const ref1 = useRef(null);
  const inView1 = useInView(ref1);

  const ref2 = useRef(null);
  const inView2 = useInView(ref2);

  const handleAdd = async () => {
    try {
      const main = news.includes(theme)
        ? "today"
        : projects.includes(theme)
        ? "projects"
        : "afisha";

      const res = await getDoc(doc(firestore, main, themes[theme.rus]));
      const name = res.data();

      const storageRef = ref(storage);
      const fileRef = ref(
        storageRef,
        `images/${main}/${themes[theme.rus]}/${image.name}`
      );

      let downloadUrl = "";

      await uploadBytes(fileRef, image);
      await getDownloadURL(fileRef).then((url) => {
        downloadUrl = url;
      });

      await setDoc(doc(collection(firestore, main), themes[theme.rus]), {
        data: [
          ...name.data,
          {
            header: header,
            body: body,
            image: downloadUrl,
            theme: themes[theme.rus],
          },
        ],
      });

      setIsSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    } catch (e) {
      setError(e.message);
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    }
  };

  return (
    <div className="w-[100%] min-h-[50vh] py-14">
      <motion.div
        ref={ref1}
        initial={{ opacity: 0, y: -60 }}
        animate={inView1 ? { opacity: [0, 0.5, 1], y: [-60, 0, 0] } : {}}
        transition={{ duration: 1, type: "spring", times: [0, 0.5, 1] }}
        className={`px-6 py-2 pt-3 rounded-lg bg-[#D1FAE5] h-[80px] ml-7 mt-7 absolute ${
          isSuccess ? "visible" : "hidden"
        }`}
      >
        <h2 className="font-lexend font-semibold text-[#047857] text-[20px]">
          {
            {
              rus: "Успех",
              kaz: "Табыс",
              eng: "Success",
              tur: "Başarı",
            }[lan]
          }
        </h2>
        <p className="font-lexend font-semibold text-[#047857] text-[14px]">
          {
            {
              rus: "Вы Добавили Статью Успешно!",
              kaz: "Сіз мақаланы сәтті қостыңыз!",
              eng: "You Have Successfully Added the Article!",
              tur: "Makaleyi Başarıyla Eklediniz!",
            }[lan]
          }
        </p>
      </motion.div>
      <motion.div
        ref={ref2}
        initial={{ opacity: 0, y: -60 }}
        animate={inView2 ? { opacity: [0, 0.5, 1], y: [-60, 0, 0] } : {}}
        exit={{ opacity: [1, 0.5, 0], y: [0, -60, -60] }}
        transition={{ duration: 1, type: "spring", times: [0, 0.5, 1] }}
        className={`px-6 py-2 pt-3 rounded-lg bg-red-400 h-[80px] ml-7 mt-7 absolute ${
          isError ? "visible" : "hidden"
        } `}
      >
        <h2 className="font-lexend font-semibold text-gray-50 text-[20px]">
          {
            {
              rus: "Ошибка",
              kaz: "Қате",
              eng: "Error",
              tur: "Hata",
            }[lan]
          }
        </h2>
        <p className="font-lexend font-semibold text-gray-50 text-[14px]">
          {error}
        </p>
      </motion.div>
      <h1 className="font-inter font-extrabold text-5xl text-center w-[90%] mx-auto text-[#FDC656]">
        {
          {
            rus: "Добро Пожаловать,",
            kaz: "Қош келдіңіздер,",
            eng: "Welcome,",
            tur: "Hoş Geldiniz,",
          }[lan]
        }{" "}
        {user.login}{" "}
      </h1>
      <div className="lg:w-[80%] mx-auto w-full z-20 px-8 py-10 h-auto bg-[#5C5C5C] mt-[4%] flex flex-col gap-10 shadow-lg rounded-[16px]">
        <AnimatePresence>
          {theme == "" ? (
            <>
              <h1 className="font-inter font-extrabold lg:text-4xl text-3xl text-center text-white">
                {
                  {
                    rus: "Выберите Тему:",
                    kaz: "Тақырыпты Таңдаңыз:",
                    eng: "Select Topic:",
                    tur: "Konu Seçin:",
                  }[lan]
                }
              </h1>
              <div className="flex flex-col gap-4">
                <h2 className="font-inter font-bold text-white text-xl lg:ml-[5%] underline underline-offset-4">
                  {
                    {
                      rus: "Афиша:",
                      kaz: "Афиша:",
                      eng: "Poster:",
                      tur: "Afiş:",
                    }[lan]
                  }
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  className="flex flex-row flex-wrap gap-3 lg:ml-[5%]"
                >
                  {afisha.map((item, index) => (
                    <motion.button
                      key={index}
                      whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.3, type: "spring" },
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3, type: "spring" },
                      }}
                      className="flex flex-row items-center justify-center gap-2 py-2 px-4 bg-[#FDC656] text-black rounded-md font-inter font-bold focus:shadow-lg hover:shadow-md"
                      onClick={() => setTheme(item)}
                    >
                      {item[lan]}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="font-inter font-bold text-white text-xl lg:ml-[5%] underline underline-offset-4">
                  {
                    {
                      rus: "Наши Проекты",
                      kaz: "Біздің Жобалар",
                      eng: "Our Projects",
                      tur: "Projelerimiz",
                    }[lan]
                  }
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  className="flex flex-row flex-wrap gap-3 lg:ml-[5%]"
                >
                  {projects.map((item, index) => (
                    <motion.button
                      key={index}
                      whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.3, type: "spring" },
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3, type: "spring" },
                      }}
                      className="flex flex-row items-center justify-center gap-2 py-2 px-4 bg-[#FDC656] text-black rounded-md font-inter font-bold focus:shadow-lg hover:shadow-md"
                      onClick={() => setTheme(item)}
                    >
                      {item[lan]}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="font-inter font-bold text-white text-xl lg:ml-[5%] underline underline-offset-4">
                  {
                    {
                      rus: "Сегодня для Вас:",
                      kaz: "Бүгін сіздер үшін:",
                      eng: "Today for You:",
                      tur: "Bugün Sizin İçin:",
                    }[lan]
                  }
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  className="flex flex-row flex-wrap gap-3 lg:ml-[5%]"
                >
                  {news.map((item, index) => (
                    <motion.button
                      key={index}
                      whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.3, type: "spring" },
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3, type: "spring" },
                      }}
                      className="flex flex-row items-center justify-center gap-2 py-2 px-4 bg-[#FDC656] text-black rounded-md font-inter font-bold focus:shadow-lg hover:shadow-md"
                      onClick={() => setTheme(item)}
                    >
                      {item[lan]}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-inter font-extrabold lg:text-4xl text-3xl text-center text-white">
                {
                  {
                    rus: "Заполните Форму:",
                    kaz: "Пішінді толтырыңыз:",
                    eng: "Fill Out the Form:",
                    tur: "Formu Doldurun:",
                  }[lan]
                }
              </h1>
              <div className="flex flex-col gap-4">
                <h2 className="font-inter font-bold text-white text-xl lg:ml-[5%]">
                  {
                    {
                      rus: "Тема:",
                      kaz: "Тақырып:",
                      eng: "Subject:",
                      tur: "Konu:",
                    }[lan]
                  }
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transtion={{ duration: 0.5, type: "spring" }}
                  className="w-full px-4 lg:max-w-[35%] h-12 flex flex-row items-center lg:ml-[5%] justify-center gap-2 bg-[#FDC656] text-black rounded-md font-inter font-bold focus:shadow-lg hover:shadow-md"
                >
                  {theme[lan]}
                  <img
                    src="/remove.png"
                    alt="remove"
                    className="w-11 h-11 my-auto"
                    onClick={() => setTheme("")}
                  />
                </motion.div>
              </div>
              <div className="flex flex-row flex-wrap gap-4 ml-[5%]">
                {["rus", "kaz", "eng", "tur"].map((item, index) => (
                  <motion.button
                    key={index}
                    whileTap={{
                      scale: 0.9,
                      transition: { duration: 0.3, type: "spring" },
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3, type: "spring" },
                    }}
                    className={`w-[90%] lg:w-auto pl-4 ${
                      finished[item] == true ? "pr-4" : ""
                    } h-12 flex flex-row items-center justify-center gap-2 bg-[#FDC656] text-black rounded-md font-inter font-bold focus:shadow-lg hover:shadow-md`}
                    onClick={() => setLang(item)}
                  >
                    {item}
                    {finished[item] == false ? (
                      <img
                        src="/add.png"
                        alt="add"
                        className="w-9 h-9 my-auto"
                      />
                    ) : (
                      ""
                    )}
                  </motion.button>
                ))}
              </div>
              {lang != "" ? (
                <>
                  <input
                    type="text"
                    value={header[lang]}
                    placeholder={
                      {
                        rus: "Добавить Заголовок:",
                        kaz: "Тақырып Қосу:",
                        eng: "Add Title:",
                        tur: "Başlık Ekle:",
                      }[lan]
                    }
                    onChange={(e) =>
                      setHeader({ ...header, [lang]: e.target.value })
                    }
                    className="lg:w-[70%] w-[95%] lg:ml-[5%] rounded-lg py-5 px-8 mx-auto font-inter font-semibold text-gray-500 text-lg placeholder:font-inter placeholder:font-semibold placeholder:text-gray-500 placeholder:text-lg"
                  />
                  <div className="flex flex-col gap-5">
                    <h2 className="font-inter font-bold text-white text-xl lg:ml-[5%]">
                      {
                        {
                          rus: "Основная Часть Текста:",
                          kaz: "Мәтіннің Негізгі Бөлігі:",
                          eng: "Main Body of Text:",
                          tur: "Metnin Ana Kısmı:",
                        }[lan]
                      }
                    </h2>
                    <motion.button
                      whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.3, type: "spring" },
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3, type: "spring" },
                      }}
                      className="w-[90%] lg:w-[20%] lg:ml-[5%] h-12 flex flex-row items-center justify-center gap-2 bg-[#FDC656] text-black rounded-md font-inter font-bold focus:shadow-lg hover:shadow-md"
                      onClick={() => setHidden(false)}
                    >
                      {
                        {
                          rus: "Добавить Параграф",
                          kaz: "Параграф Қосу",
                          eng: "Add Paragraph",
                          tur: "Paragraf Ekle",
                        }[lan]
                      }{" "}
                      <img
                        src="/add.png"
                        alt="add"
                        className="w-9 h-9 my-auto"
                      />
                    </motion.button>
                    <AnimatePresence>
                      {!hidden ? (
                        <motion.div
                          initial={{ opacity: 0, y: 60 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transtion={{ duration: 0.5, type: "spring" }}
                          className="flex lg:flex-row flex-col lg:ml-[5%] gap-4"
                        >
                          <input
                            type="text"
                            value={newBody}
                            placeholder={
                              {
                                rus: "Текст для Параграфа:",
                                kaz: "Параграфқа арналған Мәтін:",
                                eng: "Text for Paragraph:",
                                tur: "Paragraf İçin Metin:",
                              }[lan]
                            }
                            onChange={(e) => setNewBody(e.target.value)}
                            className="lg:w-[70%] rounded-lg py-5 px-8 font-inter font-semibold text-gray-500 text-lg placeholder:font-inter placeholder:font-semibold placeholder:text-gray-500 placeholder:text-lg"
                          />
                          <div className="flex flex-col gap-1 lg:w-[20%]">
                            <motion.button
                              whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.3, type: "spring" },
                              }}
                              whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3, type: "spring" },
                              }}
                              className="flex flex-row items-center justify-center gap-2 py-2 bg-[#FDC656] text-black rounded-md font-inter font-bold focus:shadow-lg hover:shadow-md"
                              onClick={() => {
                                setBody({
                                  ...body,
                                  [lang]: [...body[lang], newBody],
                                });

                                console.log([...body[lang], newBody]);

                                setFinished({ ...finished, [lang]: true });
                                setNewBody("");
                                setHidden(true);
                              }}
                            >
                              {
                                {
                                  rus: "Добавить",
                                  kaz: "Қосу",
                                  eng: "Add",
                                  tur: "Ekle",
                                }[lan]
                              }
                            </motion.button>
                            <motion.button
                              whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.3, type: "spring" },
                              }}
                              whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3, type: "spring" },
                              }}
                              className="flex flex-row items-center justify-center gap-2 py-2 bg-[#FDC656] text-black rounded-md font-inter font-bold focus:shadow-lg hover:shadow-md"
                              onClick={() => {
                                setNewBody("");
                                setHidden(true);
                              }}
                            >
                              {
                                {
                                  rus: "Закрыть",
                                  kaz: "Жабу",
                                  eng: "Close",
                                  tur: "Kapat",
                                }[lan]
                              }
                            </motion.button>
                          </div>
                        </motion.div>
                      ) : (
                        ""
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {body[lang]?.map((item, index) => (
                        <motion.h3
                          initial={{ opacity: 0, y: 60 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transtion={{ duration: 0.5, type: "spring" }}
                          key={index}
                          className="px-4 py-5 max-w-[95%] lg:ml-[5%] w-full mx-auto ring-2 ring-white font-inter font-medium text-white text-lg rounded-lg flex flex-row justify-between"
                        >
                          {item}{" "}
                          <img
                            src="/remove.png"
                            alt="remove"
                            className="w-11 h-11 my-auto"
                            onClick={() => {
                              setBody({
                                ...body,
                                [lang]: [
                                  ...body[lang].slice(
                                    0,
                                    body[lang].indexOf(item)
                                  ),
                                  ...body[lang].slice(
                                    body[lang].indexOf(item) + 1,
                                    body[lang].length
                                  ),
                                ],
                              });

                              [
                                ...body[lang].slice(
                                  0,
                                  body[lang].indexOf(item)
                                ),
                                ...body[lang].slice(
                                  body[lang].indexOf(item) + 1,
                                  body[lang].length
                                ),
                              ].length > 0
                                ? setFinished({ ...finished, [lang]: true })
                                : setFinished({ ...finished, [lang]: false });
                            }}
                          />
                        </motion.h3>
                      ))}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="flex flex-col gap-5 lg:ml-[5%]">
                <h2 className="font-inter font-bold text-white text-xl">
                  {
                    {
                      rus: "Добавить Картинку Статьи:",
                      kaz: "Мақала Суретін Қосу:",
                      eng: "Add Article Image:",
                      tur: "Makale Resmi Ekle:",
                    }[lan]
                  }
                </h2>
                <input
                  type="file"
                  placeholder={
                    {
                      rus: "Картинка для статьи",
                      kaz: "Мақалаға арналған сурет",
                      eng: "Image for Article",
                      tur: "Makale İçin Resim",
                    }[lan]
                  }
                  onChange={(e) =>
                    e.target.files[0].name.includes(".png") ||
                    e.target.files[0].name.includes(".jpg") ||
                    e.target.files[0].name.includes(".jpeg") ||
                    e.target.files[0].name.includes(".webp")
                      ? setImage(e.target.files[0])
                      : ""
                  }
                  className="file:font-inter file:font-semibold file:text-lg file:rounded-lg file:bg-[#FDC656] file:text-black file:px-4 file:py-2 text-white font-inter font-medium text-lg"
                />
              </div>
              <motion.button
                whileTap={
                  (header.rus.length > 6) &
                  (header.kaz.length > 6) &
                  (header.eng.length > 6) &
                  (header.tur.length > 6) &
                  (body.rus.length > 0) &
                  (body.kaz.length > 0) &
                  (body.eng.length > 0) &
                  (body.tur.length > 0) &
                  (image != "") &
                  (theme.length != "")
                    ? {
                        scale: 0.9,
                        transition: { duration: 0.3, type: "spring" },
                      }
                    : ""
                }
                whileHover={
                  (header.rus.length > 6) &
                  (header.kaz.length > 6) &
                  (header.eng.length > 6) &
                  (header.tur.length > 6) &
                  (body.rus.length > 0) &
                  (body.kaz.length > 0) &
                  (body.eng.length > 0) &
                  (body.tur.length > 0) &
                  (image != "") &
                  (theme.length != "")
                    ? {
                        scale: 1.05,
                        transition: { duration: 0.3, type: "spring" },
                      }
                    : ""
                }
                className="flex flex-row items-center justify-center mt-3 w-[60%] mx-auto py-4 bg-[#FDC656] text-black text-xl rounded-md font-inter font-bold focus:shadow-lg hover:shadow-md disabled:opacity-65"
                disabled={
                  (header.rus.length > 6) &
                  (header.kaz.length > 6) &
                  (header.eng.length > 6) &
                  (header.tur.length > 6) &
                  (body.rus.length > 0) &
                  (body.kaz.length > 0) &
                  (body.eng.length > 0) &
                  (body.tur.length > 0) &
                  (image != "") &
                  (theme.length != "")
                    ? false
                    : true
                }
                onClick={handleAdd}
              >
                {
                  {
                    rus: "Добавить Статью",
                    kaz: "Мақала Қосу",
                    eng: "Add Article",
                    tur: "Makale Ekle",
                  }[lan]
                }
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
