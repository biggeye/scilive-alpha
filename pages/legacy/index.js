import { createClient } from "utils/supabase/client";
import Link from "next/link";

const supabase = createClient();

export default function Legacy({ lessons }) {
  console.log(lessons);
  return (
    <div className="flex flex-col w-vwitems-center justify-center">
      {lessons.map((lesson) => (
        <p>
          <Link
            className="p-8 h-40 mb-4 rounded shadow-lg text-xl flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 ease-in-out"
            key={lesson.id}
            href={`/legacy/${lesson.id}`}
          >
            {lesson.title}
          </Link>
          <div></div>
        </p>
      ))}
      <Link
        className="bt-1 bb-2 outline-1 rounded-md bg-slate-500"
        href={"/legacy/login"}
      >
        Login
      </Link>
    </div>
  );
}

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");
  return {
    props: {
      lessons,
    },
  };
};
