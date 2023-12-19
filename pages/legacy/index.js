import { createClient } from 'utils/supabase/client';
import Link from "next/link";

const supabase = createClient();

export default function Legacy({ lessons }) {
   console.log(lessons);
    return(
        <div className="flex flex-col items-center justify-center">

          {lessons.map(lesson => (
            <Link className="p-8 h-40 mb-4 rounded shadow text-xl flex" key={lesson.id} href={`/legacy/${lesson.id}`}>
            {lesson.title}
                </Link> ))}
        </div>
    )
} 

export const getStaticProps = async () => {
    const { data: lessons } = await supabase.from('lesson').select('*');
    return {
        props: {
            lessons,
        }
    }
}