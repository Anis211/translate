/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import useUser from "@/zustand/user";
import { useEffect } from "react";
import Link from "next/link";

export default function Cources() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const lan = useUser((state) => state.language);

  return (
    <div className="bg-[url('/background2.webp')] bg-cover w-[100%] h-auto z-10 flex flex-col gap-6 pb-16 lg:pb-40">
      <div className="bg-[#404040] w-[70%] mx-auto flex flex-row justify-evenly px-16 py-24 relative bottom-[20vh] z-20">
        {[
          {
            header: "10+",
            body: {
              rus: "Лет в этой сфере",
              kaz: "Бұл саладағы жылдар",
              eng: "Years in This Field",
              tur: "Bu Alandaki Yıllar",
            },
          },
          {
            header: "100+",
            body: {
              rus: "Успешных переводов",
              kaz: "Сәтті аудармалар",
              eng: "Successful Translations",
              tur: "Başarılı Çeviriler",
            },
          },
          {
            header: "99%",
            body: {
              rus: "Точность переводов",
              kaz: "Аударма дәлдігі",
              eng: "Translation Accuracy",
              tur: "Çeviri Doğruluğu",
            },
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h1 className="font-inter font-extrabold text-6xl text-[#FDC656] text-center">
              {item.header}
            </h1>
            <p className="font-inter font-semibold text-white text-2xl text-center max-w-[90%] mx-auto">
              {item.body[lan]}
            </p>
          </div>
        ))}
      </div>
      <div id="themes" className="flex flex-row justify-between">
        <img
          src="/man2.webp"
          alt="smt"
          className="w-[40%] h-auto ring-2 ring-white rounded-lg mx-auto"
        />
        <div className="w-[45%] flex flex-col gap-6 my-auto mx-auto">
          <h2 className="font-inter font-extrabold text-6xl text-[#FDC656] text-center mb-8 w-[95%] lg:w-[70%] mx-auto">
            {
              {
                rus: "Наши Авторские Курсы:",
                kaz: "Біздің авторлық курстарымыз:",
                eng: "Our Author Courses:",
                tur: "Özgün Kurslarımız:",
              }[lan]
            }
          </h2>
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
            <Link key={index} href={item.link}>
              <p className="font-inter font-semibold text-3xl text-white w-[70%] mx-auto text-center ring-2 ring-white backdrop-blur-lg rounded-lg py-7">
                {item.name[lan]}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
