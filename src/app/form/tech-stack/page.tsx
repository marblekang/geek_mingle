import Form from "@/component/form/form";
import { techStackKeywords } from "@/ilb/config/selectTag";

const TechStackForm = () => {
  return (
    <Form
      keywords={techStackKeywords}
      title="사용(관심) 기술 스택"
      prevPath="/form/job"
      type="techStack"
      isLast
    />
  );
};

export default TechStackForm;
