import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const LessonDetails = ({ lesson }) => {
  return (
    <div class="max-w-2xl mx-auto p-5">
    <h1 class="text-2xl font-bold mb-3">{lesson.title}</h1>
    <p class="text-lg text-gray-600">{lesson.description}</p>
</div>

  )
};

export const getStaticPaths = async () => {
  const { data: lessons } = await supabase.from("lesson").select("id");

  const paths = lessons.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({params: {id}}) => {
    const { data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", id)
    .single();

    return {
        props: {
            lesson,
        },
    };
};

export default LessonDetails;
