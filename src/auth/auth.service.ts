import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  check: boolean;
  accessToken: string;

  constructor() {
    this.check = false;
    this.accessToken = '';
  }

  setToken(token: string): boolean {
    this.accessToken = token;
    return true;
  }

  async login(url: string): Promise<any> {
    return await axios.post(url, '', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=urt-8',
      },
    });
  }

  async accessTokenInfo(token: string): Promise<any> {
    const uri = 'https://kapi.kakao.com/v1/user/access_token_info';
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return await axios.get(uri, { headers });
  }

  // 토큰 처리 확인 필요
  async getProfile(bearerAccessToken: string): Promise<any> {
    const uri = 'https://kapi.kakao.com';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=urt-8',
      Authorization: `bearer ${bearerAccessToken.split(' ')[1]}`,
    };
    return await axios.get(uri, { headers });
  }

  async logout(accessToken: string): Promise<any> {
    const uri = 'https://kapi.kakao.com/v1/user/logout';
    const headers = {
      Authorization: `bearer ${accessToken}`,
    };
    return await axios.post(uri, '', { headers });
  }

  async deleteLog(): Promise<any> {
    const uri = 'https://kapi.kakao.com/v1/user/unlink';
    const headers = {
      Authorization: `bearer ${this.accessToken}`,
    };
    return await axios.post(uri, '', { headers });
  }
}
