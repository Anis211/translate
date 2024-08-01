/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect } from "react";
import useUser from "@/zustand/user";

export default function News() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const lan = useUser((state) => state.language);

  return (
    <div className="bg-[url('/background1.webp')] bg-cover w-[100%] h-auto z-10 flex flex-col gap-6 py-16 lg:py-20">
      <div
        id="about"
        className="bg-[#404040] w-[70%] flex flex-col gap-10 mx-auto px-16 py-14 relative bottom-[20vh] z-20"
      >
        <h2 className="font-inter font-bold text-5xl text-[#FDC656] text-center underline underline-offset-4">
          {
            {
              rus: "Наши Поддержки",
              kaz: "Біздің Қолдауларымыз",
              eng: "Our Supports",
              tur: "Desteklerimiz",
            }[lan]
          }
        </h2>
        <div className="flex flex-row">
          <div className="flex flex-col gap-4 w-[47.5%]">
            <h1 className="font-inter font-bold text-5xl text-[#FDC656]">
              {
                {
                  rus: "О Нас",
                  kaz: "Біз туралы",
                  eng: "About Us",
                  tur: "Hakkımızda",
                }[lan]
              }
            </h1>
            <p className="font-inter font-semibold text-xl text-white max-w-[90%]">
              {
                {
                  rus: "Общественный фонд «Союз переводчиков Алаш» имени Кунанбай кажы - инициатива активных граждан, стремящихся превратить Абайскую область в «Духовную столицу» в сфере перевода создан 27 декабря 2023 года.",
                  kaz: "Құнанбай қажы атындағы «Алаш аудармашылар одағы» Қоғамдық қоры - Абай облысын аударма саласында «Рухани астанаға» айналдыруды мақсат тұтқан белсенді азаматтардың бастамасымен 2023 жылдың 27  желтоқсанында құрылды.",
                  eng: "The Public Fund 'Alaş Translators Union' named after Kunanbai Kazhy is an initiative of active citizens aiming to turn the Abai Region into a 'Spiritual Capital' in the field of translation. It was established on December 27, 2023.",
                  tur: "Kunanbai Kazhy adına ‘Alaş Çevirmenler Birliği’ Kamu Vakfı, Abai Bölgesi'ni çeviri alanında 'Ruhsal Başkent' haline getirmeyi hedefleyen aktif vatandaşların bir girişimidir. 27 Aralık 2023 tarihinde kurulmuştur.",
                }[lan]
              }
            </p>
          </div>
          <div className="border-r-4 border-r-[#FDC656] h-[35vh] mx-[2.5%]" />
          <div className="flex flex-col gap-4 w-[47.5%]">
            <h1 className="font-inter font-bold text-5xl text-[#FDC656] text-end">
              {
                {
                  rus: "Об Учениках",
                  kaz: "Оқушылар туралы",
                  eng: "About Students",
                  tur: "Öğrenciler Hakkında",
                }[lan]
              }
            </h1>
            <p className="font-inter font-semibold text-xl text-white max-w-[90%] text-end self-end">
              {
                {
                  rus: "В область «Web - переводов» вовлечены педагоги с ограниченными возможностями или безработные в Казахстане, родители-одиночки и воспитывающиеся в малообеспеченных семьях, потерявшие кормильца и т.д.",
                  kaz: "«Web- аударма» саласына Қазақстандағы мүмкіндігі шектеулі педагогтар, жұмыссыздар, жалғыз басты ата-аналар және аз қамтылған отбасыларда өскен, асыраушысынан айырылған балалар тартылған.",
                  eng: "The field of 'Web Translation' involves educators with disabilities or unemployed individuals in Kazakhstan, single parents, and those raised in low-income families or who have lost their breadwinners.",
                  tur: "'Web Çeviri' alanına, engelli eğitmenler veya işsiz kişiler, tek ebeveynler ve düşük gelirli ailelerde yetişen veya ekmek kazananlarını kaybeden kişiler dahil edilmektedir.",
                }[lan]
              }
            </p>
          </div>
        </div>
      </div>
      <div id="info" className="flex flex-row justify-between">
        <div className="w-[70%] flex flex-col gap-6 my-auto mx-auto">
          <h2 className="font-inter font-extrabold text-6xl text-[#FDC656] text-center mb-8 w-[95%] lg:w-[70%] mx-auto">
            {
              {
                rus: "Сегодня для Вас:",
                kaz: "Бүгін сіздер үшін:",
                eng: "Today for You:",
                tur: "Bugün Sizin İçin:",
              }[lan]
            }
          </h2>
          {[
            {
              name: {
                rus: "Новости",
                kaz: "Жаңалықтар",
                eng: "News",
                tur: "Haberler",
              },
              link: "/info/news",
            },
            {
              name: {
                rus: "Арт-Культура",
                kaz: "Арт-Мәдениет",
                eng: "Art Culture",
                tur: "Sanat Kültürü",
              },
              link: "/info/art",
            },
            {
              name: {
                rus: "Манга",
                kaz: "Манга",
                eng: "Manga",
                tur: "Manga",
              },
              link: "/info/manga",
            },
            {
              name: {
                rus: "Аниме",
                kaz: "Аниме",
                eng: "Anime",
                tur: "Anime",
              },
              link: "/info/anime",
            },
            {
              name: {
                rus: "Битва Переводчиков",
                kaz: "Аудармашылар шайқасы",
                eng: "Translator Battle",
                tur: "Çevirmenler Savaşı",
              },
              link: "/info/vs",
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
