import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/clientApp";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import useUser from "@/zustand/user";
import Link from "next/link";

export default function SignIn() {
  useEffect(() => {
    useUser.persist.rehydrate();
  });

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const setUser = useUser((state) => state.setUser);
  const lan = useUser((state) => state.language);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const ref1 = useRef(null);
  const inView1 = useInView(ref1);

  const ref2 = useRef(null);
  const inView2 = useInView(ref2);

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(email, password);
      const id = auth.currentUser.uid;

      const res = await getDoc(doc(firestore, "users", "data"));
      const data = res.data();

      data.users[id].email != "admin@mail.ru"
        ? setUser({
            id: id,
            login: data.users[id].name,
            email: data.users[id].email,
            liked: data.users[id].loved_articles,
          })
        : setUser({
            id: id,
            login: data.users[id].name,
            email: data.users[id].email,
          });

      setIsSuccess(true);
      setTimeout(() => router.push("/"), 1000);
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
              kaz: "Жетістік",
              eng: "Success",
              tur: "Başarı",
            }[lan]
          }
        </h2>
        <p className="font-lexend font-semibold text-[#047857] text-[14px]">
          {
            {
              rus: "Вы успешно зарегистрировали ваш Аккаунт!",
              kaz: "Сіз өз есептік жазбаңызды сәтті тіркедіңіз!",
              eng: "You have successfully registered your account!",
              tur: "Hesabınızı başarıyla kaydettiniz!",
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
      <div className="2xl:w-[40vw] w-[95%] lg:w-[60vw] md:w-[60vw] h-auto px-8 pt-10 pb-14 self-center mx-auto bg-[#5C5C5C] mt-16 text-center shadow-lg rounded-[16px] z-10">
        <div className="w-32 mb-6 mx-auto">
          <h2 className="font-lexend font-bold xl:text-[30px] text-2xl text-[#FDC656] mb-1 underline underline-offset-8">
            {
              {
                rus: "Войти",
                kaz: "Кіру",
                eng: "Log in",
                tur: "Giriş Yap",
              }[lan]
            }
          </h2>
        </div>
        <input
          type="email"
          placeholder={
            {
              rus: "Ваша Почта:",
              kaz: "Сіздің Поштаңыз:",
              eng: "Your Email:",
              tur: "E-posta Adresiniz:",
            }[lan]
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="lg:w-80 w-[90%] h-12 rounded-lg mb-[15px] pl-[10px] focus:shadow-lg hover:shadow-md"
        />
        <input
          type={"text"}
          value={password}
          placeholder={
            {
              rus: "Ваш Пороль:",
              kaz: "Сіздің Құпия сөз:",
              eng: "Your Password:",
              tur: "Şifreniz:",
            }[lan]
          }
          onChange={(e) => setPassword(e.target.value)}
          className="lg:w-80 w-[90%] h-12 rounded-lg mb-[25px] pl-[10px]"
        />
        <motion.button
          whileTap={{
            scale: 0.9,
            transition: { duration: 0.3, type: "spring" },
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3, type: "spring" },
          }}
          className="2xl:w-80 w-[90%] md:w-[80%] lg:w-[70%] h-12 bg-[#FDC656] text-[#5C5C5C] rounded-md font-inter font-bold focus:shadow-lg hover:shadow-md"
          onClick={handleSubmit}
        >
          {
            {
              rus: "Войти",
              kaz: "Кіру",
              eng: "Log in",
              tur: "Giriş Yap",
            }[lan]
          }
        </motion.button>
        <p className="font-lexend font-medium text-[#FDC656] text-md mt-4">
          {
            {
              rus: "Если вы еще не Зарегистрированны,",
              kaz: "Егер сіз әлі тіркелмеген болсаңыз,",
              eng: "If you are not yet registered,",
              tur: "Henüz kayıtlı değilseniz,",
            }[lan]
          }
          <Link href="/sign-up">
            <span>
              {
                {
                  rus: " 'нажмите сюда'",
                  kaz: " 'мұнда басыңыз'",
                  eng: " 'click here'",
                  tur: " 'buraya tıklayın'",
                }[lan]
              }
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
