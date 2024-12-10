import type { Database } from "~/supabase/types";

export const useQuestionData = () => {
    const supabase = useSupabaseClient<Database>();

    const question = ref<Database["public"]["Views"]["vw_question"]["Row"]>();
    const courses = ref<Array<number>>();
    const categories = ref<Array<number>>();
    const answers =
        ref<Array<Database["public"]["Tables"]["answer_option"]["Row"]>>();

    const courseOptions =
        ref<Array<Database["public"]["Tables"]["course"]["Row"]>>();
    const categoryOptions =
        ref<Array<Database["public"]["Tables"]["category"]["Row"]>>();

    const loadQuestion = async (questionId: number | null) => {
        if (!questionId) {
            return;
        }
        const { data, error } = await supabase
            .from("vw_question")
            .select("*")
            .eq("id", questionId)
            .single();
        if (error) {
            console.error(error);
            return;
        }
        question.value = data;
    };

    const loadCourses = async (questionId: number | null) => {
        if (!questionId) {
            return;
        }
        const { data, error } = await supabase
            .from("question_course")
            .select("course_id")
            .eq("question_id", questionId);
        if (error) {
            console.error(error);
            return;
        }
        courses.value = data.map((row) => row.course_id);
    };

    const loadCategories = async (questionId: number | null) => {
        if (!questionId) {
            return;
        }
        const { data, error } = await supabase
            .from("question_category")
            .select("category_id")
            .eq("question_id", questionId);
        if (error) {
            console.error(error);
            return;
        }
        categories.value = data.map((row) => row.category_id);
    };

    const loadAnswers = async (questionId: number | null) => {
        if (!questionId) {
            return;
        }
        const { data, error } = await supabase
            .from("answer_option")
            .select("*")
            .eq("question_id", questionId);
        if (error) {
            console.error(error);
            return;
        }
        answers.value = data;
    };

    const loadCourseOptions = async () => {
        const { data, error } = await supabase
            .from("course")
            .select("*")
            .order("name");
        if (error) {
            console.error(error);
            return;
        }
        courseOptions.value = data;
    };

    const loadCategoryOptions = async () => {
        const { data, error } = await supabase
            .from("category")
            .select("*")
            .order("name");
        if (error) {
            console.error(error);
            return;
        }
        categoryOptions.value = data;
    };

    const load = async (questionId: number | null) => {
        await Promise.all([
            loadQuestion(questionId),
            loadCourses(questionId),
            loadCategories(questionId),
            loadAnswers(questionId),
            loadCourseOptions(),
            loadCategoryOptions(),
        ]);

        return {
            question: question.value,
            courses: courses.value,
            categories: categories.value,
            answers: answers.value,
            courseOptions: courseOptions.value,
            categoryOptions: categoryOptions.value,
        };
    };

    return { load };
};
