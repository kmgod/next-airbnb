//* 회원가입 Body
export type SignUpAPIBody = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: Date;
}
//* 로그인 Body
export type LoginAPIBody = {
  email: string;
  password: string;
}