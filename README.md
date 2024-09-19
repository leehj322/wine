![header](https://capsule-render.vercel.app/api?type=waving&color=6A42DB&height=250&section=header&text=🍷%20WINE&fontSize=80&fontAlignY=40&fontColor=ffffff)

**코드잇에서 주관하는 와인 관리 애플리케이션 프로젝트입니다.**

<img width="800" alt="image" src="https://github.com/user-attachments/assets/054fdb8a-3743-49a2-b714-87f3d40e4050">

## 📑 목차
> ***[프로젝트 소개](#프로젝트-소개)***
> 
> ***[개발 기간](#개발-기간)***
> 
> ***[개발자 소개](#개발자-소개)***
> 
> ***[상세 계획](#상세-계획)***
> 
> ***[User Flow](#User-Flow)***
> 
> ***[프로젝트 구조](#프로젝트-구조)***
> 
> ***[개발 환경](#개발-환경)***
> 
> ***[기술 스택](#기술-스택)***
> 
> ***[주요 기능](#주요-기능)***
>
> ***[배포 및 실행 방법](#배포-및-실행-방법)***
> 
  
## 🧑‍💻 <a name="프로젝트-소개"/>프로젝트 소개
사용자가 다양한 와인을 조회하고, 새로운 와인을 등록할 수 있도록 하며 와인의 평균 평점과 최신 리뷰를 확인할 수 있는 기능을 제공합니다.

## 🗓️ <a name="개발-기간"/>개발 기간
***8 / 29 (목) ~ 9 / 19 (목)***

## 👨‍👨‍👦‍👦 <a name="개발자-소개"/>개발자 소개 

- **김종화 [**@KJongHwa**](https://github.com/KJongHwa?pvs=4, "개발자  프로필 링크")** : 와인 상세 페이지 

- **이형준 [**@leehj322**](https://github.com/leehj322?pvs=4, "개발자  프로필 링크")** : 랜딩 페이지 / 팀장 👑
  
- **손재헌 [**@Jaeheon96**](https://github.com/Jaeheon96?pvs=4, "개발자  프로필 링크")** : 로그인, 회원가입 페이지

- **장혁수 [**@hyeoksuJ**](https://github.com/hyeoksuJ?pvs=4, "개발자  프로필 링크")** : 마이 페이지

- **정인재 [**@Injaeeee**](https://github.com/Injaeeee?pvs=4, "개발자  프로필 링크")** : 와인 목록 페이지


## 📃 <a name="상세-계획"/>상세 계획과 일정



[**📌 상세 계획**](https://grizzled-rose-30c.notion.site/85cbabe6e886479abbfd09d0f51a468e?pvs=4, "상세 계획 노션 링크")

[**📝 상세 일정**](https://grizzled-rose-30c.notion.site/7c70c15084e242808e01a0cfc0809d7f?pvs=4, "상세 일정 노션 링크")

## 💡 <a name="User-Flow"/>User Flow
![image](https://github.com/user-attachments/assets/f86c7d69-aa4b-4a4b-b0d5-bb580e4040a4)



## 📁 <a name="프로젝트-구조"/>프로젝트 구조
```
📁wine/
│
├── 📁public/
│   ├── 📁images/                 # 이미지 파일 폴더
│   └── 📁ic_wine.svg ...
│
├── 📁src/
│   ├── 📁components/             # 재사용 가능한 컴포넌트
│   │   ├── 📁@shared/            # 공통 컴포넌트
│   │   │   ├── GlobalNavBar.tsx
│   │   │   └── Modal.tsx
│   │   ├── 📁auth/               # 로그인, 회원가입 페이지에 들어갈 컴포넌트 모음
│   │   │   ├── AuthLabel.tsx
│   │   │   └── GoogleOauthButton.tsx
│   │   └── 📁wines/              # 와인 목록/상세 페이지에 들어갈 컴포넌트 모음
│   │       ├── AddWine.tsx
│   │       └── WineItemList.tsx
│   │
│   ├── 📁pages/                  # Next.js page 라우팅 
│   │   └── 📁myprofile/             
│   │       └── index.tsx
│   │   └── 📁oauth/          
│   │       └── kakao.tsx
│   │   └── 📁signin/
│   │       └── index.tsx
│   │   └── 📁signup/
│   │       └── index.tsx
│   │   └── 📁wines/
│   │       └── [id].tsx
│   │       └── index.tsx
│   │   └── index.tsx
│   │   └── _app.tsx
│   │
│   ├── 📁libs/                   # 라이브러리 관련된 세팅 및 함수들 정리하는 폴더
│   │   └── 📁axios/              # axios 관련 세팅 및 api 요청 함수
│   │       └── axiosInstance.ts
│   │       └── 📁auth/          
│   │       └── 📁image/       
│   │       └── 📁review/      
│   │       └── 📁user/     
│   │       └── 📁wine/    
│   │
│   ├── 📁contexts/               # 전역 상태 관리 
│   │
│   ├── 📁hooks/                  # 커스텀 React 훅
│   │
│   ├── 📁types/                  # 타입 폴더 (DTO 혹은 전역적으로 사용되는 type을 미리 정의)
│   │                             # 컴포넌트 props의 경우에는 해당 컴포넌트 위치에 정의
│   │
│   ├── 📁styles/                 # 스타일 관련 파일 모음
│   │   └── global.css
│   │
│   ├── 📁constants/              # 상수 폴더
│   │   └── mediaQueryBreakPoint.ts
│   │
│   └── 📁utils/                  # 유틸리티 폴더
│
├─ .gitignore
├─ .env.local                     # 각자 환경에서 별도 생성 필요
├─ .eslintrc.json
├─ .prettierrc.json
├─ next.confing.mjs
├─ tailwind.config.ts
├─ tsconfig.json
│
...생략
```

## 💻 <a name="개발-환경"/>개발 환경

|OS|IDE|Version Control|Package Manager|deploy|Community|
|:---:|:---:|:---:|:---:|:---:|:---:|
|![macOS](https://img.shields.io/badge/macOS-000000?style=for-the-badge&logo=apple&logoColor=white) ![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)|![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078d7?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white)|![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)|![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)|![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)|![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![Gather](https://img.shields.io/badge/Gather-5D7FA4?style=for-the-badge&logo=gather&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)|


## ⚒ <a name="기술-스택"/>기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)


## 👨‍🏫 <a name="주요-기능"/>주요 기능

|![randing](https://github.com/user-attachments/assets/c55c994a-b7a5-4a08-bb2d-4f2fa56f299d)|![list](https://github.com/user-attachments/assets/63d730c2-404b-4246-a00e-7bd739d403c1)|![wine](https://github.com/user-attachments/assets/3ca39b86-8a47-4d8f-95b7-bb840b10839d)|
|:---:|:---:|:---:|
|**랜딩 페이지**|**와인 목록 페이지**|**와인 상세 페이지**|

|![login](https://github.com/user-attachments/assets/19e0a399-16ed-42a5-8f90-fc156f6e8670)|![signup](https://github.com/user-attachments/assets/702b1d57-f0ec-4267-95e8-b28ce6b8f6ae)|![myprofile](https://github.com/user-attachments/assets/464653f8-7f9b-46f5-9cf1-1fbdcd4fb784)|
|:---:|:---:|:---:|
|**로그인 페이지**|**회원가입 페이지**|**마이 페이지**|

### 회원가입 및 로그인

페이지의 기초적인 기능으로 페이지에서 자체적으로 제공하는 페이지에서 회원가입 및 구글, 카카오로도 로그인을 할 수 있습니다. 와인 상세 페이지와 마이페이지는 로그인을 한 사용자들만 접속할 수 있습니다.

### 와인 목록 조회

사용자는 모든 와인의 목록을 확인할 수 있으며, 상단카드에서 달마다 평점이 높은 와인들을 추천받을수 있습니다.

### 필터링 기능

와인의 가격대와 평점 및 타입(레드, 화이트, 스파클링 등)으로 취향에 맞는 와인을 필터링할 수 있으며, 원하는 와인의 이름을 직접 검색할 수 있습니다.

### 와인 추가

사용자는 새로운 와인을 추가할 수 있으며, 이름, 가격, 원산지, 타입 등의 정보를 입력해야 합니다.

### 와인 상세 정보

각 와인의 이름, 가격, 평균 평점, 최신 리뷰 등의 정보를 제공합니다.

### 와인 리뷰 작성

사용자는 와인 상세에서 리뷰를 직접 작성할 수 있으며 별점, 와인의 맛 (바디감, 타닌, 당도, 산미 등), 향등의 정보를 남겨 공유할 수 있습니다.

### 마이 페이지

사용자가 작성했던 후기들이나 등록했던 와인들의 리스트들을 한 눈에 보기 쉽도록 정보들을 제공하며 수정할 수 있습니다. 또한 회원가입할때 생성한 닉네임을 변경할 수 있습니다.


## 🚀 <a name="배포-및-실행-방법"/>배포 및 실행 방법

### 1. 프로젝트 클론

```git clone https://github.com/Codeit-FE08-Part3-Team6/wine.git cd wine```

### 2. 의존성 설치
프로젝트에서 사용하는 패키지들을 설치합니다.

```npm install```

### 3. 개발 서버 실행
다음 명령어를 실행하여 로컬 개발 환경에서 프로젝트를 실행할 수 있습니다.

```npm run dev```

이후 브라우저에서 http://localhost:3000 으로 접속하여 개발 중인 웹 애플리케이션을 확인할 수 있습니다.

### 4. 빌드 및 배포
프로덕션 환경에서 사용하기 위해 빌드할 때는 아래 명령어를 사용합니다.

```npm run build```


그 후, 아래 명령어로 빌드된 파일을 실제로 실행합니다.


```npm start```


### 5. 배포
이 프로젝트는 Vercel을 사용하여 배포할 수 있습니다. 

GitHub와 연동된 Vercel 계정을 통해 자동으로 배포되며, 코드를 push하면 자동으로 배포 프로세스가 진행됩니다.


[**🚀 배포 사이트**](https://wine-nine-xi.vercel.app/?pvs=4, "WINE")



