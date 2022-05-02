## 카카오 로그인 API 로직

1. React에서 Kakao 로그인 진행
2. kakao에서 등록해놓았던 서버측 RedirectURL로 해당 유저의 code 전송
3. KakaoAuthGuard에서 해당 유저의 AccessToken을 비롯한 profile 정보를 req.user에 저장
4. 서버에서 로그인 또는 회원가입 처리 후 쿠키에 토큰을 담아서 응답으로 보냄
5. 이때, 응답은 redirect로 처리
