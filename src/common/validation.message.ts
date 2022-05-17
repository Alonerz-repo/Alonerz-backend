export const validMessage = {
  IsNotEmpty: (field: string) => `${field}을(를) 입력하세요.`,
  IsString: (field: string) => `${field}이(가) String 형식이 아닙니다.`,
  IsNumber: (field: string) => `${field}이(가) Number 형식이 아닙니다.`,
  IsDate: (field: string) => `${field}이(가) Date 형식이 아닙니다.`,
  Length: (field: string, min: number, max: number) =>
    `${field}의 길이는 ${min} ~ ${max}로 제한됩니다.`,
};
