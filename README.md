# GOOGLE SPREAD SHEET

노드에서 구글 스프레드시트에 글을 작성하자.
왜? 회사 결제시스템 구축 기능중 하나.

<br />

## required package

- [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet)

## 도움이 될만한 것들

### 초기세팅

초기세팅은 이 사이틀 참고해서 진해했다. [Nodejs에서 구글스프레드시트 접속하기](https://ongamedev.tistory.com/entry/NodeJS%EC%97%90%EC%84%9C-Google-SpreadSheet%EC%97%90-%EC%A0%91%EC%86%8D%ED%95%98%EA%B8%B0)

### 연결 이후 노드에서 호출이 안되는 문제 => 시트에서 공유를 해줘야함 [링크](https://stackoverflow.com/questions/38949318/google-sheets-api-returns-the-caller-does-not-have-permission-when-using-serve)

```md

To solve this issue, try to:

1. Create a service account: https://console.developers.google.com/iam-admin/serviceaccounts/

2. In options, create a key: this key is your usual client_secret.json - use it the same way

3. Make the role owner for the service account (Member name = service account ID = service account email ex: thomasapp@appname-201813.iam.gserviceaccount.com

4. Copy the email address of your service account = service account ID
5. Simply go in your browser to the Google sheet you want to interact with
6. Go to SHARE on the top right of your screen
7. Go to advanced settings and share it with email address of your service account ex: thomasapp@appname-201813.iam.gserviceaccount.com

It worked for me :)

## 감사합니다 스텍오버플로우!
```

### .env를 사용할 경우 생길  수 있는 에러

프리베이트 키에서 이스케이프 코드때문에 에러가 생길 수 있음 [링크](https://github.com/theoephraim/node-google-spreadsheet/issues/244)

```md
If you store your key in SSM, and retrieve it with serverless and inject it with an environment variable, you'll end up with your \n's escaped. I resolved it this way after getting the error mentioned in this thread:

await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
  })
```

## 난관?

async사용에 좀 애먹었음

```js
(async() => {
  await google();
})();
```

익명함수(?), 즉시실행함수(?)를 사용함!
