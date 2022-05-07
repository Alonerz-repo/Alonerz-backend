import axios from 'axios';

export class KakaoAPI {
  public static async validate(kakaoToken: string) {
    const host = 'https://kapi.kakao.com/v1/user/access_token_info';
    const headers = {
      Authorization: `Bearer ${kakaoToken}`,
    };
    return await axios
      .get(host, { headers })
      .then((response) => response.data)
      .catch((error) => error.response.data);
  }
}
