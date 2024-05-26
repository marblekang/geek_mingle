import Form from "@/component/form/form";

const JobForm = () => {
  const jobKeywords: string[] = [
    "프론트엔드 개발자",
    "서버 개발자",
    "풀스택 개발자",
    "자바 개발자",
    "C,C++ 개발자",
    "파이썬 개발자",
    "Node.js 개발자",
    "안드로이드 개발자",
    "iOS 개발자",
  ];
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
