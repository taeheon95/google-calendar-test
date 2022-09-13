export interface GoogleAuth {
  // access token jwt 를 이용해서 한다.
  access_token: string;
  // 만료 시간 몇 초 뒤에 만료 될지를 확인
  expires_in: number;
  // access token을 재발급 받는데 사용하는 토큰
  refresh_token?: string;
  // 사용할 수 있는 범위
  scope: string;
  // 토큰의 종류
  token_type: "Bearer";
}
