import { INestApplication, ValidationPipe } from '@nestjs/common';

export async function setAppFactory(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      /**transform
       * 네트워크를 통해 전달받은 데이터(object)를
       * DTO로 자동 변환한다.
       * */
      transform: true,
      /**whitelist
       * DTO에 없는 property를 걸러준다.
       * */
      whitelist: true,
      /**forbidNonWitelisted
       * 전달받은 요쳥 값(Params, Body 등) 중에서
       * 정의되지 않은 값이 있으면 Error을 발생시킨다.
       * */
      forbidNonWhitelisted: true,
      /**disableErrorMessage
       * Error 발생 시 Error Message를 표시한다.
       * 특히, 배포 환경에서는 true로 설정하는 편이 좋다.
       * */
    }),
  );
}
