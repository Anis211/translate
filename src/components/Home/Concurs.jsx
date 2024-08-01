/* eslint-disable @next/next/no-img-element */
import useUser from "@/zustand/user";
import { useEffect } from "react";
import Link from "next/link";

export default function Concurs() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const lan = useUser((state) => state.language);

  return (
    <div className="flex flex-row flex-wrap lg:px-24 bg-[#1E1E1E] h-auto py-[10vh]">
      <div
        id="concurs"
        className="flex flex-row justify-between lg:w-[50%] w-full"
      >
        <div className="w-[95%] flex flex-col gap-6 my-auto mx-auto">
          <h2 className="font-inter font-extrabold text-6xl text-[#FDC656] text-center mb-8 w-[95%] lg:w-[70%] mx-auto">
            {
              {
                rus: "Конкурсы",
                kaz: "Бүгін сіздер үшін:",
                eng: "Today for You:",
                tur: "Bugün Sizin İçin:",
              }[lan]
            }
          </h2>
          {[
            {
              name: {
                rus: "Конкурс юных журналистов",
                kaz: "Жаңалықтар",
                eng: "News",
                tur: "Haberler",
              },
              link: "/info/news",
            },
            {
              name: {
                rus: "Конкурс юных певцов и творцов",
                kaz: "Арт-Мәдениет",
                eng: "Art Culture",
                tur: "Sanat Kültürü",
              },
              link: "/info/art",
            },
            {
              name: {
                rus: "Конкурс юных переводчиков и певцов",
                kaz: "Манга",
                eng: "Manga",
                tur: "Manga",
              },
              link: "/info/manga",
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
      <div
        id="school"
        className="flex flex-row justify-between lg:w-[50%] w-full"
      >
        <div className="w-[95%] flex flex-col gap-6 my-auto mx-auto">
          <h2 className="font-inter font-extrabold text-6xl text-[#FDC656] text-center mb-8 w-[95%] lg:w-[70%] mx-auto">
            {
              {
                rus: "Воскресная школа",
                kaz: "Бүгін сіздер үшін:",
                eng: "Today for You:",
                tur: "Bugün Sizin İçin:",
              }[lan]
            }
          </h2>
          {[
            {
              name: {
                rus: "Школа искусства Н.Куантайулы",
                kaz: "Жаңалықтар",
                eng: "News",
                tur: "Haberler",
              },
              link: "/info/news",
            },
            {
              name: {
                rus: "Школа искусства Т.Эбдирайым",
                kaz: "Арт-Мәдениет",
                eng: "Art Culture",
                tur: "Sanat Kültürü",
              },
              link: "/info/art",
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
