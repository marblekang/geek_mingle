import Form from "@/component/form/form";

const TechStackForm = () => {
  const techStackKeywords: string[] = [
    "React",
    "Vue.js",
    "Angular",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "SASS/SCSS",
    "Redux",
    "Next.js",
    "Node.js",
    "Express.js",
    "Django",
    "Ruby on Rails",
    "Spring Boot",
    "Flask",
    "Go",
    "PHP",
    "Python",
    "Java",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "SQLite",
    "Oracle",
    "Microsoft SQL Server",
    "GraphQL",
    "REST API",
    "Docker",
    "Kubernetes",
  ];

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
