import Form from "@/component/form/form";
import { jobKeywords } from "@/ilb/config/selectTag";

const JobForm = () => {
  return (
    <Form
      keywords={jobKeywords}
      title="현재(관심) 직무"
      nextPath="/form/tech-stack"
      type="job"
    />
  );
};

export default JobForm;
