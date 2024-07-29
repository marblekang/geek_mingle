describe("Register Page", () => {
  beforeEach(() => {
    // 회원가입 페이지로 이동
    cy.visit("/sign-up");
  });

  it("should load the registration page", () => {
    // 회원가입 페이지 로드 확인
    cy.get("h1").contains("Register");
  });

  it("should register a new user with valid data", () => {
    // 유효한 데이터 입력
    cy.get("#email").type("testuser2@example.com");
    cy.get("#password").type("Password123!");
    cy.get("#confirmPassword").type("Password123!");
    cy.get("#name").type("Test User");
    cy.get("#age").type("30");

    // 폼 제출
    cy.get("form").submit();

    // 회원가입 성공 후 리다이렉션 확인
    cy.url().should("include", "/form/job");
  });

  it("should show error if passwords do not match", () => {
    // 비밀번호와 비밀번호 확인 필드에 일치하지 않는 값 입력
    cy.get("#email").type("testuser@example.com");
    cy.get("#password").type("Password123!");
    cy.get("#confirmPassword").type("Password1234!");
    cy.get("#name").type("Test User");
    cy.get("#age").type("30");

    // 폼 제출
    cy.get("form").submit();

    // 오류 메시지 확인 (타임아웃 증가 및 로그 추가)
    cy.get("#error-message", { timeout: 10000 }).should(
      "contain",
      "Passwords do not match"
    );
  });

  it("should show error messages for required fields", () => {
    // 비어 있는 필드로 폼 제출
    cy.get("form").submit();

    // 각 필드의 오류 메시지 확인
    cy.get("#email:invalid").should("exist");
    cy.get("#password:invalid").should("exist");
    cy.get("#confirmPassword:invalid").should("exist");
    cy.get("#name:invalid").should("exist");
    cy.get("#age:invalid").should("exist");
  });
});
