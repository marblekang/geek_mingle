export const jobKeywords: string[] = [
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
export const techStackKeywords: string[] = [
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

export const allKeywords: string[] = [...jobKeywords, ...techStackKeywords];

export const generateSelectionArray = (
  selectedKeywords: string[]
): number[] => {
  return allKeywords.map((keyword) =>
    selectedKeywords.includes(keyword) ? 1 : 0
  );
};
