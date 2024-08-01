/* eslint-disable @next/next/no-img-element */
import useUser from "@/zustand/user";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  const lan = useUser((state) => state.language);

  return (
    <div className="flex flex-col px-24 bg-[#1E1E1E] h-auto pb-[30vh]">
      <div
        id="about"
        className="bg-[#404040] w-[70%] mx-auto flex flex-row px-16 py-14 relative bottom-[20vh] z-20"
      >
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
      <div className="flex flex-row justify-between">
        <div className="w-[45%] flex flex-col gap-6 my-auto mx-auto">
          <h2 className="font-inter font-extrabold text-6xl text-[#FDC656]">
            {
              {
                rus: "Кто мы такие?",
                kaz: "Біз кімбіз?",
                eng: "Who Are We?",
                tur: "Biz Kimiz?",
              }[lan]
            }
          </h2>
          <p className="font-inter font-semibold text-3xl text-white">
            {
              {
                rus: "Международный Союз Переводчиков - это фонд высоко-квалифицированных переводчиков, которые хотят помочь мало-обеспеченным семьям выйти из петли бедности и улучшить уровень своей жизни.",
                kaz: "Халықаралық Аудармашылар Одағы - жоғары білікті аудармашылардың қоры, олар аз қамтылған отбасыларға кедейлік шеңберінен шығуға және өмір деңгейін жақсартуға көмектескісі келеді.",
                eng: "The International Union of Translators is a fund of highly qualified translators who aim to help low-income families break out of the cycle of poverty and improve their quality of life.",
                tur: "Uluslararası Çevirmenler Birliği, düşük gelirli ailelerin yoksulluk döngüsünden çıkmalarına ve yaşam standartlarını artırmalarına yardımcı olmayı amaçlayan yüksek nitelikli çevirmenlerin fonudur.",
              }[lan]
            }
          </p>
        </div>
        <img
          src="/man1.webp"
          alt="smt"
          className="w-[40%] mx-auto h-auto ring-2 ring-white rounded-lg"
        />
      </div>
    </div>
  );
}
